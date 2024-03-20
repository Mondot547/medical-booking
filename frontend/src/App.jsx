import Home from "./views/Home";
import './assets/styles/App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointment from "./views/Appointment";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </Router>
  )
}

export default App
