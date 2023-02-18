import React from "react";
import { createRoot } from "react-dom/client";
import TagManager from "react-gtm-module";
import "./index.css";
import App from "./App";
import "./i18n";

const container = document.getElementById("root");
const root = createRoot(container);

const tagManagerArgs = {
  gtmId: import.meta.env.VITE_GTM_ID,
};

TagManager.initialize(tagManagerArgs);

root.render(<App />);
