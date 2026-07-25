/**
 * Guards on the header's donation shortcut.
 *
 * The behaviour worth protecting is the split: on the homepage the click is
 * taken over and scrolled, and from anywhere else the browser is left to
 * navigate. Getting that backwards produces either a dead link on the
 * homepage or a click that does nothing at all on another page.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";
import { Header } from "../layout/Header";
import { headerNavLinks } from "../../data/homepage";
import { DONATION_SECTION_ID } from "../../data/routes";
import { HashScrollOnLoad } from "./HashScrollOnLoad";
import { DonationNavLink } from "./DonationNavLink";

/** Typed to the real signature so the mock can replace the prototype method. */
type ScrollIntoView = (arg?: boolean | ScrollIntoViewOptions) => void;

let scrollIntoView: Mock<ScrollIntoView>;

beforeEach(() => {
  scrollIntoView = vi.fn<ScrollIntoView>();
  Element.prototype.scrollIntoView = scrollIntoView;
});

afterEach(() => {
  vi.restoreAllMocks();
  window.location.hash = "";
  // Assigned directly by the reduced-motion test, so `restoreAllMocks` does
  // not undo it. jsdom has no `matchMedia`, so removing it restores the norm.
  Reflect.deleteProperty(window, "matchMedia");
});

/** Puts the donation section in the document, as the homepage would. */
function renderWithSection() {
  return render(
    <>
      <DonationNavLink />
      <div id={DONATION_SECTION_ID}>Donaciones</div>
    </>,
  );
}

const donateLink = () => screen.getByRole("link", { name: "Donar" });

describe("appearance and placement", () => {
  it("is labelled Donar", () => {
    render(<DonationNavLink />);
    expect(donateLink()).toHaveAttribute("aria-label", "Donar");
    expect(donateLink()).toHaveTextContent("Donar");
  });

  it("points at the donation section of the homepage", () => {
    render(<DonationNavLink />);
    expect(donateLink()).toHaveAttribute("href", `/#${DONATION_SECTION_ID}`);
  });

  it("carries a decorative icon that is hidden from assistive technology", () => {
    const { container } = render(<DonationNavLink />);
    const icon = container.querySelector("svg");
    expect(icon).not.toBeNull();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("aligns the icon with the label rather than stacking them", () => {
    render(<DonationNavLink />);
    expect(donateLink().className).toContain("inline-flex");
    expect(donateLink().className).toContain("items-center");
  });

  it("keeps the styling passed by the nav, so it matches its siblings", () => {
    render(<DonationNavLink className="transition hover:text-[#d4af37]" />);
    expect(donateLink().className).toContain("hover:text-[#d4af37]");
  });

  it("sits immediately after Contacto in the header", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation");
    const labels = [...nav.children].map((el) =>
      (el.getAttribute("aria-label") ?? el.textContent ?? "").trim(),
    );

    const lastScrollLink = headerNavLinks[headerNavLinks.length - 1]!.label;
    expect(lastScrollLink).toBe("Contacto");
    expect(labels.at(-2)).toBe("Contacto");
    expect(labels.at(-1)).toBe("Donar");
  });
});

describe("on the homepage", () => {
  it("scrolls to the donation section instead of navigating", async () => {
    const user = userEvent.setup();
    renderWithSection();

    await user.click(donateLink());
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it("scrolls smoothly by default", async () => {
    const user = userEvent.setup();
    renderWithSection();

    await user.click(donateLink());
    expect(scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: "smooth" }),
    );
  });

  it("is operable from the keyboard", async () => {
    const user = userEvent.setup();
    renderWithSection();

    donateLink().focus();
    expect(donateLink()).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(scrollIntoView).toHaveBeenCalled();
    // Focus is not stolen by the scroll.
    expect(donateLink()).toHaveFocus();
  });

  it("leaves a modified click to the browser, so it can open a new tab", async () => {
    const user = userEvent.setup();
    renderWithSection();

    await user.keyboard("{Control>}");
    await user.click(donateLink());
    await user.keyboard("{/Control}");

    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});

describe("on another page", () => {
  it("does not intercept the click when the section is absent", async () => {
    const user = userEvent.setup();
    // No donation section in this document, as on contacto.html.
    render(<DonationNavLink />);

    await user.click(donateLink());

    // Nothing scrolled: the href is left for the browser to follow.
    expect(scrollIntoView).not.toHaveBeenCalled();
    expect(donateLink()).toHaveAttribute("href", `/#${DONATION_SECTION_ID}`);
  });
});

describe("finishing a cross-page jump", () => {
  it("scrolls to the section named by the fragment after mount", async () => {
    window.location.hash = `#${DONATION_SECTION_ID}`;
    render(
      <>
        <HashScrollOnLoad />
        <div id={DONATION_SECTION_ID}>Donaciones</div>
      </>,
    );

    await vi.waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
  });

  it("does nothing when there is no fragment", async () => {
    render(
      <>
        <HashScrollOnLoad />
        <div id={DONATION_SECTION_ID}>Donaciones</div>
      </>,
    );

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("creates no second route to reach it", () => {
    render(<DonationNavLink />);
    // A fragment on the homepage, never a page of its own.
    const href = donateLink().getAttribute("href") ?? "";
    expect(href.startsWith("/#")).toBe(true);
    expect(href).not.toMatch(/\.html/);
    expect(href).not.toMatch(/donar|donacion/i);
  });
});

describe("reduced motion", () => {
  it("jumps instead of animating when the visitor asked for less motion", async () => {
    const user = userEvent.setup();
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    renderWithSection();
    await user.click(donateLink());

    expect(scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: "auto" }),
    );
  });
});
