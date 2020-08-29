import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { PortalProvider } from "./components/Portal";

ReactDOM.render(
  <PortalProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PortalProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
