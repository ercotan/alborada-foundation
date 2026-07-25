import "@testing-library/jest-dom/vitest";

/**
 * jsdom implements no IntersectionObserver, and Motion's `whileInView` needs
 * one the moment a component using it mounts. A stub keeps those components
 * renderable; it never reports an intersection, so reveal animations stay at
 * their initial state — which is fine, because what the tests assert is
 * structure and content, not the animation.
 */
if (!("IntersectionObserver" in globalThis)) {
  class IntersectionObserverStub implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];

    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: IntersectionObserverStub,
  });
}
