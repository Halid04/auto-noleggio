import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function InsertCar({ setVisible }) {
  const [sediAutoNoleggio, setSediAutoNoleggio] = useState([]);
  const [dispositiviGpsAutoNoleggio, setDispositiviGpsAutoNoleggio] = useState(
    []
  );
  const [sedeAuto, setSedeAuto] = useState("");
  const [dispositivoGpsAuto, setDispositivoGpsAuto] = useState("");
  const [immagineVeicolo1, setImmagineVeicolo1] = useState("");
  const [immagineVeicolo2, setImmagineVeicolo2] = useState("");
  const [immagineVeicolo3, setImmagineVeicolo3] = useState("");
  const [immagineVeicolo4, setImmagineVeicolo4] = useState("");
  const [carData, setCarData] = useState({
    marca: "",
    targa: "",
    modello: "",
    anno_immatricolazione: "",
    numero_posti: "",
    tipo_carburazione: "",
    tipo_veicolo: "",
    colore_veicolo: "",
    chilometraggio: "",
    costo_giornaliero: "",
  });

  const handleGetFileName = (file) => {
    const fileName = file[0].name;
    const fileNameWithoutExtension = fileName.split(".").slice(0, -1).join(".");

    return fileNameWithoutExtension;
  };

  useEffect(() => {
    getSedi();
    getDispositiviGps();
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
        console.log(data);
        const sediMap = data.content.map((sede) => ({
          id: sede.id_sede,
          nome: sede.nome,
          citta: sede.città,
          indirizzo: sede.indirizzo,
        }));
        setSediAutoNoleggio(sediMap);
      })
      .catch((error) => {
        console.error("Errore durante il recupero delle sedi:", error);
      });
  };

  const getDispositiviGps = () => {
    const url = "http://localhost/auto-noleggio/backend/public/gps/dispositivi";

    const token = localStorage.getItem("userToken");
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
        console.log(data);
        const dispositiviGpsMap = data.content.map((dispositivo) => ({
          id: dispositivo.id_dispositivogps,
        }));
        setDispositiviGpsAutoNoleggio(dispositiviGpsMap);
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei dispositivi gps:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleInsertSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("userToken");
    const url = "http://localhost/auto-noleggio/backend/public/veicolo";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestBody = {
      marca: carData.marca,
      targa: carData.targa,
      modello: carData.modello,
      anno_immatricolazione: carData.anno_immatricolazione,
      numero_posti: carData.numero_posti,
      tipo_carburazione: carData.tipo_carburazione,
      tipo_veicolo: carData.tipo_veicolo,
      colore_veicolo: carData.colore_veicolo,
      chilometraggio: carData.chilometraggio,
      costo_giornaliero: carData.costo_giornaliero,
      id_dispositivogps: "",
      id_sede: sedeAuto,
      images: [
        {
          nome_foto: handleGetFileName(immagineVeicolo1),
        },
        {
          nome_foto: handleGetFileName(immagineVeicolo2),
        },
        {
          nome_foto: handleGetFileName(immagineVeicolo3),
        },
        {
          nome_foto: handleGetFileName(immagineVeicolo4),
        },
      ],
    };

    console.log("Request body:", requestBody);

    // fetch(url, {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(carData),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.text().then((text) => {
    //         throw new Error(text);
    //       });
    //     } else {
    //       toast.success("Macchina inserita con successo", {
    //         duration: 1500,
    //       });

    //       return response.json(); // Moved inside the else block
    //     }
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setVisible(false);
    //   })
    //   .catch((error) => {
    //     const errorString = error.message.replace("Error: ", "");
    //     const errorObject = JSON.parse(errorString);
    //     toast.error(errorObject.message, {
    //       duration: 1500,
    //     });
    //   });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xs md:max-w-md bg-white border border-gray-200 rounded-lg shadow-lg p-4 overflow-y-auto max-h-[80vh]">
        <div className="flex justify-end">
          <X className="cursor-pointer" onClick={() => setVisible(false)} />
        </div>
        <form className="space-y-4" onSubmit={handleInsertSubmit}>
          <h5 className="text-lg font-medium text-gray-900">
            Inserisci Nuova Auto
          </h5>
          {[
            { label: "marca", name: "marca", type: "text" },
            { label: "Targa", name: "targa", type: "text" },
            { label: "Modello", name: "modello", type: "text" },
            {
              label: "Anno immatricolazione",
              name: "anno_immatricolazione",
              type: "date",
            },
            { label: "Numero posti", name: "numero_posti", type: "number" },
            {
              label: "Tipo carburazione",
              name: "tipo_carburazione",
              type: "text",
            },
            { label: "Tipo veicolo", name: "tipo_veicolo", type: "text" },
            { label: "Colore veicolo", name: "colore_veicolo", type: "text" },
            { label: "Chilometraggio", name: "chilometraggio", type: "number" },
            {
              label: "Costo giornaliero",
              name: "costo_giornaliero",
              type: "number",
            },
          ].map((field, index) => (
            <div key={index}>
              <label
                htmlFor={field.name}
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={carData[field.name]}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                required
              />
            </div>
          ))}
          <div>
            <label
              htmlFor="id_sede"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Sede di appartenenza
            </label>
            <select
              name="id_sede"
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              required
              onChange={(e) => setSedeAuto(e.target.value)}
            >
              {sediAutoNoleggio &&
                sediAutoNoleggio.length > 0 &&
                sediAutoNoleggio.map((sede, index) => {
                  return (
                    <option key={index} value={sede.id}>
                      {sede.nome} - {sede.citta}, {sede.indirizzo}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label
              htmlFor="id_dispositivogps"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Dispositivo Gps
            </label>
            <select
              name="id_dispositivogps"
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              // required
              onChange={(e) => setDispositivoGpsAuto(e.target.value)}
            >
              {dispositiviGpsAutoNoleggio &&
                dispositiviGpsAutoNoleggio.length > 0 &&
                dispositiviGpsAutoNoleggio.map((dispositivo, index) => {
                  return (
                    <option key={index} value={dispositivo.id}>
                      Dispositivo Gps - {dispositivo.id}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label
              htmlFor="immagineVeicolo1"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Immagine veicolo 1
            </label>
            <input
              type="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              id="immagineVeicolo1"
              required
              placeholder="Inserire immagine veicolo 1"
              onChange={(e) => setImmagineVeicolo1(e.target.files[0])}
            />
          </div>
          <div>
            <label
              htmlFor="immagineVeicolo2"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Immagine veicolo 2
            </label>
            <input
              type="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              id="immagineVeicolo2"
              required
              placeholder="Inserire immagine veicolo 2"
              onChange={(e) => setImmagineVeicolo2(e.target.files[0])}
            />
          </div>
          <div>
            <label
              htmlFor="immagineVeicolo3"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Immagine veicolo 3
            </label>
            <input
              type="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              id="immagineVeicolo1"
              required
              placeholder="Inserire immagine veicolo 3"
              onChange={(e) => setImmagineVeicolo3(e.target.files[0])}
            />
          </div>
          <div>
            <label
              htmlFor="immagineVeicolo4"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Immagine veicolo 4
            </label>
            <input
              type="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              id="immagineVeicolo1"
              required
              placeholder="Inserire immagine veicolo 4"
              onChange={(e) => setImmagineVeicolo4(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#FF690F] hover:bg-[#d55508] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Inserisci
          </button>
        </form>
      </div>
    </div>
  );
}

export default InsertCar;
