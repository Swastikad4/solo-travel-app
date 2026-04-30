import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Destination from "./pages/Destination";
import PlanTrip from "./pages/PlanTrip";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:name" element={<Destination />} />
        <Route path="/plan" element={<PlanTrip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;