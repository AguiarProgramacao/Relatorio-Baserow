import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Projects from "./Projects";
import GeralRelatorio from "./GeralRelatorio";
import bg from "./Slice-1-desk.webp";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", backgroundImage: `url(${bg})`, backgroundPositionX: "-110px" }}>
        <header className="App-header">
          <h1 style={{ marginTop: "0px"}}>Imigrei Assessoria de Imigração</h1>
          <Routes>
            <Route path="/" element={<Projects />} />
            <Route path="/geral" element={<GeralRelatorio />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
