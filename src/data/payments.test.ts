/**
 * Guards on the public PayPal configuration.
 *
 * Two things are being protected. First, the identifiers: a wrong hosted
 * button id or client id sends a donor to someone else's account, and that
 * failure is invisible in review. Second, the boundary: this file must never
 * acquire a private credential, because Vite inlines everything it imports
 * into a bundle the public downloads.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  PAYPAL_CLIENT_ID,
  PAYPAL_DONATION_URL,
  PAYPAL_HOSTED_BUTTON_ID,
  PAYPAL_SDK_ORIGIN,
  PAYPAL_SDK_PARAMS,
  PAYPAL_SDK_URL,
  paypalSdkUrl,
} from "./payments";

const source = readFileSync(
  join(process.cwd(), "src/data/payments.ts"),
  "utf8",
);

describe("official identifiers", () => {
  it("carries the hosted button id issued to the foundation", () => {
    expect(PAYPAL_HOSTED_BUTTON_ID).toBe("FX3C3ZF9BZUNY");
  });

  it("carries the public client id from the button builder", () => {
    expect(PAYPAL_CLIENT_ID).toBe(
      "BAAorzASCfDAHufEiN4IevnV_2d2BZEJRV9TztNjcuG-VrINZMjR8ng7l21FHeUU0Dxqzna6RSDcILERSK4",
    );
  });

  it("carries the fallback payment link", () => {
    expect(PAYPAL_DONATION_URL).toBe(
      "https://www.paypal.com/ncp/payment/K79TU3UFVP5J2",
    );
  });

  it("keeps the SDK parameters the builder produced", () => {
    expect(PAYPAL_SDK_PARAMS).toEqual({
      "client-id": PAYPAL_CLIENT_ID,
      components: "hosted-buttons",
      "disable-funding": "venmo",
      currency: "USD",
    });
  });
});

describe("the SDK URL", () => {
  it("is built from the centralized parts", () => {
    expect(PAYPAL_SDK_URL).toBe(paypalSdkUrl());
  });

  it("points at paypal.com over HTTPS and nowhere else", () => {
    const url = new URL(PAYPAL_SDK_URL);
    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe("www.paypal.com");
    expect(url.pathname).toBe("/sdk/js");
    expect(PAYPAL_SDK_ORIGIN).toBe("https://www.paypal.com");
  });

  it("requests only the hosted-buttons component, in USD", () => {
    const params = new URL(PAYPAL_SDK_URL).searchParams;
    expect(params.get("client-id")).toBe(PAYPAL_CLIENT_ID);
    expect(params.get("components")).toBe("hosted-buttons");
    expect(params.get("disable-funding")).toBe("venmo");
    expect(params.get("currency")).toBe("USD");
  });

  it("adds no tracking or analytics parameters", () => {
    const params = [...new URL(PAYPAL_SDK_URL).searchParams.keys()];
    expect(params.sort()).toEqual(
      ["client-id", "components", "currency", "disable-funding"].sort(),
    );
  });

  it("every published PayPal URL is HTTPS on paypal.com", () => {
    for (const value of [PAYPAL_DONATION_URL, PAYPAL_SDK_URL]) {
      const url = new URL(value);
      expect(url.protocol).toBe("https:");
      expect(url.hostname).toBe("www.paypal.com");
    }
  });
});

describe("no private credential is present", () => {
  it("declares no secret-shaped identifier", () => {
    // Names that would indicate a server credential leaking into the bundle.
    const forbidden =
      /\b(?:[A-Z_]*(?:SECRET|PRIVATE_KEY|ACCESS_TOKEN|API_KEY|WEBHOOK_ID|PASSWORD|CREDENTIAL)[A-Z_]*)\s*=/;
    const declarations = source
      .split("\n")
      .filter((line) => !line.trimStart().startsWith("*"))
      .join("\n");
    expect(declarations).not.toMatch(forbidden);
  });

  it("reads no environment variable, so no secret can be injected", () => {
    expect(source).not.toMatch(/import\.meta\.env/);
    expect(source).not.toMatch(/process\.env/);
  });

  it("states who processes the payment and who receives it", () => {
    expect(source).toContain("FUNUDOS");
    expect(source).toMatch(/no private api secret is present/i);
  });
});
