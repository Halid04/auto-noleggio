import React, { useState } from "react";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function InsertCar({ setVisible }) {
  const [carData, setCarData] = useState({
    id: "",
    targa: "",
    modello: "",
    anno: "",
    chilometraggio: "",
    posti: "",
    carburazione: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleInsertSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost/auto-noleggio/backend/public/insertCar";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(carData),
    })
      .then(async (response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        } else {
          toast.success("Inserimento avvenuto con successo", {
            duration: 1500,
          });

          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          setVisible(false);
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        const errorString = error.message.replace("Error: ", "");
        const errorObject = JSON.parse(errorString);
        toast.error(errorObject.message, {
          duration: 1500,
        });
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xs md:max-w-md bg-white border border-gray-200 rounded-lg shadow-lg p-4 overflow-y-auto max-h-[80vh]">
        <div className="flex justify-end">
          <X className="cursor-pointer" onClick={() => setVisible(false)} />
        </div>
        <form className="space-y-4" onSubmit={handleInsertSubmit}>
          <h5 className="text-lg font-medium text-gray-900">Inserisci Nuova Auto</h5>
          {[
            { label: "ID", name: "id" },
            { label: "Targa", name: "targa" },
            { label: "Modello", name: "modello" },
            { label: "Anno", name: "anno" },
            { label: "Chilometraggio", name: "chilometraggio" },
            { label: "Posti", name: "posti" },
            { label: "Carburazione", name: "carburazione" },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                id={field.name}
                value={carData[field.name]}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                required
              />
            </div>
          ))}
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
