import ReactDOM from "react-dom";
import "./main.css";
import App from "./App.jsx";
import React from "react";
import store from "./store.js";

import reloadMagic from "./reload-magic-client.js"; // automatic reload
import { Provider } from "react-redux";

reloadMagic(); // automatic reload

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
