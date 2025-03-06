import RootRoutes from "@/routes";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "@/css/base.css";
import "@/css/layout.css";
import "@/css/component.css";
import "@/css/page.css";
import "@/css/response.css";

function App() {
  return (
    <div className="wrap">
      <React.StrictMode>
        <Router>
          <RootRoutes />
        </Router>
      </React.StrictMode>
    </div>
  );
}

export default App;
