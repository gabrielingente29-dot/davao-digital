import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/index.css";
import { ThanksRoute } from "@/pages/thanks";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThanksRoute />
  </StrictMode>,
);
