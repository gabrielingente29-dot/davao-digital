import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/index.css";
import { PrivacyRoute } from "@/pages/privacy";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <PrivacyRoute />
  </StrictMode>,
);
