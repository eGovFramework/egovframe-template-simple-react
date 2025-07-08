import RootRoutes from "@/routes";
import { BrowserRouter as Router } from "react-router-dom";

import "@/css/base.css";
import "@/css/layout.css";
import "@/css/component.css";
import "@/css/page.css";
import "@/css/response.css";

function App() {
  return (
    <div className="wrap">
      <Router>
        <RootRoutes />
      </Router>
    </div>
  );
}

export default App;
