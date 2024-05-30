import React, { useState, useEffect } from "react";
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
}) {
  const navigate = useNavigate();
  const [randomImage, setRandomImage] = useState("");
  const [imgNewPath, setImgNewPath] = useState([]);

  useEffect(() => {
    if (images && images.length > 0) {
      const newPaths = images.map((img) => {
        const baseName = img.nome_foto.slice(0, -1);
        return `/${baseName}/${img.nome_foto}`;
      });
      setImgNewPath(newPaths);
    }
  }, [images]); // Run this effect whenever `images` changes

  const handleNavigateToCarDetail = (id) => {
    navigate(`/carDetail/${id}`);
  };

  return (
    <div
      onClick={() => handleNavigateToCarDetail(idAuto)}
      className=" w-64 cursor-pointer bg-white border border-gray-200 rounded-lg shadow hover:scale-[.95] transition-all duration-300 ease-in-out"
    >
      <div className=" absolute top-2 left-2 z-50">
        <Heart size={25} color="#192024" className="fill-[#1920242a]" />
      </div>
      <img
        className="rounded-t-lg w-full h-[10rem] object-cover"
        src={`/src/progettoGPOAutoImages${imgNewPath[0]}.png`}
        alt={imgNewPath[0]}
        loading="lazy"
      />
      <div className="px-2 py-5 flex flex-col justify-start items-start gap-2">
        <a href="#" className="infoCar flex items-baseline gap-1">
          <h5 className="whitespace-nowrap text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {marca}
          </h5>
          <p className="whitespace-nowrap text-sm font-normal text-[#192024] dark:text-gray-400">
            - {modello}
          </p>
        </a>
        <p className="text-sm font-normal text-[#192024] dark:text-gray-400">
          {anno_immatricolazione} | {chilometraggio} km |{" "}
          <span className="font-bold text-lg">{costo_giornaliero} €/G</span>
        </p>
        <div className="tags flex gap-1 mb-2">
          <span
            title={tipo_veicolo}
            className="whitespace-nowrap inline-flex items-center px-3 h-7 text-sm font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508] "
          >
            {tipo_veicolo.split(" ")[0]}
          </span>
          <span
            title={tipo_carburazione}
            className="whitespace-nowrap inline-flex items-center px-3 h-7 text-sm font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508] "
          >
            {tipo_carburazione.split(" ")[0]}
          </span>
          <span
            title={colore_veicolo}
            className="whitespace-nowrap inline-flex items-center px-3 h-7 text-sm font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508] "
          >
            {colore_veicolo.split(" ")[0]}
          </span>
        </div>
        <div className="oneline">
          <MapPin />{" "}
          <p className="whitespace-nowrap font-normal text-[#192024] dark:text-gray-400">
            {" "}
            {citta}, {indirizzo}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardAuto;
