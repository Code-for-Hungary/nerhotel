import { createRoot } from "react-dom/client";
import ReactGA from "react-ga";
import "./index.css";
import App from "./App";
import "./i18n";

const container = document.getElementById("root");
const root = createRoot(container);

ReactGA.initialize(process.env.REACT_APP_GA_ID, {
  debug: process.env.NODE_ENV === "development",
});

root.render(<App />);
