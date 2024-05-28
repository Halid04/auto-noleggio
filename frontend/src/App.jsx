import React, { useEffect, useCallback } from "react";
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

  const fetchUserData = useCallback((token) => {
    const url = "http://localhost/auto-noleggio/backend/public/clienti";

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.content.length > 0) {
          const user = data.content[0];
          localStorage.setItem("userID", user.id_cliente);
          localStorage.setItem("userName", user.nome);
          localStorage.setItem("userSurname", user.cognome);
          localStorage.setItem("userPhone", user.telefono);
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userBirthdate", user.data_di_nascita);
        }
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero dei dati dell'utente:",
          error
        );
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      fetchUserData(token);
    }
  }, [fetchUserData]);

  const isTransactionPage = location.pathname.startsWith("/transazione");

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
            <Route path="/transazione/:idAuto" element={<Transazione />} />
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
