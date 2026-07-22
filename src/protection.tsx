import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChildProtectionPage } from "./pages/ChildProtectionPage.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChildProtectionPage />
  </StrictMode>,
);
