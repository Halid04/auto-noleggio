import React, { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import InsertCar from "../components/InsertCar"; // Adjust the path as needed

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  let headers = {};

  const token = localStorage.getItem("userToken");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

  useEffect(() => {
    fetch("http://localhost/auto-noleggio/backend/public/admin", {
      method: "GET",
      headers: headers
    })
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData.content))
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, []);

  /*

  const mapContainer = useRef(null);
  const map = useRef(null);
  const milan = { lng: 9.18854, lat: 45.464664 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = "zKTSY8Huqpuc98tNjLwq";
 
  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
 
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [milan.lng, milan.lat],
      zoom: zoom,
    });
 
    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([milan.lng, milan.lat])
      .addTo(map.current);
  }, [milan.lng, milan.lat, zoom]);

  
  */

  if (!data) {
    return <div>Loading...</div>;
  } else {
    console.log(data)

  }

  const doughnutData = {
    labels: ["Available", "Rented"],
    datasets: [
      {
        label: "Car Status",
        data: [data.num_macchine_disp, data.num_macchine_nol.occupied_vehicles],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: data.incassi_mensili.map((item) => item.mese),
    datasets: [
      {
        label: "Earnings",
        data: data.incassi_mensili.map((item) => parseFloat(item.incassi)),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      }
    ],
  };

  const doughnutSediData = {
    labels: data.incassi_sedi.map((item) => item.nome), // Cambiato da 'item.sede' a 'item.nome'
    datasets: [
      {
        label: "Earnings by Branch",
        data: data.incassi_sedi.map((item) => parseFloat(item.proceeds)), // Cambiato da 'item.incassi' a 'item.proceeds'
        backgroundColor: data.incassi_sedi.map((_, index) => `rgba(${(index * 60) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 0.2)`),
        borderColor: data.incassi_sedi.map((_, index) => `rgba(${(index * 60) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 1)`),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 overflow-x-hidden overflow-y-auto flex flex-col h-full w-[100vw]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          onClick={toggleModal}
        >
          + Add New Car
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-2xl">{data.numero_utenti}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Rented Cars</h2>
          <p className="text-2xl">{data.num_macchine_nol}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Earnings</h2>
          <p className="text-2xl">${data.incassi_totali}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Vehicle Status</h2>
          <div className="small-chart">
            <Doughnut data={doughnutData} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Sales Status</h2>
          <Line data={lineData} />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Branch Earnings</h2>
          <div className="small-chart">
            <Doughnut data={doughnutSediData} />
          </div>
        </div>
      </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Track Your Cars</h2>
        {/*<div ref={mapContainer} className="w-full h-64" />*/}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Car Details</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.macchina_gps.map((car) => (
                <tr key={car.id_dispositivogps}>
                  <td className="px-6 py-4 whitespace-nowrap">{car.id_veicolo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.modello}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.tipo_veicolo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {car.latitudine}, {car.longitudine}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Cars</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.macchina_gps.map((car) => (
                <tr key={car.id_dispositivogps}>
                  <td className="px-6 py-4 whitespace-nowrap">{car.id_veicolo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.modello}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.tipo_veicolo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {car.latitudine}, {car.longitudine}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.lista_veicoli.map((user) => (
                <tr key={user.id_cliente}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.id_cliente}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {isOpen && <InsertCar setVisible={setIsOpen} />}
    </div>
  );
};

export default Dashboard;