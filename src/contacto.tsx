import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ContactPage } from "./pages/ContactPage.tsx";
import { readCategory, readTopic } from "./lib/contactInquiry.ts";
import "./index.css";

const search = window.location.search;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContactPage
      initialCategory={readCategory(search)}
      initialTopic={readTopic(search)}
    />
  </StrictMode>,
);
