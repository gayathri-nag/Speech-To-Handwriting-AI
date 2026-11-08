import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Convert from "./pages/Convert";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<Convert />} />
      </Routes>
    </Router>
  );
}

export default App;