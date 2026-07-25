/**
 * Guards on the PayPal hosted donation button.
 *
 * No test here contacts PayPal. The SDK is never fetched: the injected
 * `<script>` is intercepted, and `window.paypal` is a mock. What is being
 * verified is this site's behaviour around PayPal — that the button is
 * requested exactly once, that failure is admitted rather than hidden, and
 * that no success is ever claimed locally.
 *
 * Modules are re-imported per test because the SDK loader caches its promise
 * at module scope, which is precisely the mechanism that makes StrictMode
 * safe and must therefore start clean each time.
 */

import { render, screen, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PAYPAL_DONATION_URL, PAYPAL_SDK_URL } from "../../data/payments";

/** Scripts the component asked the document to load. */
let requested: string[] = [];
let originalAppendChild: typeof document.head.appendChild;

/** Resolves or rejects the pending script load. */
let settle: { ok: () => void; fail: () => void };

function interceptScripts() {
  requested = [];
  const listeners: Array<{ load: () => void; error: () => void }> = [];

  originalAppendChild = document.head.appendChild.bind(document.head);
  vi.spyOn(document.head, "appendChild").mockImplementation(((
    node: Node,
  ): Node => {
    if (node instanceof HTMLScriptElement) {
      requested.push(node.src);
      listeners.push({
        load: () => node.dispatchEvent(new Event("load")),
        error: () => node.dispatchEvent(new Event("error")),
      });
      // Deliberately NOT attached to the document: nothing is fetched.
      return node;
    }
    return originalAppendChild(node);
  }) as typeof document.head.appendChild);

  settle = {
    ok: () => listeners.forEach((l) => l.load()),
    fail: () => listeners.forEach((l) => l.error()),
  };
}

/** Matches the SDK's own signature, so the spy records its argument. */
type RenderFn = (target: string | HTMLElement) => Promise<void>;

/** A stand-in for the PayPal namespace the real SDK would install. */
function installPayPalMock(renderImpl?: RenderFn) {
  const renderSpy = vi.fn<RenderFn>(renderImpl ?? (() => Promise.resolve()));
  const hostedButtons = vi.fn(() => ({ render: renderSpy }));
  window.paypal = { HostedButtons: hostedButtons };
  return { hostedButtons, renderSpy };
}

async function loadComponent() {
  vi.resetModules();
  const module = await import("./PayPalDonationButton");
  return module.PayPalDonationButton;
}

beforeEach(() => {
  interceptScripts();
  delete window.paypal;
});

afterEach(() => {
  vi.restoreAllMocks();
  delete window.paypal;
});

describe("loading the SDK", () => {
  it("shows an accessible loading message before the SDK arrives", async () => {
    const PayPalDonationButton = await loadComponent();
    render(<PayPalDonationButton />);

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(/cargando el botón de donación/i);
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("requests the official SDK URL exactly once", async () => {
    const PayPalDonationButton = await loadComponent();
    render(<PayPalDonationButton />);

    await waitFor(() => expect(requested).toHaveLength(1));
    expect(requested[0]).toBe(PAYPAL_SDK_URL);
    expect(requested[0]).toMatch(/^https:\/\/www\.paypal\.com\//);
  });

  it("inserts no second script under StrictMode", async () => {
    const PayPalDonationButton = await loadComponent();
    render(
      <StrictMode>
        <PayPalDonationButton />
      </StrictMode>,
    );

    await waitFor(() => expect(requested.length).toBeGreaterThan(0));
    expect(requested).toHaveLength(1);
  });
});

describe("rendering the hosted button", () => {
  it("asks PayPal to render once the SDK is available", async () => {
    const PayPalDonationButton = await loadComponent();
    const { hostedButtons, renderSpy } = installPayPalMock();

    render(<PayPalDonationButton />);
    settle.ok();

    await waitFor(() => expect(renderSpy).toHaveBeenCalledTimes(1));
    expect(hostedButtons).toHaveBeenCalledWith({
      hostedButtonId: "FX3C3ZF9BZUNY",
    });
    expect(renderSpy).toHaveBeenCalledWith(
      expect.stringContaining("#paypal-container-FX3C3ZF9BZUNY"),
    );
  });

  it("renders into a container that exists in the document", async () => {
    const PayPalDonationButton = await loadComponent();
    const { renderSpy } = installPayPalMock();

    const { container } = render(<PayPalDonationButton />);
    settle.ok();

    await waitFor(() => expect(renderSpy).toHaveBeenCalled());
    const selector = renderSpy.mock.calls[0]![0] as string;
    expect(container.querySelector(selector)).not.toBeNull();
  });

  it("does not duplicate the button under StrictMode", async () => {
    const PayPalDonationButton = await loadComponent();
    const { renderSpy } = installPayPalMock();

    render(
      <StrictMode>
        <PayPalDonationButton />
      </StrictMode>,
    );
    settle.ok();

    await waitFor(() => expect(renderSpy).toHaveBeenCalled());
    expect(renderSpy).toHaveBeenCalledTimes(1);
  });

  it("does not duplicate the button when the parent rerenders", async () => {
    const PayPalDonationButton = await loadComponent();
    const { renderSpy } = installPayPalMock();

    const { rerender } = render(<PayPalDonationButton />);
    settle.ok();
    await waitFor(() => expect(renderSpy).toHaveBeenCalledTimes(1));

    rerender(<PayPalDonationButton />);
    rerender(<PayPalDonationButton />);

    expect(renderSpy).toHaveBeenCalledTimes(1);
  });

  it("hides the loading message once PayPal has rendered", async () => {
    const PayPalDonationButton = await loadComponent();
    installPayPalMock();

    render(<PayPalDonationButton />);
    settle.ok();

    await waitFor(() =>
      expect(screen.queryByText(/cargando el botón/i)).toBeNull(),
    );
  });
});

describe("failure is admitted, never hidden", () => {
  it("shows the honest message when the SDK cannot load", async () => {
    const PayPalDonationButton = await loadComponent();
    render(<PayPalDonationButton />);

    settle.fail();

    expect(
      await screen.findByText(/no fue posible cargar el botón de paypal/i),
    ).toBeInTheDocument();
  });

  it("shows it when the script loads but installs no namespace", async () => {
    // What a privacy extension serving an empty stub looks like.
    const PayPalDonationButton = await loadComponent();
    render(<PayPalDonationButton />);

    settle.ok();

    expect(
      await screen.findByText(/no fue posible cargar el botón de paypal/i),
    ).toBeInTheDocument();
  });

  it("shows it when PayPal's own render rejects", async () => {
    const PayPalDonationButton = await loadComponent();
    installPayPalMock(() => Promise.reject(new Error("blocked")));

    render(<PayPalDonationButton />);
    settle.ok();

    expect(
      await screen.findByText(/no fue posible cargar el botón de paypal/i),
    ).toBeInTheDocument();
  });

  it("never claims a payment succeeded", async () => {
    const PayPalDonationButton = await loadComponent();
    installPayPalMock();

    const { container } = render(<PayPalDonationButton />);
    settle.ok();
    await waitFor(() => expect(window.paypal).toBeDefined());

    const text = container.textContent ?? "";
    expect(text).not.toMatch(/gracias por su donaci/i);
    expect(text).not.toMatch(/donaci[oó]n (recibida|completada|exitosa)/i);
    expect(text).not.toMatch(/pago (recibido|completado|exitoso)/i);
  });
});

describe("the fallback link", () => {
  it("points at the official PayPal payment page", async () => {
    const PayPalDonationButton = await loadComponent();
    render(<PayPalDonationButton />);

    const link = screen.getByRole("link", {
      name: /abrir la página segura de donación en paypal/i,
    });
    expect(link).toHaveAttribute("href", PAYPAL_DONATION_URL);
    expect(link).toHaveAttribute(
      "href",
      "https://www.paypal.com/ncp/payment/K79TU3UFVP5J2",
    );
  });

  it("opens in a new tab without handing over the opener", async () => {
    const PayPalDonationButton = await loadComponent();
    render(<PayPalDonationButton />);

    const link = screen.getByRole("link", {
      name: /abrir la página segura de donación en paypal/i,
    });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("stays available even when the hosted button renders", async () => {
    const PayPalDonationButton = await loadComponent();
    installPayPalMock();

    render(<PayPalDonationButton />);
    settle.ok();

    await waitFor(() =>
      expect(screen.queryByText(/cargando el botón/i)).toBeNull(),
    );
    expect(
      screen.getByRole("link", {
        name: /abrir la página segura de donación en paypal/i,
      }),
    ).toBeInTheDocument();
  });

  it("is reachable by keyboard", async () => {
    const PayPalDonationButton = await loadComponent();
    render(<PayPalDonationButton />);

    const link = screen.getByRole("link", {
      name: /abrir la página segura de donación en paypal/i,
    });
    link.focus();
    expect(link).toHaveFocus();
  });
});

describe("this site collects nothing", () => {
  it("renders no card, amount or credential field of its own", async () => {
    const PayPalDonationButton = await loadComponent();
    installPayPalMock();

    const { container } = render(<PayPalDonationButton />);
    settle.ok();
    await waitFor(() => expect(window.paypal).toBeDefined());

    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input")).toBeNull();
    expect(container.querySelector("select")).toBeNull();
    // No hand-rolled payment frame either — PayPal creates its own.
    expect(container.querySelector("iframe")).toBeNull();
  });
});
