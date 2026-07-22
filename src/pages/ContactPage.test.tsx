import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  ATTACHMENTS,
  collaborationPaths,
  inquiryCategories,
} from "../data/contact";
import { ContactSection } from "../components/sections/ContactSection";
import { ContactPage } from "./ContactPage";

describe("collaboration options are interactive", () => {
  it("renders every option as a link to the enquiry form", () => {
    render(<ContactSection />);
    for (const path of collaborationPaths) {
      const link = screen.getByRole("link", {
        name: new RegExp(path.audience, "i"),
      });
      expect(link).toHaveAttribute(
        "href",
        `/contacto.html?categoria=${path.category}`,
      );
    }
  });

  it("makes the whole option area clickable, not only the icon", () => {
    render(<ContactSection />);
    const link = screen.getByRole("link", {
      name: /Instituciones y programas públicos/i,
    });
    // The description text lives inside the same anchor.
    expect(link.textContent).toMatch(/Convenios, cooperación/i);
  });

  it("is reachable and activatable by keyboard", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    const link = screen.getByRole("link", {
      name: /Empresas y fundaciones/i,
    });

    link.focus();
    expect(link).toHaveFocus();

    // Anchors with href are activated by Enter natively.
    await user.keyboard("{Enter}");
    expect(link).toHaveAttribute("href", "/contacto.html?categoria=empresa");
  });
});

describe("category prefill", () => {
  for (const path of collaborationPaths) {
    it(`preselects "${path.category}" when opened from its option`, () => {
      render(<ContactPage initialCategory={path.category} />);
      const select = screen.getByLabelText(/categoría/i) as HTMLSelectElement;
      expect(select.value).toBe(path.category);
    });
  }

  it("lets the visitor change the category", async () => {
    const user = userEvent.setup();
    render(<ContactPage initialCategory="persona" />);
    const select = screen.getByLabelText(/categoría/i) as HTMLSelectElement;

    await user.selectOptions(select, "prensa");
    expect(select.value).toBe("prensa");
  });

  it("offers all seven categories", () => {
    render(<ContactPage initialCategory="general" />);
    const select = screen.getByLabelText(/categoría/i) as HTMLSelectElement;
    expect(select.options).toHaveLength(inquiryCategories.length);
  });
});

describe("validation and submission", () => {
  it("blocks submission and reports the missing required fields", async () => {
    const user = userEvent.setup();
    render(<ContactPage initialCategory="general" />);

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(await screen.findByText(/indique su nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/indique su apellido/i)).toBeInTheDocument();
    expect(
      screen.getByText(/necesitamos su autorización/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/recibimos tu mensaje/i)).toBeNull();
  });

  it("connects each error to its field for assistive technology", async () => {
    const user = userEvent.setup();
    render(<ContactPage initialCategory="general" />);
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    const firstName = screen.getByLabelText(/nombre/i, {
      selector: "#firstName",
    });
    expect(firstName).toHaveAttribute("aria-invalid", "true");
    expect(firstName).toHaveAttribute("aria-describedby", "firstName-error");
  });

  it("does not show the success state when no backend is configured", async () => {
    const user = userEvent.setup();
    render(<ContactPage initialCategory="empresa" />);

    await user.type(screen.getByLabelText(/^nombre/i), "Ana");
    await user.type(screen.getByLabelText(/apellido/i), "García");
    await user.type(screen.getByLabelText(/correo/i), "ana@ejemplo.org");
    await user.type(screen.getByLabelText(/^país/i), "Colombia");
    await user.type(screen.getByLabelText(/^ciudad/i), "Cali");
    await user.type(screen.getByLabelText(/^asunto/i), "Convenio");
    await user.type(
      screen.getByLabelText(/^mensaje/i),
      "Queremos explorar un convenio de cooperación.",
    );
    await user.click(screen.getByLabelText(/acepto el tratamiento/i));
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(/no fue enviado/i),
    );
    expect(screen.queryByText(/recibimos tu mensaje/i)).toBeNull();
  });

  it("preserves what the visitor typed after a failed submission", async () => {
    const user = userEvent.setup();
    render(<ContactPage initialCategory="empresa" />);

    await user.type(screen.getByLabelText(/^nombre/i), "Ana");
    await user.type(screen.getByLabelText(/apellido/i), "García");
    await user.type(screen.getByLabelText(/correo/i), "ana@ejemplo.org");
    await user.type(screen.getByLabelText(/^país/i), "Colombia");
    await user.type(screen.getByLabelText(/^ciudad/i), "Cali");
    await user.type(screen.getByLabelText(/^asunto/i), "Convenio");
    await user.type(
      screen.getByLabelText(/^mensaje/i),
      "Queremos explorar un convenio de cooperación.",
    );
    await user.click(screen.getByLabelText(/acepto el tratamiento/i));
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(screen.getByLabelText(/^nombre/i)).toHaveValue("Ana");
    expect(screen.getByLabelText(/^asunto/i)).toHaveValue("Convenio");
  });
});

describe("attachments in the form", () => {
  it("lists a selected file and allows removing it", async () => {
    const user = userEvent.setup();
    render(<ContactPage initialCategory="general" />);

    const input = screen.getByLabelText(/seleccionar archivos/i, {
      selector: "input",
    });
    await user.upload(input, new File(["x"], "informe.pdf"));

    // The file name appears twice by design: visibly, and inside the remove
    // button's screen-reader label. Assert on the button, which is unique.
    const remove = await screen.findByRole("button", {
      name: /quitar informe\.pdf/i,
    });
    expect(remove).toBeInTheDocument();

    await user.click(remove);
    expect(
      screen.queryByRole("button", { name: /quitar informe\.pdf/i }),
    ).toBeNull();
  });

  it("reports an unsupported file type instead of accepting it", async () => {
    render(<ContactPage initialCategory="general" />);

    const input = screen.getByLabelText(/seleccionar archivos/i, {
      selector: "input",
    });

    // userEvent honours the `accept` attribute, so it filters an .exe before
    // the component ever sees it. That filter is a browser convenience, not a
    // control: a renamed file or a drag-and-drop can still reach the input.
    // fireEvent bypasses it, which is what exercises the component's own check.
    fireEvent.change(input, {
      target: { files: [new File(["x"], "malicioso.exe")] },
    });

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/formato no admitido/i);
    expect(
      screen.queryByRole("button", { name: /quitar malicioso/i }),
    ).toBeNull();
  });

  it("reports a file that exceeds the size limit", async () => {
    const user = userEvent.setup();
    render(<ContactPage initialCategory="general" />);

    const input = screen.getByLabelText(/seleccionar archivos/i, {
      selector: "input",
    });
    const tooBig = new File(
      [new Uint8Array(ATTACHMENTS.maxFileBytes + 1)],
      "grande.pdf",
    );
    await user.upload(input, tooBig);

    expect(await screen.findByText(/MB por archivo/i)).toBeInTheDocument();
  });
});

describe("privacy", () => {
  it("links to the data treatment notice", () => {
    render(<ContactPage initialCategory="general" />);
    expect(
      screen.getByRole("link", { name: /tratamiento de datos/i }),
    ).toHaveAttribute("href", "#tratamiento-de-datos");
    expect(
      screen.getByRole("heading", {
        name: /qué hacemos con lo que nos envía/i,
      }),
    ).toBeInTheDocument();
  });
});
