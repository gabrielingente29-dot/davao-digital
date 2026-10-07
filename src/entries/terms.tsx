import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/index.css";
import { TermsRoute } from "@/pages/terms";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <TermsRoute />
  </StrictMode>,
);
