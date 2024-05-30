import React, { useState, useEffect } from "react";
import Map from "../components/Map";

function Sedi() {
  const [sediAutoNoleggio, setSediAutoNoleggio] = useState([]);

  useEffect(() => {
    getSedi();
  }, []);

  const getSedi = () => {
    const url = "http://localhost/auto-noleggio/backend/public/sedi";

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
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
        const sediMap = data.content.map((sede) => ({
          nome: sede.nome,
          lat: sede.latitudine,
          lon: sede.longitudine,
        }));
        setSediAutoNoleggio(sediMap);
      })
      .catch((error) => {
        console.error("Errore durante il recupero delle sedi:", error);
      });
  };

  return (
    <div className="h-full w-full bg-[#F0F3F5]">
      <Map sedi={sediAutoNoleggio} />
    </div>
  );
}

export default Sedi;
