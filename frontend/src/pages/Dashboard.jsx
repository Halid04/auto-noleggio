import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { ArrowLeft } from "lucide-react";
import MapGPS from "../components/MapGPS";
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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [veicoloPosizione, setVeicoloPosizione] = useState([]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  let headers = {};

  const token = localStorage.getItem("userToken");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const getCarDetail = (idAuto) => {
    const requestParams = { id: idAuto };
    const url = `http://localhost/auto-noleggio/backend/public/veicoli?json=${encodeURIComponent(
      JSON.stringify(requestParams)
    )}`;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    return fetch(url, {
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
        return data.content[0].marca + " " + data.content[0].modello;
        // console.log("carDetail", data.content[0].modello);
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero dei dettagli dell'auto:",
          error
        );
        return null; // Handle the error case by returning null or an empty object
      });
  };

  useEffect(() => {
    fetch("http://localhost/auto-noleggio/backend/public/admin", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData.content);

        const veicoloGPSPromises =
          jsonData &&
          jsonData.content &&
          jsonData.content.macchina_gps &&
          jsonData.content.macchina_gps.map(async (car) => {
            const carDetail = await getCarDetail(car.id_veicolo);
            return {
              carDetail,
              id_veicolo: car.id_veicolo,
              latitudine: car.latitudine,
              longitudine: car.longitudine,
            };
          });

        Promise.all(veicoloGPSPromises).then((veicoloGPS) => {
          setVeicoloPosizione(veicoloGPS);
        });
      })
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, []);

  veicoloPosizione &&
    veicoloPosizione.length > 0 &&
    console.log(veicoloPosizione);

  if (!data) {
    return <div>Caricamento ...</div>;
  } else {
    console.log(data);
  }

  const doughnutData = {
    labels: ["Disponibili", "Noleggiati"],
    datasets: [
      {
        label: "Stato veicolo",
        data: [data.num_macchine_disp, data.num_macchine_nol],
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
      },
    ],
  };

  const doughnutSediData = {
    labels: data.incassi_sedi.map((item) => item.nome), // Cambiato da 'item.sede' a 'item.nome'
    datasets: [
      {
        label: "Guadagni mensili",
        data: data.incassi_sedi.map((item) => parseFloat(item.proceeds)), // Cambiato da 'item.incassi' a 'item.proceeds'
        backgroundColor: data.incassi_sedi.map(
          (_, index) =>
            `rgba(${(index * 60) % 255}, ${(index * 100) % 255}, ${
              (index * 150) % 255
            }, 0.2)`
        ),
        borderColor: data.incassi_sedi.map(
          (_, index) =>
            `rgba(${(index * 60) % 255}, ${(index * 100) % 255}, ${
              (index * 150) % 255
            }, 1)`
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 overflow-x-hidden overflow-y-auto flex flex-col gap-7 h-full w-[100vw]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-3">
          <span
            title="Torna indietro"
            onClick={() => navigate("/auto")}
            className="cursor-pointer"
          >
            <ArrowLeft />
          </span>

          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>

        <button
          className="bg-orange-500 text-white px-4 py-1 rounded-lg"
          onClick={toggleModal}
        >
          + Aggiungi un veicolo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 py-5 rounded-lg shadow-md-best flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-2">Utenti</h2>
          <p className="text-3xl font-bold">{data.numero_utenti}</p>
        </div>
        <div className="bg-white p-4 py-5 rounded-lg shadow-md-best flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-2">
            Veicoli attualmente noleggiati
          </h2>
          <p className="text-3xl font-bold">{data.num_macchine_nol}</p>
        </div>
        <div className="bg-white p-4 py-5 rounded-lg shadow-md-best flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-2">Guadagni</h2>
          <p className="text-3xl font-bold">{data.incassi_totali}€</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md-best">
          <h2 className="text-lg font-semibold mb-2">Stato veicoli</h2>
          <div className="small-chart">
            <Doughnut data={doughnutData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md-best">
          <h2 className="text-lg font-semibold mb-2">Guadagni mensili</h2>
          <Line data={lineData} />
        </div>

        {/* <div className="grid grid-cols-2 gap-4 mb-4"> */}
        <div className="bg-white p-4 rounded-lg shadow-md-best">
          <h2 className="text-lg font-semibold mb-2">Guadagni sedi</h2>
          <div className="small-chart">
            <Doughnut data={doughnutSediData} />
          </div>
        </div>
        {/* </div> */}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md-best">
        <h2 className="text-lg font-semibold mb-2">
          Geolocalizzazione veicoli
        </h2>
        <MapGPS veicoloPosizione={veicoloPosizione} />
      </div>
      <div className="bg-white w-full p-4 rounded-lg shadow-md-best">
        <h2 className="text-lg font-semibold mb-2">Dettagli veicoli</h2>
        <div className="w-full h-[25rem] overflow-y-auto overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modello
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localizzazione
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.macchina_gps.map((car) => (
                <tr key={car.id_dispositivogps}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {car.id_veicolo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.modello}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {car.tipo_veicolo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {car.latitudine}, {car.longitudine}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="bg-white w-full p-4 rounded-lg shadow-md-best">
        <h2 className="text-lg font-semibold mb-2">Veicoli</h2>
        <div className="w-full h-[25rem] overflow-y-auto overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modello
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localizzazione
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.macchina_gps.map((car) => (
                <tr key={car.id_dispositivogps}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {car.id_veicolo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.modello}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {car.tipo_veicolo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {car.latitudine}, {car.longitudine}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}

      <div className="bg-white w-full p-4 rounded-lg shadow-md-best">
        <h2 className="text-lg font-semibold mb-2">Utenti</h2>
        <div className="w-full h-[25rem] overflow-y-auto overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cognome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.lista_veicoli.map((user) => (
                <tr key={user.id_cliente}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.id_cliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.cognome}
                  </td>
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