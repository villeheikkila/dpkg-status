import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { PortalProvider } from "./components/Portal";

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:2222";

ReactDOM.render(
  <PortalProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PortalProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
