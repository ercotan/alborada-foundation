import { describe, expect, it, vi } from "vitest";
import { ATTACHMENTS } from "../data/contact";
import {
  checkAttachments,
  emptyInquiry,
  readCategory,
  submitInquiry,
  validateInquiry,
  type ContactInquiry,
} from "./contactInquiry";

const valid: ContactInquiry = {
  ...emptyInquiry,
  firstName: "Ana",
  lastName: "García",
  email: "ana@ejemplo.org",
  country: "Colombia",
  city: "Cali",
  subject: "Propuesta de convenio",
  message: "Queremos explorar un convenio de cooperación académica.",
  consent: true,
};

const file = (name: string, bytes: number) =>
  new File([new Uint8Array(bytes)], name);

describe("validation", () => {
  it("accepts a complete enquiry", () => {
    expect(validateInquiry(valid)).toEqual({});
  });

  it("reports every missing required field", () => {
    const errors = validateInquiry(emptyInquiry);
    for (const key of [
      "firstName",
      "lastName",
      "email",
      "country",
      "city",
      "subject",
      "message",
      "consent",
    ] as const) {
      expect(errors[key], `expected an error for ${key}`).toBeDefined();
    }
  });

  it("does not require the optional fields", () => {
    const errors = validateInquiry(valid);
    for (const key of [
      "phone",
      "organization",
      "role",
      "address",
      "region",
    ] as const) {
      expect(errors[key]).toBeUndefined();
    }
  });

  it("rejects a malformed email", () => {
    expect(validateInquiry({ ...valid, email: "ana@" }).email).toBeDefined();
    expect(validateInquiry({ ...valid, email: "ana" }).email).toBeDefined();
  });

  it("requires consent before anything can be sent", () => {
    expect(validateInquiry({ ...valid, consent: false }).consent).toBeDefined();
  });
});

describe("attachments", () => {
  it("accepts the documented formats", () => {
    const result = checkAttachments(
      [],
      [file("informe.pdf", 10), file("foto.JPG", 10)],
    );
    expect(result.accepted).toHaveLength(2);
    expect(result.rejected).toHaveLength(0);
  });

  it("rejects an unsupported format", () => {
    const result = checkAttachments([], [file("script.exe", 10)]);
    expect(result.accepted).toHaveLength(0);
    expect(result.rejected[0]?.reason).toMatch(/formato no admitido/i);
  });

  it("rejects a file above the size limit", () => {
    const result = checkAttachments(
      [],
      [file("grande.pdf", ATTACHMENTS.maxFileBytes + 1)],
    );
    expect(result.accepted).toHaveLength(0);
    expect(result.rejected[0]?.reason).toMatch(/MB por archivo/);
  });

  it("enforces the maximum number of files", () => {
    const many = Array.from({ length: ATTACHMENTS.maxFiles + 2 }, (_, i) =>
      file(`doc-${i}.pdf`, 10),
    );
    const result = checkAttachments([], many);
    expect(result.accepted).toHaveLength(ATTACHMENTS.maxFiles);
    expect(result.rejected).toHaveLength(2);
  });

  it("keeps files already accepted when a new one is rejected", () => {
    const first = checkAttachments([], [file("ok.pdf", 10)]);
    const second = checkAttachments(first.accepted, [file("bad.exe", 10)]);
    expect(second.accepted).toHaveLength(1);
    expect(second.rejected).toHaveLength(1);
  });
});

describe("category from the URL", () => {
  it("reads a known category", () => {
    expect(readCategory("?categoria=empresa")).toBe("empresa");
    expect(readCategory("?categoria=institucion")).toBe("institucion");
  });

  it("falls back to the general category when absent or unknown", () => {
    expect(readCategory("")).toBe("general");
    expect(readCategory("?categoria=inventada")).toBe("general");
  });
});

describe("submission", () => {
  it("reports not-configured and sends nothing when no endpoint exists", async () => {
    const fetchImpl = vi.fn();
    const outcome = await submitInquiry(valid, [], fetchImpl as typeof fetch);
    expect(outcome.status).toBe("not-configured");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("never reports success for a failed request", async () => {
    vi.stubEnv("VITE_CONTACT_ENDPOINT", "https://example.test/inquiries");

    const cases: [Response | Error, string][] = [
      [new Response("", { status: 500 }), "server-error"],
      [new Response("{}", { status: 400 }), "rejected"],
      [new Response("", { status: 429 }), "rate-limited"],
      [new Error("offline"), "network-error"],
    ];

    for (const [result, expected] of cases) {
      const fetchImpl = vi.fn(() =>
        result instanceof Error
          ? Promise.reject(result)
          : Promise.resolve(result),
      );
      const outcome = await submitInquiry(valid, [], fetchImpl as typeof fetch);
      expect(outcome.status).toBe(expected);
      expect(outcome.status).not.toBe("success");
    }

    vi.unstubAllEnvs();
  });

  it("reports success with the server-assigned identifier", async () => {
    vi.stubEnv("VITE_CONTACT_ENDPOINT", "https://example.test/inquiries");
    const fetchImpl = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ inquiryId: "ALB-2026-0001" }), {
          status: 201,
        }),
      ),
    );

    const outcome = await submitInquiry(valid, [], fetchImpl as typeof fetch);
    expect(outcome).toEqual({ status: "success", inquiryId: "ALB-2026-0001" });
    vi.unstubAllEnvs();
  });

  it("never invents an identifier when the server omits one", async () => {
    vi.stubEnv("VITE_CONTACT_ENDPOINT", "https://example.test/inquiries");
    const fetchImpl = vi.fn(() =>
      Promise.resolve(new Response("{}", { status: 200 })),
    );

    const outcome = await submitInquiry(valid, [], fetchImpl as typeof fetch);
    expect(outcome).toEqual({ status: "success", inquiryId: null });
    vi.unstubAllEnvs();
  });
});
