import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Transazione() {
  const { idAuto } = useParams();
  const navigate = useNavigate();
  const [carDetail, setCarDetail] = useState([]);

  useEffect(() => {
    getCarDetail();
  }, [idAuto]);

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
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero dei dettagli dell'auto:",
          error
        );
      });
  };
  return (
    <div className="h-full w-full bg-white flex flex-col sm:flex-row justify-between items-center">
      <div className="h-[65vh] sm:h-full w-full sm:w-[75vw] bg-red-500">1</div>
      <div className="h-[35vh] sm:h-full w-full sm:w-[25vw] flex flex-col justify-between items-center">
        <div className="w-full h-[60vh] py-2 sm:py-5 px-2 sm:px-5 sm:h-[70vh] font-bold flex flex-wrap sm:flex-col text-[#192024]">
          <h1 className="text-2xl ">Riepilogo transazione</h1>

          <div className="w-full flex flex-wrap sm:flex-col">
            {/* sezione macchina */}
            <div className="w-1/2 sm:w-full flex flex-col sm:mt-3 order-1">
              <h2 className="text-[#808080] text-sm ">Macchina</h2>
              <p>
                {carDetail && carDetail.length > 0 && carDetail[0].marca}{" "}
                {carDetail && carDetail.length > 0 && carDetail[0].modello}
              </p>
            </div>

            {/* sezione data ritiro */}
            <div className="w-1/2 sm:w-full flex flex-col sm:mt-2 order-4 sm:order-2">
              <h2 className="text-[#808080] text-sm">Data ritiro</h2>
              <p>25/05/2024</p>
            </div>

            {/* sezione data consegna */}
            <div className="w-1/2 sm:w-full flex flex-col sm:mt-2 order-3">
              <h2 className="text-[#808080] text-sm">Data consegna</h2>
              <p>28/05/2024</p>
            </div>

            {/* sezione metodo di pagamento */}
            <div className="w-1/2 sm:w-full flex flex-col sm:mt-2 order-2 sm:order-4">
              <h2 className="text-[#808080] text-sm ">Metodo di pagamento</h2>
              <div className="w-full flex justify-between">
                <label htmlFor="pagaSubito">Paga subito</label>
                <input
                  type="radio"
                  id="pagaSubito"
                  name="metodoPagamento"
                  value="pagaSubito"
                />
              </div>
              <div className="w-full flex justify-between">
                <label htmlFor="pagaRitiro">
                  Paga al ritito (10% di anticipo)
                </label>
                <input
                  type="radio"
                  id="pagaRitiro"
                  name="metodoPagamento"
                  value="pagaRitiro"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[40vh] sm:h-[30vh] bg-[#F0F3F5] flex flex-col gap-2 sm:gap-3 py-2 sm:py-5 px-2 sm:px-5">
          <div className="w-full font-bold text-lg flex justify-between items-center">
            <h2>Totale:</h2>
            <p>1,345.00€</p>
          </div>
          <button
            className="w-full -opacity-50 sm:mt-3 whitespace-nowrap outline-none text-white border-[1.5px] border-transparent bg-[#FF690F] hover:bg-[#d55508] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg px-5 py-1 text-center"
            type="button"
            disabled
          >
            Noleggia auto
          </button>
          <button
            className="w-full whitespace-nowrap text-[#FF690F] border-[1.5px] border-[#FF690F] outline-none bg-transparent hover:bg-[#EEEEEE] hover:dark:bg-[#2E3438] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg px-5 py-1 text-center"
            type="button"
            onClick={() => navigate("/auto")}
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transazione;
