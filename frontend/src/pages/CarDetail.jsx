import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const CarDetail = () => {
  const { idAuto } = useParams();
  const [carDetail, setCarDetail] = useState([]);
  // const [mainImage, setMainImage] = useState(car.images[0]);

  const getCarDetail = () => {
    const requestParams = { id: idAuto };
    const url = `http://localhost/auto-noleggio/backend/public/veicoli?json=${encodeURIComponent(
      requestParams
    )}`;

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
        console.log(data.content);
        setCarDetail(data.content);
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero dei dettagli dell'auto:",
          error
        );
      });
  };

  return (
    <div className="flex flex-col md:flex-row p-6">
      <h1 className="text-4xl text-black">{idAuto}</h1>
      {/* <div className="flex-1">
        <img src={mainImage} alt={car.name} className="w-full h-auto rounded-lg" />
        <div className="flex justify-around mt-4">
          {car.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className="w-16 h-16 rounded-lg cursor-pointer"
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 md:ml-6 mt-6 md:mt-0">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{car.name}</h1>
          <p className="text-gray-600">
            <strong>Data di acquisto:</strong> {car.purchaseDate}
          </p>
          <p className="text-gray-600">
            <strong>Tipo di carburante:</strong> {car.fuelType}
          </p>
          <p className="text-gray-600">
            <strong>Chilometri:</strong> {car.kilometers} km
          </p>
          <p className="text-gray-600">
            <strong>Prezzo:</strong> €{car.price}
          </p>
          <div className="space-x-2">
            {car.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 h-7 text-sm font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-400">
            <MapPin className="mr-1" />
            <p>{car.location}</p>
          </div>
        </div>
        <div className="mt-6">
          <button
            className="w-full text-white bg-[#FF690F] hover:bg-[#d55508] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Noleggia
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default CarDetail;
