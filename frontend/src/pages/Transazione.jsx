import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CreditCard, Calendar } from "lucide-react";

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

  const handleDataRitiroDateInput = () => {
    document.getElementById("dataRitiro").showPicker();
  };

  const handleDataConsegnaDateInput = () => {
    document.getElementById("dataConsegna").showPicker();
  };

  const handleGoToCodiceOTPSection = () => {
    const section = document.getElementById("container");
    if (section) {
      section.classList.add("translate-x-[-100vw]", "sm:translate-x-[-75vw]");
    } else {
      console.error("Element with id 'container' not found.");
    }
  };

  return (
    <div className="h-full w-full overflow-hidden bg-white flex flex-col sm:flex-row justify-between items-center">
      <div
        id="container"
        className="h-[65vh] transition-all duration-300 ease-in-out sm:h-full w-full sm:w-[75vw] flex shrink-0 grow-0 justify-between  text-[#192024]"
      >
        <div className="w-full h-full overflow-y-auto overflow-x-hidden shrink-0 grow-0 gap-2 sm:gap-1 py-2 sm:py-5 px-2 sm:px-5 font-bold flex flex-col text-[#192024]">
          <h1 className="text-2xl ">Dettagli transazione</h1>
          <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
            <button className="w-full sm:w-[49%] h-8 sm:py-2 flex gap-4 justify-center items-center rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)] focus:border-[#FF690F]">
              <img
                src="/src/assets/visaLogo.png"
                className=" w-8 aspect-square object-contain"
                alt="visaLogo"
              />
              <img
                src="/src/assets/masterCardLogo.png"
                className=" w-8 aspect-square object-contain"
                alt="visaLogo"
              />
              <img
                src="/src/assets/maestroCardLogo.png"
                className=" w-8 aspect-square object-contain"
                alt="visaLogo"
              />
            </button>
            <button className="w-full sm:w-[49%] h-8 sm:py-2 flex gap-4 justify-center items-center rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)] focus:border-[#FF690F]">
              <img
                src="/src/assets/payPalLogo.png"
                className=" w-16 aspect-square object-contain"
                alt="visaLogo"
              />
            </button>
          </div>

          {/* Dati carta di credito */}
          <h2 className="text-xl mt-5">Dati carta di credito</h2>
          <div className="w-full flex justify-between items-center">
            <div className="w-[40%] sm:w-[49%] gap-2 flex flex-col justify-start items-start">
              <label htmlFor="numeroCarta" className="text-[#808080] text-sm ">
                Numero carta
              </label>
              <div className="w-full flex justify-between items-center px-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Numero carta"
                  className="w-[70%] text-sm border-none outline-none font-bold "
                />
                <CreditCard size={20} className="stroke-[#192024]" />
              </div>
            </div>
            <div className="w-[55%] sm:w-[49%] gap-2 flex justify-between items-start">
              <div className="w-[45%] flex flex-col justify-start items-start gap-2">
                <label
                  htmlFor="numeroCarta"
                  className="text-[#808080] text-sm "
                >
                  Scadenza
                </label>
                <div className="w-full flex justify-between items-center px-3 py-[0.10rem] rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                  <select
                    className="select-month outline-none w-1/2 h-full border-r-[2px] border-[#808080rgb(128, 128, 128)]"
                    name=""
                    id=""
                  >
                    <option value="">01</option>
                    <option value="">02</option>
                    <option value="">03</option>
                    <option value="">04</option>
                    <option value="">05</option>
                    <option value="">06</option>
                    <option value="">07</option>
                    <option value="">08</option>
                    <option value="">09</option>
                    <option value="">10</option>
                    <option value="">11</option>
                    <option value="">12</option>
                  </select>
                  <select
                    className="select-year outline-none w-1/2 h-full px-2"
                    name=""
                    id=""
                  >
                    <option value="">24</option>
                    <option value="">25</option>
                    <option value="">26</option>
                    <option value="">27</option>
                    <option value="">28</option>
                    <option value="">29</option>
                    <option value="">30</option>
                    <option value="">31</option>
                    <option value="">32</option>
                    <option value="">33</option>
                    <option value="">34</option>
                    <option value="">35</option>
                  </select>
                </div>
              </div>

              <div className="w-[45%] gap-2 flex flex-col justify-start items-start">
                <label
                  htmlFor="numeroCarta"
                  className="text-[#808080] text-sm "
                >
                  CVV
                </label>
                <div className="w-full flex justify-between items-center px-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="CVV"
                    className="w-full text-sm border-none outline-none font-bold "
                  />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl mt-5">Informazioni personali</h2>
          <div className="w-full flex justify-between items-center flex-wrap gap-3">
            <div className="w-[45%] sm:w-[49%] gap-2 flex flex-col justify-start items-start">
              <label htmlFor="nome" className="text-[#808080] text-sm ">
                Nome
              </label>
              <div className="w-full flex justify-between items-center px-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Nome"
                  className="w-full text-sm border-none outline-none font-bold "
                />
              </div>
            </div>
            <div className="w-[45%] sm:w-[49%] gap-2 flex flex-col justify-start items-start">
              <label htmlFor="cognome" className="text-[#808080] text-sm ">
                Cognome
              </label>
              <div className="w-full flex justify-between items-center px-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Cognome"
                  className="w-full text-sm border-none outline-none font-bold "
                />
              </div>
            </div>
            <div className="w-[45%] sm:w-[49%] gap-2 flex flex-col justify-start items-start">
              <label htmlFor="email" className="text-[#808080] text-sm ">
                Email
              </label>
              <div className="w-full flex justify-between items-center px-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Email"
                  className="w-full text-sm border-none outline-none font-bold "
                />
              </div>
            </div>
            <div className="w-[45%] sm:w-[49%] gap-2 flex flex-col justify-start items-start">
              <label htmlFor="telefono" className="text-[#808080] text-sm ">
                Telefono
              </label>
              <div className="w-full flex justify-between items-center px-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Telefono"
                  className="w-full text-sm border-none outline-none font-bold "
                />
              </div>
            </div>
          </div>

          <h2 className="text-xl mt-5">Compila i seguenti campi</h2>
          <div className="w-full flex justify-between items-center flex-wrap gap-3">
            <div className="w-full sm:w-[49%] flex-wrap sm:flex-nowrap gap-2 flex justify-between items-start">
              <div className="w-full sm:w-[45%] gap-2 flex flex-col justify-start items-start">
                <label htmlFor="dataRitiro" className="text-[#808080] text-sm ">
                  Seleziona data ritiro auto
                </label>
                <div className="w-full flex justify-between items-center px-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                  <input
                    type="date"
                    name=""
                    id="dataRitiro"
                    className="w-full text-sm border-none outline-none font-bold "
                  />
                  <Calendar
                    onClick={handleDataRitiroDateInput}
                    size={20}
                    className="stroke-[#192024]"
                  />
                </div>
              </div>
              <div className="w-full sm:w-[45%] gap-2 flex flex-col justify-start items-start">
                <label
                  htmlFor="dataConsegna"
                  className="text-[#808080] text-sm "
                >
                  Seleziona data consegna auto
                </label>
                <div className="w-full flex justify-between items-center px-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                  <input
                    type="date"
                    name=""
                    id="dataConsegna"
                    className="w-full text-sm border-none outline-none font-bold "
                  />
                  <Calendar
                    onClick={handleDataConsegnaDateInput}
                    size={20}
                    className="stroke-[#192024]"
                  />
                </div>
              </div>
            </div>
            <div className="w-full sm:w-[49%] gap-2 flex flex-col justify-start items-start">
              <label htmlFor="email" className="text-[#808080] text-sm ">
                Seleziona la sede per il ritiro dell'auto
              </label>
              <div className="w-full flex justify-between items-center px-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <select
                  name="sedeRitiro"
                  className="w-full outline-none border-none"
                  id=""
                >
                  <option value="">1</option>
                  <option value="">2</option>
                </select>
              </div>
            </div>
          </div>
          <button
            className=" w-40 mt-5 cursor-pointer whitespace-nowrap outline-none text-white border-[1.5px] border-transparent bg-[#FF690F] hover:bg-[#d55508] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg px-5 py-1 text-center"
            type="button"
            onClick={handleGoToCodiceOTPSection}
          >
            continua
          </button>
        </div>
        <div className="w-full h-full shrink-0 grow-0 bg-black text-black">
          mamma
        </div>
      </div>
      <div className="h-[35vh] sm:h-full w-full sm:w-[25vw] flex flex-col justify-between items-center z-50 border-t-[1.5px] sm:border-l-[1.5px] border-[#808080rgb(128, 128, 128)]">
        <div className="w-full h-[60vh] bg-white py-2 sm:py-5 px-2 sm:px-5 sm:h-[70vh] font-bold flex flex-wrap sm:flex-col text-[#192024]">
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
