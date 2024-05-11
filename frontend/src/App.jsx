import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test.jsx";

import "./App.css";

function App() {
  return (
    <HashRouter>
      <div className="h-[100vh] w-full bg-white flex flex-col justify-between items-center">
        <Routes>
          <Route path="/" element={<Test />} />
          <Route exact path="/test" element={<Test />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
