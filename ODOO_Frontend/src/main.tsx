import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppProviders } from "@/app/providers";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Failed to find the root element. Ensure index.html contains <div id=\"root\"></div>."
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>
);