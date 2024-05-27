import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Auto from "./pages/Auto.jsx";
import AutoNoleggiate from "./pages/AutoNoleggiate.jsx";
import Sedi from "./pages/Sedi.jsx";
import Preferiti from "./pages/Preferiti.jsx";
import Transazione from "./pages/Transazione.jsx";
import CarDetail from "./pages/CarDetail.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

import "./App.css";

function App() {
  const location = useLocation();

  // useEffect(() => {
  //   console.log("Current route:", location.pathname);
  // }, [location]);

  const isTransactionPage = location.pathname === "/transazione";
  // const isImpostazioniProfiliAdminPage = location.pathname === "/impostazioniProfiliAdmin";

  return (
    <div className="h-[100vh] w-full bg-white flex flex-col justify-between items-center">
      {!isTransactionPage && <Header />}
      <div
        className={`h-full w-full flex ${
          isTransactionPage ? "" : "justify-between items-start"
        }`}
      >
        {!isTransactionPage && <Sidebar />}
        <div
          className={`h-full ${
            isTransactionPage ? "w-full" : "w-[80vw]"
          } flex justify-start items-start`}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/auto" element={<Auto />} />
            <Route path="/autoNoleggiate" element={<AutoNoleggiate />} />
            <Route path="/sedi" element={<Sedi />} />
            <Route path="/preferiti" element={<Preferiti />} />
            <Route path="/transazione" element={<Transazione />} />
            <Route path="/carDetail/:idAuto" element={<CarDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function MainApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default MainApp;
