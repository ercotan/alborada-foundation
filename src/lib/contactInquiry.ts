/**
 * Contact enquiry — data contract, validation and submission.
 *
 * `submitInquiry` performs a real HTTP request to the endpoint named by
 * VITE_CONTACT_ENDPOINT. If that variable is absent — which it is today,
 * because no backend exists — it returns `not-configured` WITHOUT contacting
 * anything and WITHOUT reporting success. The interface then says the
 * integration is missing.
 *
 * A submission is reported as successful only when the server says so.
 */

import {
  ATTACHMENTS,
  DEFAULT_CATEGORY,
  inquiryCategories,
  type InquiryCategoryId,
} from "../data/contact";

export interface ContactInquiry {
  // Required
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  subject: string;
  message: string;
  category: InquiryCategoryId;
  consent: boolean;

  // Optional
  phone: string;
  organization: string;
  role: string;
  address: string;
  region: string;
}

export const emptyInquiry: ContactInquiry = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  city: "",
  subject: "",
  message: "",
  category: DEFAULT_CATEGORY,
  consent: false,
  phone: "",
  organization: "",
  role: "",
  address: "",
  region: "",
};

export type InquiryErrors = Partial<
  Record<keyof ContactInquiry | "attachments", string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(inquiry: ContactInquiry): InquiryErrors {
  const errors: InquiryErrors = {};
  const required: [keyof ContactInquiry, string][] = [
    ["firstName", "Indique su nombre."],
    ["lastName", "Indique su apellido."],
    ["country", "Indique el país."],
    ["city", "Indique la ciudad."],
    ["subject", "Indique el asunto."],
  ];

  for (const [field, message] of required) {
    if (!String(inquiry[field]).trim()) errors[field] = message;
  }

  if (!inquiry.email.trim()) {
    errors.email = "Indique un correo electrónico.";
  } else if (!EMAIL_PATTERN.test(inquiry.email.trim())) {
    errors.email = "El correo electrónico no parece válido.";
  }

  if (inquiry.message.trim().length < 20) {
    errors.message = "Describa su consulta con algo más de detalle.";
  }

  if (!inquiry.consent) {
    errors.consent = "Necesitamos su autorización para poder responderle.";
  }

  return errors;
}

/* -------------------------------------------------------------------------- */
/* Attachments                                                                 */
/* -------------------------------------------------------------------------- */

export interface AttachmentRejection {
  fileName: string;
  reason: string;
}

export interface AttachmentCheck {
  accepted: File[];
  rejected: AttachmentRejection[];
}

function hasAllowedExtension(name: string): boolean {
  const lower = name.toLowerCase();
  return ATTACHMENTS.extensions.some((ext) => lower.endsWith(ext));
}

/**
 * Client-side attachment check. Improves the experience; proves nothing.
 * The backend must independently verify extension, real MIME type and size.
 */
export function checkAttachments(
  existing: File[],
  incoming: File[],
): AttachmentCheck {
  const accepted: File[] = [...existing];
  const rejected: AttachmentRejection[] = [];
  let total = existing.reduce((sum, file) => sum + file.size, 0);

  for (const file of incoming) {
    if (!hasAllowedExtension(file.name)) {
      rejected.push({
        fileName: file.name,
        reason: "Formato no admitido. Use PDF, DOC, DOCX, JPG o PNG.",
      });
      continue;
    }
    if (file.size > ATTACHMENTS.maxFileBytes) {
      rejected.push({
        fileName: file.name,
        reason: `Supera el máximo de ${ATTACHMENTS.maxFileBytes / (1024 * 1024)} MB por archivo.`,
      });
      continue;
    }
    if (accepted.length >= ATTACHMENTS.maxFiles) {
      rejected.push({
        fileName: file.name,
        reason: `Solo se admiten ${ATTACHMENTS.maxFiles} archivos.`,
      });
      continue;
    }
    if (total + file.size > ATTACHMENTS.maxTotalBytes) {
      rejected.push({
        fileName: file.name,
        reason: `Se supera el máximo total de ${ATTACHMENTS.maxTotalBytes / (1024 * 1024)} MB.`,
      });
      continue;
    }
    accepted.push(file);
    total += file.size;
  }

  return { accepted, rejected };
}

/* -------------------------------------------------------------------------- */
/* Submission                                                                  */
/* -------------------------------------------------------------------------- */

export type SubmitOutcome =
  /** The server accepted and stored the enquiry. Only the server can say this. */
  | { status: "success"; inquiryId: string | null }
  /** No endpoint is configured. Nothing was sent. Not an error by the visitor. */
  | { status: "not-configured" }
  /** The server rejected the content, e.g. validation or spam heuristics. */
  | { status: "rejected"; message: string }
  /** Rate limited or flagged as automated. */
  | { status: "rate-limited" }
  /** The server failed. */
  | { status: "server-error" }
  /** The request never completed. */
  | { status: "network-error" };

export function contactEndpoint(): string {
  return import.meta.env.VITE_CONTACT_ENDPOINT ?? "";
}

export function buildInquiryPayload(
  inquiry: ContactInquiry,
  attachments: File[],
): FormData {
  const payload = new FormData();
  for (const [key, value] of Object.entries(inquiry)) {
    payload.append(key, typeof value === "boolean" ? String(value) : value);
  }
  const label = inquiryCategories.find((c) => c.id === inquiry.category)?.label;
  if (label) payload.append("categoryLabel", label);
  for (const file of attachments) payload.append("attachments", file);
  return payload;
}

/**
 * Submits the enquiry.
 *
 * The server is expected to return JSON containing `inquiryId`. The identifier
 * is displayed only when the server provides one — it is never generated here,
 * because a client-generated identifier would refer to nothing.
 */
export async function submitInquiry(
  inquiry: ContactInquiry,
  attachments: File[],
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitOutcome> {
  const endpoint = contactEndpoint();
  if (!endpoint) return { status: "not-configured" };

  let response: Response;
  try {
    response = await fetchImpl(endpoint, {
      method: "POST",
      body: buildInquiryPayload(inquiry, attachments),
    });
  } catch {
    return { status: "network-error" };
  }

  if (response.status === 429) return { status: "rate-limited" };

  if (response.status >= 400 && response.status < 500) {
    let message =
      "La solicitud fue rechazada. Revise los datos e intente de nuevo.";
    try {
      const body = (await response.json()) as { message?: unknown };
      if (typeof body.message === "string" && body.message.trim()) {
        message = body.message;
      }
    } catch {
      // Body was not JSON. Keep the default message.
    }
    return { status: "rejected", message };
  }

  if (!response.ok) return { status: "server-error" };

  let inquiryId: string | null = null;
  try {
    const body = (await response.json()) as { inquiryId?: unknown };
    if (typeof body.inquiryId === "string") inquiryId = body.inquiryId;
  } catch {
    // A 2xx without a parseable body is still a success.
  }

  return { status: "success", inquiryId };
}

/* -------------------------------------------------------------------------- */
/* Category from the URL                                                       */
/* -------------------------------------------------------------------------- */

export function readCategory(search: string): InquiryCategoryId {
  const requested = new URLSearchParams(search).get("categoria");
  const match = inquiryCategories.find((c) => c.id === requested);
  return match ? match.id : DEFAULT_CATEGORY;
}
