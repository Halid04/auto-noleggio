import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Auto from "./pages/Auto.jsx";
import AutoNoleggiate from "./pages/AutoNoleggiate.jsx";
import Sedi from "./pages/Sedi.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="h-[100vh] w-full bg-white flex flex-col justify-between items-center">
        <Header />
        <div className="h-full w-full flex justify-between items-start">
          <Sidebar />
          <div className="h-full w-[80vw] flex justify-start items-start">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route exact path="/homePage" element={<HomePage />} />
              <Route exact path="/auto" element={<Auto />} />
              <Route
                exact
                path="/autoNoleggiate"
                element={<AutoNoleggiate />}
              />
              <Route exact path="/sedi" element={<Sedi />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
