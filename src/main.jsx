import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./locales"; // i18n 초기화

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
