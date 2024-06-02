import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Heart } from "lucide-react";

function CardAuto({
  idAuto,
  marca,
  modello,
  anno_immatricolazione,
  tipo_carburazione,
  chilometraggio,
  tipo_veicolo,
  numero_posti,
  colore_veicolo,
  costo_giornaliero,
  images,
  citta,
  indirizzo,
  favorited,
}) {
  const navigate = useNavigate();
  const [imgNewPath, setImgNewPath] = useState([]);
  const [isFavorite, setIsFavorite] = useState(favorited == 1 ? true : false);

  useEffect(() => {
    if (images && images.length > 0) {
      const newPaths = images.map((img) => {
        const baseName = img.nome_foto.slice(0, -1);
        return `/${baseName}/${img.nome_foto}`;
      });
      setImgNewPath(newPaths);
    }
  }, [images]);

  const handleNavigateToCarDetail = (id) => {
    navigate(`/carDetail/${id}`);
  };

  const addAutoToFavorite = async (idAuto, e) => {
    e.preventDefault();

    const token = localStorage.getItem("userToken");
    const url = "http://localhost/auto-noleggio/backend/public/preferiti";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestBody = {
      id: idAuto,
    };

    console.log("Request body:", requestBody);

    const method = isFavorite ? "DELETE" : "POST";
    console.log("Method:", method);

    fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        } else {
          setIsFavorite(!isFavorite);
          const successMessage = isFavorite
            ? `${marca} ${modello} rimosso dai preferiti!`
            : `${marca} ${modello} aggiunto ai preferiti!`;
          toast.success(successMessage, {
            duration: 1500,
          });
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
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
    <div className="w-64 2xl:w-[22rem] cursor-pointer bg-white rounded-lg shadow hover:scale-[.98] transition-all duration-300 ease-in-out">
      {localStorage.getItem("userToken") && (
        <form
          onSubmit={(e) => addAutoToFavorite(idAuto, e)}
          className="relative flex top-2 px-2 bg-white"
        >
          <button
            type="submit"
            className="border-none outline-none bg-transparent"
          >
            <Heart
              size={25}
              color="#192024"
              className="transition-all duration-300 ease-in-out cursor-pointer hover:scale-110 active:scale-75"
              style={{
                fill: isFavorite ? "#FF690F" : "#1920241a",
                stroke: isFavorite ? "#FF690F" : "#192024",
              }}
            />
          </button>
        </form>
      )}

      <img
        onClick={() => handleNavigateToCarDetail(idAuto)}
        className="rounded-t-lg w-full h-[10rem] object-cover"
        src={`/src/progettoGPOAutoImages${imgNewPath[0]}.jpg`}
        alt={imgNewPath[0]}
        loading="lazy"
      />

      <div className="px-2 py-5 bg-white dark:bg-[#192024] flex flex-col justify-start items-start gap-2 2xl:gap-5 transition-all duration-300 ease-in-out">
        <a href="#" className="infoCar flex items-baseline gap-1">
          <h5 className="whitespace-nowrap text-xl 2xl:text-2xl font-bold tracking-tight text-[#192024] dark:text-white">
            {marca}
          </h5>
          <p className="whitespace-nowrap text-sm 2xl:text-base font-normal text-[#192024] dark:text-white">
            - {modello}
          </p>
        </a>
        <p className="text-sm 2xl:text-base font-normal text-[#192024] dark:text-white">
          {anno_immatricolazione} | {chilometraggio} km |{" "}
          <span className="font-bold text-lg">{costo_giornaliero} €/G</span>
        </p>
        <div className="tags flex gap-1 mb-2">
          <span
            title={tipo_veicolo}
            className="whitespace-nowrap inline-flex items-center px-3 2xl:px-4 2xl:py-3 h-7 text-sm 2xl:text-base font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508] "
          >
            {tipo_veicolo.split(" ")[0]}
          </span>
          <span
            title={tipo_carburazione}
            className="whitespace-nowrap inline-flex items-center px-3 h-7 text-sm 2xl:text-base font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508] "
          >
            {tipo_carburazione.split(" ")[0]}
          </span>
          <span
            title={colore_veicolo}
            className="whitespace-nowrap inline-flex items-center px-3 h-7 text-sm 2xl:text-base font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508] "
          >
            {colore_veicolo.split(" ")[0]}
          </span>
        </div>
        <div className="oneline">
          <MapPin className="stroke-[#192024] dark:stroke-white" />{" "}
          <p className="whitespace-nowrap font-normal text-[#192024] dark:text-white">
            {citta}, {indirizzo}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardAuto;
