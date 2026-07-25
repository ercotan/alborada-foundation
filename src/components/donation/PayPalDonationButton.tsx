/**
 * The official PayPal hosted donation button.
 *
 * PayPal renders and processes everything inside its own frame. This file
 * loads the SDK, gives PayPal an element to render into, and reports honestly
 * when that does not work. It never touches an amount, a card, a credential
 * or an order, and it has no success state — a completed payment is PayPal's
 * statement to make, not this site's.
 *
 * The fallback link is always present, not only on failure. Ad blockers and
 * privacy extensions block payment SDKs routinely, and a donor who cannot see
 * the button must still have a way through.
 */

import React, { useEffect, useRef, useState } from "react";
import { paypalDonation } from "../../data/homepage";
import {
  PAYPAL_DONATION_URL,
  PAYPAL_HOSTED_BUTTON_ID,
  PAYPAL_SDK_URL,
} from "../../data/payments";
import { usePayPalSdk } from "../../hooks/usePayPalSdk";

/**
 * Distinguishes containers when more than one button is on a page.
 *
 * PayPal's documented call takes a CSS selector, so the container needs an
 * id. The documented id — `paypal-container-<buttonId>` — is a constant, and
 * a constant id stops being unique the moment the component is used twice.
 * A counter keeps the documented shape while keeping the id unique, and the
 * element is still held by a ref rather than looked up globally.
 */
let instanceCount = 0;

type RenderState = "idle" | "rendered" | "error";

export const PayPalDonationButton: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  /**
   * Set before the first render call and never cleared. Under StrictMode the
   * effect runs twice against the same fiber, so this ref is what prevents a
   * second PayPal button. A genuine remount gets a new fiber, a new ref and a
   * new container, and renders once.
   */
  const renderStartedRef = useRef(false);
  const [containerId] = useState(
    () => `paypal-container-${PAYPAL_HOSTED_BUTTON_ID}-${++instanceCount}`,
  );

  const sdkStatus = usePayPalSdk(PAYPAL_SDK_URL);
  const [renderState, setRenderState] = useState<RenderState>("idle");

  useEffect(() => {
    if (sdkStatus !== "ready") return;
    if (renderStartedRef.current) return;
    if (!containerRef.current) return;

    renderStartedRef.current = true;
    let active = true;

    /*
     * Everything runs inside the promise chain so that every failure — a
     * missing namespace, a throw from PayPal's factory, a rejected render —
     * settles through one path, and none of them calls setState
     * synchronously during the effect.
     */
    Promise.resolve()
      .then(() => {
        const hostedButtons = window.paypal?.HostedButtons;
        if (!hostedButtons) {
          throw new Error("The PayPal SDK exposed no HostedButtons");
        }
        return hostedButtons({
          hostedButtonId: PAYPAL_HOSTED_BUTTON_ID,
        }).render(`#${containerId}`);
      })
      .then(() => {
        if (active) setRenderState("rendered");
      })
      .catch(() => {
        if (active) setRenderState("error");
      });

    return () => {
      active = false;
    };
  }, [sdkStatus, containerId]);

  const failed = sdkStatus === "error" || renderState === "error";
  const pending = !failed && renderState !== "rendered";

  return (
    <div className="flex flex-col items-center gap-5">
      {/*
        Always mounted, so the ref and the id exist when the effect runs, and
        so the reserved height limits the shift when PayPal paints into it.
      */}
      <div
        id={containerId}
        ref={containerRef}
        className="w-full max-w-sm"
        style={{ minHeight: failed ? undefined : "3.25rem" }}
      />

      {pending && (
        <p
          role="status"
          aria-live="polite"
          className="text-[11px] font-light leading-relaxed text-white/45"
        >
          {paypalDonation.loading}
        </p>
      )}

      {failed && (
        <p
          role="status"
          className="max-w-md text-center text-[11px] font-light leading-relaxed text-white/55"
        >
          {paypalDonation.unavailable}
        </p>
      )}

      {/*
        Secondary by design: PayPal's own page, reachable with no script at
        all. Kept visible even when the button renders.
      */}
      <a
        href={PAYPAL_DONATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded text-[11px] font-light text-white/45 underline underline-offset-4 transition hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
      >
        {paypalDonation.fallbackLabel}
      </a>
    </div>
  );
};
