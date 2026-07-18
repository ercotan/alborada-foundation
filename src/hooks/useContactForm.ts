import React, { useState } from "react";

export interface ContactFormData {
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
}

const emptyForm: ContactFormData = {
  name: "",
  email: "",
  organization: "",
  interest: "alliance",
  message: "",
};

/**
 * State and submit handling for the institutional contact form.
 *
 * Submission is currently local only — the success panel is shown once the
 * required fields are filled. Wiring this to a real endpoint means changing
 * `handleSubmit` alone.
 */
export const useContactForm = () => {
  const [data, setData] = useState<ContactFormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <Field extends keyof ContactFormData>(
    field: Field,
    value: ContactFormData[Field],
  ) => {
    setData((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!data.name || !data.email || !data.message) {
      return;
    }

    setSubmitted(true);
  };

  /** Returns to the form view, keeping whatever was typed. */
  const resetSubmission = () => setSubmitted(false);

  return { data, updateField, submitted, handleSubmit, resetSubmission };
};
