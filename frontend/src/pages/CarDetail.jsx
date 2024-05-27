import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const CarDetail = () => {
  const { idAuto } = useParams();
  const [carDetail, setCarDetail] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const [imgNewPath, setImgNewPath] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    getCarDetail();
  }, [idAuto]);

  useEffect(() => {
    if (carImages && carImages.length > 0) {
      const newPaths = carImages.map((img) => {
        const baseName = img.nome_foto.slice(0, -1);
        return `/${baseName}/${img.nome_foto}`;
      });
      setImgNewPath(newPaths);
      setMainImage(newPaths[0]); // Imposta l'immagine principale iniziale
    }
  }, [carImages]);

  const getCarDetail = () => {
    const requestParams = { id: idAuto };
    const url = `http://localhost/auto-noleggio/backend/public/veicoli?json=${encodeURIComponent(
      JSON.stringify(requestParams)
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
        console.log("carDetail", data.content);
        setCarDetail(data.content);
        setCarImages(data.content[0].images);
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero dei dettagli dell'auto:",
          error
        );
      });
  };

  if (!carDetail || carDetail.length === 0) {
    return <p>Loading...</p>; // o qualsiasi altro messaggio di caricamento
  }

  return (
    <div className="flex flex-col md:flex-row p-6">
      <div className="flex-1">
        {mainImage && (
          <img
            src={`/src/progettoGPOAutoImages${mainImage}.jpg`}
            alt={mainImage}
            className="w-full h-auto rounded-lg"
          />
        )}
        <div className="flex justify-around mt-4">
          {imgNewPath &&
            imgNewPath.map((image, index) => (
              <img
                key={index}
                src={`/src/progettoGPOAutoImages${image}.jpg`}
                alt={`Thumbnail ${image}`}
                className="w-16 h-16 rounded-lg cursor-pointer"
                onClick={() => setMainImage(image)}
              />
            ))}
        </div>
      </div>
      <div className="flex-1 md:ml-6 mt-6 md:mt-0">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">
            {carDetail[0].marca} {carDetail[0].modello}
          </h1>
          <p className="text-gray-600">
            <strong>Data di acquisto:</strong>{" "}
            {carDetail[0].anno_immatricolazione}
          </p>
          <p className="text-gray-600">
            <strong>Tipo di carburante:</strong>{" "}
            {carDetail[0].tipo_carburazione}
          </p>
          <p className="text-gray-600">
            <strong>Chilometri:</strong> {carDetail[0].chilometraggio} km
          </p>
          <p className="text-gray-600">
            <strong>Prezzo:</strong> €{carDetail[0].costo_giornaliero}
          </p>
          <div className="space-x-2">
            <span className="inline-flex items-center px-3 h-7 text-sm font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508]">
              {carDetail[0].tipo_veicolo}
            </span>
            <span className="inline-flex items-center px-3 h-7 text-sm font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508]">
              {carDetail[0].tipo_carburazione}
            </span>
            <span className="inline-flex items-center px-3 h-7 text-sm font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508]">
              {carDetail[0].colore_veicolo}
            </span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-400">
            <MapPin className="mr-1" />
            <p>{carDetail[0].nome_sede}</p>
          </div>
        </div>
        <div className="mt-6">
          <button className="w-full text-white bg-[#FF690F] hover:bg-[#d55508] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Noleggia
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
