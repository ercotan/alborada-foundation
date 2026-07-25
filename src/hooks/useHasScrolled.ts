import { useEffect, useState } from "react";

/**
 * Whether the page has been scrolled past a small threshold.
 *
 * Used by the header to decide between its transparent state over the hero and
 * its translucent state over content. The threshold keeps the change from
 * flickering on the sub-pixel scrolling that a trackpad produces at rest.
 *
 * The initial value is read lazily rather than set from inside the effect, for
 * two reasons: a visitor can arrive already scrolled — following `/#donations`
 * from another page does exactly that — and setting state synchronously inside
 * an effect triggers a cascading render.
 */
export function useHasScrolled(threshold = 8): boolean {
  const [hasScrolled, setHasScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > threshold,
  );

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > threshold);

    // Passive: this listener never calls preventDefault, and saying so keeps
    // it off the critical path of the scroll itself.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hasScrolled;
}
