import React from "react";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga";
import "./index.css";
import App from "./App";
import "./i18n";

const container = document.getElementById("root");
const root = createRoot(container);

ReactGA.initialize(import.meta.env.VITE_GA_ID);

root.render(<App />);
