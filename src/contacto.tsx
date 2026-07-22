import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ContactPage } from "./pages/ContactPage.tsx";
import { readCategory } from "./lib/contactInquiry.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContactPage initialCategory={readCategory(window.location.search)} />
  </StrictMode>,
);
