import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { MapPin } from "lucide-react";

const CarDetail = () => {
  const { idAuto } = useParams();
  const navigate = useNavigate();
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
      setMainImage(newPaths[0]);
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
    return <p>Loading...</p>;
  }

  const handleNavigateToTransaction = (id) => {
    const token = localStorage.getItem("userToken");

    if (token) {
      navigate(`/transazione/${id}`);
    } else {
      toast.error(
        "Devi effettuare l'accesso per procedere con il noleggio dell'auto."
      );
    }
  };

  return (
    <div className="flex flex-col justify-start md:flex-row p-6 w-full h-[100vh] overflow-x-hidden overflow-y-auto">
      <div className="flex flex-col w-full md:w-1/2">
        {mainImage && (
          <img
            src={`/src/progettoGPOAutoImages${mainImage}.jpg`}
            alt={mainImage}
            className="w-full h-[10rem] md:h-[20rem] 2xl:h-[35rem] rounded-lg object-cover"
          />
        )}
        <div className="flex justify-around mt-4">
          {imgNewPath.length > 0 &&
            imgNewPath.map((image, index) => (
              <img
                key={index}
                src={`/src/progettoGPOAutoImages${image}.jpg`}
                alt={`Thumbnail ${image}`}
                className={`${
                  image === mainImage ? "brightness-75" : ""
                } w-14 h-14 md:w-20 md:h-20 2xl:w-32 2xl:h-32 border-[1.5px] border-[#EEEEEE]  object-cover hover:brightness-75 transition-all rounded-lg cursor-pointer`}
                onClick={() => setMainImage(image)}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col w-full md:w-1/2 md:ml-6 mt-6 md:mt-0">
        <div className="space-y-4 2xl:space-y-7">
          <h1 className="text-3xl 2xl:text-6xl text-[#192024] dark:text-white font-bold">
            {carDetail[0].marca} {carDetail[0].modello}
          </h1>
          <p className="text-[#192024] dark:text-white text-base 2xl:text-2xl">
            <strong>Data di acquisto:</strong>{" "}
            {carDetail[0].anno_immatricolazione}
          </p>
          <p className="text-[#192024] dark:text-white text-base 2xl:text-2xl">
            <strong>Tipo di carburante:</strong>{" "}
            {carDetail[0].tipo_carburazione}
          </p>
          <p className="text-[#192024] dark:text-white text-base 2xl:text-2xl">
            <strong>Chilometri:</strong> {carDetail[0].chilometraggio} km
          </p>
          <p className="text-[#192024] dark:text-white text-base 2xl:text-2xl">
            <strong>Prezzo:</strong> {carDetail[0].costo_giornaliero} €/G
          </p>
          <p className="text-[#192024] dark:text-white text-base 2xl:text-2xl">
            <strong>Targa:</strong> {carDetail[0].targa}
          </p>
          <p className="text-[#192024] dark:text-white text-base 2xl:text-2xl">
            <strong>Numero posti:</strong> {carDetail[0].numero_posti}
          </p>
          <div className="space-x-2 2xl:space-x-4">
            <span className="inline-flex items-center px-3 2xl:px-7 h-7 2xl:h-10 text-sm 2xl:text-xl font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508]">
              {carDetail[0].tipo_veicolo}
            </span>
            <span className="inline-flex items-center px-3 2xl:px-7 h-7 2xl:h-10 text-sm 2xl:text-xl text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508]">
              {carDetail[0].tipo_carburazione}
            </span>
            <span className="inline-flex items-center px-3 2xl:px-7 h-7 2xl:h-10 text-sm 2xl:text-xl text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508]">
              {carDetail[0].colore_veicolo}
            </span>
          </div>
          <div className="flex items-center text-[#192024] dark:text-white ">
            <MapPin className="mr-1 stroke-[#192024] dark:stroke-white" />
            <p className="2xl:text-2xl">
              {carDetail[0].città}, {carDetail[0].indirizzo}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center gap-3">
          <button
            onClick={() => handleNavigateToTransaction(idAuto)}
            className="w-1/2 whitespace-nowrap 2xl:text-2xl outline-none text-white border-[1.5px] border-transparent bg-[#FF690F] hover:bg-[#d55508] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg  px-5 py-2 2xl:py-3 text-center"
          >
            Noleggia
          </button>
          <button
            onClick={() => navigate("/auto")}
            className="w-1/2 whitespace-nowrap 2xl:text-2xl text-[#FF690F] border-[1.5px] border-[#FF690F] outline-none bg-transparent hover:bg-[#EEEEEE] hover:dark:bg-[#2E3438] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg  px-5 py-2 2xl:py-3 text-center"
          >
            Torna indietro
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
