/**
 * Guards on the category and topic selects.
 *
 * The reported defect was that the dropdown "only showed Consulta general".
 * Every category was in fact present in the DOM — the native option list
 * inherited `text-white` from the control while opening on the system's light
 * surface, so the options rendered white on white. A test that only counts
 * options would have passed throughout, so the colour carriers are asserted
 * here too, alongside the behaviour.
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  inquiryCategories,
  topicsForCategory,
  type InquiryCategoryId,
} from "../../data/contact";
import { readCategory, readTopic } from "../../lib/contactInquiry";
import { ContactPage } from "../../pages/ContactPage";

const categorySelect = () =>
  screen.getByLabelText(/categoría/i) as HTMLSelectElement;

const topicSelect = () =>
  screen.queryByLabelText(/^tema$/i) as HTMLSelectElement | null;

/** Renders the page as a URL would, through the same readers the entry uses. */
function renderFromUrl(search: string) {
  return render(
    <ContactPage
      initialCategory={readCategory(search)}
      initialTopic={readTopic(search)}
    />,
  );
}

let warn: ReturnType<typeof vi.spyOn>;
let error: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  error = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("the category list", () => {
  it("offers every supported category, not just the default", () => {
    render(<ContactPage initialCategory="general" />);
    expect(categorySelect().options).toHaveLength(inquiryCategories.length);
    expect(inquiryCategories.length).toBeGreaterThan(1);
  });

  it("shows each category by its visible label", () => {
    render(<ContactPage initialCategory="general" />);
    for (const category of inquiryCategories) {
      const option = within(categorySelect()).getByRole("option", {
        name: category.label,
      }) as HTMLOptionElement;
      expect(option.value).toBe(category.id);
    }
  });

  it("gives the options their own colours, so they are legible when open", () => {
    // The original defect: options inherited white text onto a light native
    // surface. Both carriers of the fix are asserted.
    render(<ContactPage initialCategory="general" />);
    expect(categorySelect().className).toContain("[color-scheme:dark]");

    for (const option of categorySelect().options) {
      expect(option.className).toContain("bg-navy-950");
      expect(option.className).toContain("text-white");
    }
  });

  it("has exactly one category control", () => {
    const { container } = render(<ContactPage initialCategory="general" />);
    expect(container.querySelectorAll("#category")).toHaveLength(1);
    expect(container.querySelectorAll('[name="category"]')).toHaveLength(1);
  });
});

describe("preselection from the URL", () => {
  it("defaults to general with no query string", () => {
    renderFromUrl("");
    expect(categorySelect().value).toBe("general");
  });

  it("preselects orientation", () => {
    renderFromUrl("?categoria=orientacion");
    expect(categorySelect().value).toBe("orientacion");
  });

  it("preselects donation", () => {
    renderFromUrl("?categoria=donacion");
    expect(categorySelect().value).toBe("donacion");
  });

  it("preselects every category the site links to", () => {
    for (const category of inquiryCategories) {
      const { unmount } = renderFromUrl(`?categoria=${category.id}`);
      expect(categorySelect().value).toBe(category.id);
      unmount();
    }
  });

  it("falls back to general on an unsupported category", () => {
    renderFromUrl("?categoria=no-existe");
    expect(categorySelect().value).toBe("general");
  });

  it("falls back to general on a malformed query string", () => {
    renderFromUrl("?categoria=&tema=");
    expect(categorySelect().value).toBe("general");
  });
});

describe("the topic travels with the category", () => {
  it("preserves and displays a canonical orientation topic", () => {
    const { container } = renderFromUrl(
      "?categoria=orientacion&tema=finanzas-personales",
    );
    expect(topicSelect()!.value).toBe("finanzas-personales");
    // Selected in the control, and named in the page's own words.
    expect(topicSelect()!.selectedOptions[0]!.textContent).toBe(
      "Finanzas personales",
    );
    expect(container.textContent).toContain("Finanzas personales");
  });

  it("preserves and displays a canonical donation topic", () => {
    const { container } = renderFromUrl(
      "?categoria=donacion&tema=becas-y-estudio",
    );
    expect(topicSelect()!.value).toBe("becas-y-estudio");
    expect(topicSelect()!.selectedOptions[0]!.textContent).toBe(
      "Becas y estudio",
    );
    expect(container.textContent).toContain("Becas y estudio");
  });

  it("accepts the shorthand tema=finanzas rather than dropping it", () => {
    renderFromUrl("?categoria=orientacion&tema=finanzas");
    expect(topicSelect()!.value).toBe("finanzas-personales");
  });

  it("accepts the shorthand tema=becas rather than dropping it", () => {
    renderFromUrl("?categoria=donacion&tema=becas");
    expect(topicSelect()!.value).toBe("becas-y-estudio");
  });

  it("seeds the subject with the topic, still editable", async () => {
    const user = userEvent.setup();
    renderFromUrl("?categoria=donacion&tema=biblioteca");

    const subject = screen.getByLabelText(/^asunto/i);
    expect(subject).toHaveValue("Biblioteca");

    await user.clear(subject);
    await user.type(subject, "Otra cosa");
    expect(subject).toHaveValue("Otra cosa");
  });

  it("ignores a topic that belongs to another category", () => {
    renderFromUrl("?categoria=orientacion&tema=biblioteca");
    expect(categorySelect().value).toBe("orientacion");
    expect(topicSelect()!.value).toBe("");
  });

  it("ignores an unknown topic without losing the category", () => {
    renderFromUrl("?categoria=donacion&tema=no-existe");
    expect(categorySelect().value).toBe("donacion");
    expect(topicSelect()!.value).toBe("");
  });
});

describe("the topic field follows the category", () => {
  it("lists the orientation topics under orientation", () => {
    render(<ContactPage initialCategory="orientacion" />);
    const values = [...topicSelect()!.options].map((o) => o.value);
    expect(values).toEqual([
      "",
      ...topicsForCategory("orientacion").map((t) => t.id),
    ]);
  });

  it("lists the donation areas under donation", () => {
    render(<ContactPage initialCategory="donacion" />);
    const values = [...topicSelect()!.options].map((o) => o.value);
    expect(values).toEqual([
      "",
      ...topicsForCategory("donacion").map((t) => t.id),
    ]);
  });

  it("is hidden for categories that have no topics", () => {
    for (const id of ["general", "prensa", "juridico"] as InquiryCategoryId[]) {
      const { unmount } = render(<ContactPage initialCategory={id} />);
      expect(topicsForCategory(id)).toHaveLength(0);
      expect(topicSelect()).toBeNull();
      unmount();
    }
  });

  it("swaps the options when the category changes", async () => {
    const user = userEvent.setup();
    render(<ContactPage initialCategory="orientacion" />);

    expect([...topicSelect()!.options].map((o) => o.value)).toContain(
      "finanzas-personales",
    );

    await user.selectOptions(categorySelect(), "donacion");

    const values = [...topicSelect()!.options].map((o) => o.value);
    expect(values).toContain("becas-y-estudio");
    expect(values).not.toContain("finanzas-personales");
  });

  it("drops a topic that the new category does not offer", async () => {
    const user = userEvent.setup();
    renderFromUrl("?categoria=orientacion&tema=finanzas-personales");
    expect(topicSelect()!.value).toBe("finanzas-personales");

    await user.selectOptions(categorySelect(), "donacion");
    expect(topicSelect()!.value).toBe("");
  });

  it("hides the field when moving to a category without topics", async () => {
    const user = userEvent.setup();
    render(<ContactPage initialCategory="orientacion" />);
    expect(topicSelect()).not.toBeNull();

    await user.selectOptions(categorySelect(), "general");
    expect(topicSelect()).toBeNull();
  });
});

describe("accessibility and React correctness", () => {
  it("labels both selects properly rather than relying on a placeholder", () => {
    render(<ContactPage initialCategory="orientacion" />);
    expect(categorySelect().id).toBe("category");
    expect(topicSelect()!.id).toBe("topic");
    // Explicit <label for> elements, not placeholder text.
    expect(screen.getByText("Categoría").tagName).toBe("LABEL");
    expect(screen.getByText("Tema").tagName).toBe("LABEL");
  });

  it("marks the optional topic as optional rather than required", () => {
    render(<ContactPage initialCategory="orientacion" />);
    expect(topicSelect()).not.toBeRequired();
    expect(topicSelect()!.getAttribute("aria-describedby")).toBe("topic-help");
  });

  it("is reachable and operable by keyboard", async () => {
    const user = userEvent.setup();
    render(<ContactPage initialCategory="orientacion" />);

    categorySelect().focus();
    expect(categorySelect()).toHaveFocus();

    await user.selectOptions(categorySelect(), "donacion");
    expect(categorySelect().value).toBe("donacion");
  });

  it("logs no controlled/uncontrolled warning for URL-driven values", async () => {
    const user = userEvent.setup();
    renderFromUrl("?categoria=orientacion&tema=finanzas-personales");
    await user.selectOptions(categorySelect(), "donacion");
    await user.selectOptions(categorySelect(), "general");

    const messages = [...warn.mock.calls, ...error.mock.calls].flat().join(" ");
    expect(messages).not.toMatch(/uncontrolled/i);
    expect(messages).not.toMatch(/value prop on `select`/i);
  });
});
