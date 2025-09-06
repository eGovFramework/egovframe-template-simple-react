import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

async function enableMocking() {
  const isMockApiEnable = import.meta.env.VITE_APP_MOCK_API_ENABLE;
  if (isMockApiEnable === "true") {
    const { worker } = await import("./mocks/node.js");
    return worker.start();
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
