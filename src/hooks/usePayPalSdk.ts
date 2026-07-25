/**
 * Loads the official PayPal JavaScript SDK, once per document.
 *
 * The SDK is injected at runtime rather than placed in an HTML entry point,
 * for two reasons. It is needed on the homepage only, so `contacto.html` and
 * `proteccion-infantil.html` must not pay for it — the child protection page
 * in particular should contact nothing it does not need. And a `<script>` in
 * the document head would reach PayPal before the page renders, which is both
 * slower and a third-party contact the visitor did not ask for yet.
 *
 * The promise is cached per URL at module scope. That is what makes this safe
 * under React StrictMode, which mounts, unmounts and remounts every component
 * in development: the second mount reuses the first mount's promise, so the
 * script element is created exactly once.
 *
 * The script is deliberately **not** removed on unmount. PayPal installs a
 * global namespace and its own internal state; tearing the tag out would
 * leave that behind while invalidating the cache, so a later mount would
 * insert a second copy. Cleanup here means "stop updating React state", not
 * "undo the load".
 */

import { useEffect, useState } from "react";

export interface PayPalHostedButtonsInstance {
  render: (target: string | HTMLElement) => Promise<void> | void;
}

export interface PayPalNamespace {
  HostedButtons?: (options: {
    hostedButtonId: string;
  }) => PayPalHostedButtonsInstance;
}

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

export type PayPalSdkStatus = "loading" | "ready" | "error";

/** One in-flight or settled load per source URL, for the page's lifetime. */
const loaders = new Map<string, Promise<void>>();

function hasHostedButtons(): boolean {
  return typeof window !== "undefined" && !!window.paypal?.HostedButtons;
}

export function loadPayPalSdk(src: string): Promise<void> {
  const cached = loaders.get(src);
  if (cached) return cached;

  const loading = new Promise<void>((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("PayPal SDK requires a document"));
      return;
    }

    // Already present, for instance after a hot reload.
    if (hasHostedButtons()) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () =>
      reject(new Error(`Could not load the PayPal SDK from ${src}`)),
    );

    document.head.appendChild(script);
  });

  loaders.set(src, loading);
  return loading;
}

export function usePayPalSdk(src: string): PayPalSdkStatus {
  const [status, setStatus] = useState<PayPalSdkStatus>(() =>
    hasHostedButtons() ? "ready" : "loading",
  );

  useEffect(() => {
    let active = true;

    loadPayPalSdk(src)
      .then(() => {
        if (!active) return;
        // A script that loads but exposes no namespace is a failure too:
        // a privacy extension can serve an empty stub with a 200.
        setStatus(hasHostedButtons() ? "ready" : "error");
      })
      .catch(() => {
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [src]);

  return status;
}
