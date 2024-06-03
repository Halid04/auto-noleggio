import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import CountdownTimer from "../components/CountdownTimer";
import { useParams, useNavigate } from "react-router-dom";
import { CreditCard, Calendar } from "lucide-react";

function Transazione() {
  const { idAuto } = useParams();
  const navigate = useNavigate();
  const [sediAutoNoleggio, setSediAutoNoleggio] = useState([]);
  const [carDetail, setCarDetail] = useState([]);
  const [dataRitiro, setDataRitiro] = useState(getTodayDate);
  const [dataConsegna, setDataConsegna] = useState(getTodayDate);
  const [totale, setTotale] = useState(0);
  const [sconto, setSconto] = useState(false);
  const [IDChallengeRecived, setIDChallengeRecived] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [timers, setTimers] = useState([]);
  const [timerId, setTimerId] = useState(null);
  const [IDChallenge, setIDChallenge] = useState("");
  const [userInsertedOTP, setUserInsertedOTP] = useState("");
  const [userCanPay, setUserCanPay] = useState(false);
  const [userCreditCard, setUserCreditCard] = useState("");
  const [userCreditCardExpirationMonth, setUserCreditCardExpirationMonth] =
    useState("");
  const [userCreditCardExpirationYear, setUserCreditCardExpirationYear] =
    useState("");
  const [userCreditCardCVV, setUserCreditCardCVV] = useState("");
  const [userSedeRitiro, setUserSedeRitiro] = useState("");

  const calculateTotal = () => {
    const dateRitiro = new Date(dataRitiro);
    const dateConsegna = new Date(dataConsegna);

    const totalDays = Math.ceil(
      (dateConsegna - dateRitiro) / (1000 * 60 * 60 * 24)
    );
    let totalCalc = 0;

    if (totalDays > 0) {
      if (sconto) {
        // anticipo 10%
        totalCalc = Math.floor(
          (totalDays * carDetail[0].costo_giornaliero * 10) / 100
        );
      } else {
        totalCalc = totalDays * carDetail[0].costo_giornaliero;
      }
    }

    setTotale(totalCalc);
  };

  const obfuscateEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const localPartLength = localPart.length;

    if (localPartLength <= 2) {
      return email; // Non offuscare se il nome locale è troppo corto
    }

    const firstChar = localPart[0];
    const lastChar = localPart[localPartLength - 1];
    const obfuscatedPart = "*".repeat(localPartLength - 2);

    return `${firstChar}${obfuscatedPart}${lastChar}@${domain}`;
  };

  useEffect(() => {
    calculateTotal();
  }, [dataRitiro, dataConsegna, sconto]);

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  const handleDataRitiroChange = (event) => {
    const selectedDate = event.target.value;
    setDataRitiro(selectedDate);

    const nextDayDate = new Date(selectedDate);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    setDataConsegna(nextDayDate.toISOString().split("T")[0]);
  };

  const handleDataConsegnaChange = (event) => {
    const selectedDate = event.target.value;
    setDataConsegna(selectedDate);
  };

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

  const handleGoToFinalRiepilogoSection = () => {
    const section = document.getElementById("container");
    if (section) {
      section.classList.add("translate-x-[-200vw]", "sm:translate-x-[-150vw]");
    } else {
      console.error("Element with id 'container' not found.");
    }
  };

  useEffect(() => {
    getSedi();
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

  const handleCreditCardTypeOneSelection = () => {
    const creditCardSectionOne = document.querySelector(
      ".credit-card-section-one"
    );
    const creditCardSectionTwo = document.querySelector(
      ".credit-card-section-two"
    );

    creditCardSectionOne.classList.add("border-[#FF690F]");
    creditCardSectionTwo.classList.remove("border-[#FF690F]");
  };

  const handleCreditCardTypeTwoSelection = () => {
    const creditCardSectionOne = document.querySelector(
      ".credit-card-section-one"
    );
    const creditCardSectionTwo = document.querySelector(
      ".credit-card-section-two"
    );

    creditCardSectionTwo.classList.add("border-[#FF690F]");
    creditCardSectionOne.classList.remove("border-[#FF690F]");
  };

  const getIDChallenge = (e) => {
    if (e) e.preventDefault();
    const url =
      "http://localhost/auto-noleggio/backend/public/otp/getChallenge";
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
        setIDChallengeRecived(true);
        setNewEmail(obfuscateEmail(localStorage.getItem("userEmail")));

        if (!IDChallenge) {
          handleGoToCodiceOTPSection();
        }

        setIDChallenge(data.content.challenge_id);
        setTimerId(Date.now()); // Aggiorna il timer ID per avviare un nuovo timer
      })
      .catch((error) => {
        console.error("Errore durante il recupero dell'ID Challenge:", error);
      });
  };

  const checkOtpCode = (e) => {
    e.preventDefault();
    const url =
      "http://localhost/auto-noleggio/backend/public/otp/solveChallenge";
    const token = localStorage.getItem("userToken");

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestBody = {
      otp_challenge_id: IDChallenge,
      otp_code: userInsertedOTP,
    };

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        setUserCanPay(true);
        toast.success("Codice OTP corretto", {
          duration: 1000,
        });

        setTimeout(() => {
          handleGoToFinalRiepilogoSection();
        }, 1000);
      })
      .catch((error) => {
        const errorString = error.message.replace("Error: ", "");
        const errorObject = JSON.parse(errorString);
        toast.error(
          `${errorObject.message}, ti è stato mandato un nuovo codice OTP alla mail inserita`,
          { duration: 4500 }
        );
        getIDChallenge(); // Richiedi un nuovo ID Challenge
      });
  };

  const finalTransaction = (e) => {
    e.preventDefault();

    if (userCanPay) {
      const url = "http://localhost/auto-noleggio/backend/public/transazioni";
      const token = localStorage.getItem("userToken");

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const expirationDate = `${userCreditCardExpirationYear}-${userCreditCardExpirationMonth}-01`;

      const requestBody = {
        numero_carta: userCreditCard,
        scadenza: expirationDate,
        ccv: userCreditCardCVV,
        otp_challenge_id: IDChallenge,
        id_sede: userSedeRitiro,
        id_veicolo: carDetail[0].id_veicolo,
        data_inizio: dataRitiro,
        data_fine: dataConsegna,
        importo: totale,
      };

      console.log("Request body:", requestBody);

      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
          return response.json();
        })
        .then((data) => {
          setTimeout(() => {
            toast.success("Auto noleggiata con successo!", {
              duration: 1000,
            });
            navigate("/auto");
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          const errorString = error.message.replace("Error: ", "");
          const errorObject = JSON.parse(errorString);
          console.log("Error object:", errorObject.message);
          toast.error(errorObject.message, {
            duration: 1500,
          });
        });
    } else {
      toast.error(
        "Devi completare tutte le fasi della transazione per procedere con il pagamento!"
      );

      return;
    }
  };

  return (
    <div className="h-full w-full overflow-hidden bg-white flex flex-col sm:flex-row justify-between items-center">
      <div
        id="container"
        className="h-[65vh] transition-all duration-300 ease-in-out sm:h-full w-full sm:w-[75vw] flex shrink-0 grow-0 justify-between  text-[#192024]"
      >
        <form
          onSubmit={getIDChallenge}
          className="w-full h-full overflow-y-auto overflow-x-hidden shrink-0 grow-0 gap-2 sm:gap-1 2xl:gap-5 py-2 sm:py-5 px-2 sm:px-5 font-bold flex flex-col text-[#192024]"
        >
          <h1 className="text-2xl 2xl:text-3xl ">Dettagli transazione</h1>
          <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
            <button
              onClick={handleCreditCardTypeOneSelection}
              className="credit-card-section-one w-full sm:w-[49%] h-8 2xl:h-12 sm:py-2 flex gap-4 justify-center items-center rounded-lg border-[1.5px] border-[#FF690F]"
            >
              <img
                src="/src/assets/visaLogo.png"
                className=" w-8 aspect-square object-contain"
                alt="visaLogo"
                loading="lazy"
              />
              <img
                src="/src/assets/masterCardLogo.png"
                className=" w-8 aspect-square object-contain"
                alt="visaLogo"
                loading="lazy"
              />
              <img
                src="/src/assets/maestroCardLogo.png"
                className=" w-8 aspect-square object-contain"
                alt="visaLogo"
                loading="lazy"
              />
            </button>
            <button
              onClick={handleCreditCardTypeTwoSelection}
              className="credit-card-section-two w-full sm:w-[49%] h-8 2xl:h-12 sm:py-2 flex gap-4 justify-center items-center rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]"
            >
              <img
                src="/src/assets/payPalLogo.png"
                className=" w-16 aspect-square object-contain"
                alt="visaLogo"
                loading="lazy"
              />
            </button>
          </div>

          {/* Dati carta di credito */}
          <h2 className="text-xl 2xl:text-2xl mt-5">Dati carta di credito</h2>
          <div className="w-full flex justify-between items-center">
            <div className="w-[40%] sm:w-[49%] gap-2 flex flex-col justify-start items-start">
              <label htmlFor="numeroCarta" className="text-[#808080] text-sm ">
                Numero carta
              </label>
              <div className="w-full flex justify-between items-center px-3 py-1 2xl:py-3 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Numero carta"
                  className="w-[70%] text-sm border-none outline-none font-bold "
                  required
                  onChange={(e) => setUserCreditCard(e.target.value)}
                  maxLength={16}
                  minLength={16}
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
                <div className="w-full flex justify-between items-center px-3 py-[0.10rem] 2xl:py-[0.6rem] rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                  <select
                    className="select-month outline-none w-1/2 h-full border-r-[2px] border-[#808080rgb(128, 128, 128)]"
                    name="creditCardExpirationMonth"
                    id="creditCardExpirationMonth"
                    required
                    onChange={(e) =>
                      setUserCreditCardExpirationMonth(e.target.value)
                    }
                  >
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  <select
                    className="select-year outline-none w-1/2 h-full px-2"
                    name="creditCardExpirationYear"
                    id="creditCardExpirationYear"
                    required
                    onChange={(e) =>
                      setUserCreditCardExpirationYear(e.target.value)
                    }
                  >
                    <option value="2024">24</option>
                    <option value="2025">25</option>
                    <option value="2026">26</option>
                    <option value="2027">27</option>
                    <option value="2028">28</option>
                    <option value="2029">29</option>
                    <option value="2030">30</option>
                    <option value="2031">31</option>
                    <option value="2032">32</option>
                    <option value="2033">33</option>
                    <option value="2034">34</option>
                    <option value="2035">35</option>
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
                <div className="w-full flex justify-between items-center px-3 py-1 2xl:py-3 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="CVV"
                    className="w-full text-sm border-none outline-none font-bold "
                    required
                    onChange={(e) => setUserCreditCardCVV(e.target.value)}
                    minLength={3}
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl 2xl:text-2xl mt-5">Informazioni personali</h2>
          <div className="w-full flex justify-between items-center flex-wrap gap-3">
            <div className="w-[45%] sm:w-[49%] gap-2 flex flex-col justify-start items-start">
              <label htmlFor="nome" className="text-[#808080] text-sm ">
                Nome
              </label>
              <div className="w-full flex justify-between items-center px-3 2xl:py-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Nome"
                  value={localStorage.getItem("userName") || ""}
                  readOnly
                  className="w-full text-sm border-none outline-none font-bold "
                />
              </div>
            </div>
            <div className="w-[45%] sm:w-[49%] gap-2 flex flex-col justify-start items-start">
              <label htmlFor="cognome" className="text-[#808080] text-sm ">
                Cognome
              </label>
              <div className="w-full flex justify-between items-center px-3 2xl:py-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Cognome"
                  value={localStorage.getItem("userSurname") || ""}
                  readOnly
                  className="w-full text-sm border-none outline-none font-bold "
                />
              </div>
            </div>
            <div className="w-[45%] sm:w-[49%] gap-2 flex flex-col justify-start items-start">
              <label htmlFor="email" className="text-[#808080] text-sm ">
                Email
              </label>
              <div className="w-full flex justify-between items-center px-3 2xl:py-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Email"
                  value={localStorage.getItem("userEmail") || ""}
                  readOnly
                  className="w-full text-sm border-none outline-none font-bold "
                />
              </div>
            </div>
            <div className="w-[45%] sm:w-[49%] gap-2 flex flex-col justify-start items-start">
              <label htmlFor="telefono" className="text-[#808080] text-sm ">
                Telefono
              </label>
              <div className="w-full flex justify-between items-center px-3 2xl:py-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Telefono"
                  value={localStorage.getItem("userPhone") || ""}
                  readOnly
                  className="w-full text-sm border-none outline-none font-bold "
                />
              </div>
            </div>
          </div>

          <h2 className="text-xl 2xl:text-2xl mt-5">Compila i seguenti campi</h2>
          <div className="w-full flex justify-between items-center flex-wrap gap-3">
            <div className="w-full sm:w-[49%] flex-wrap sm:flex-nowrap gap-2 flex justify-between items-start">
              <div className="w-full sm:w-[45%] gap-2 flex flex-col justify-start items-start">
                <label htmlFor="dataRitiro" className="text-[#808080] text-sm ">
                  Seleziona data ritiro auto
                </label>
                <div className="w-full flex justify-between items-center px-3 2xl:py-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                  <input
                    type="date"
                    name=""
                    id="dataRitiro"
                    className="w-full text-sm border-none outline-none font-bold "
                    value={dataRitiro}
                    min={getTodayDate()}
                    onChange={handleDataRitiroChange}
                    required
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
                <div className="w-full flex justify-between items-center px-3 2xl:py-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                  <input
                    type="date"
                    name=""
                    id="dataConsegna"
                    className="w-full text-sm border-none outline-none font-bold "
                    value={dataConsegna}
                    min={getTodayDate()}
                    onChange={handleDataConsegnaChange}
                    required
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
              <div className="w-full flex justify-between items-center px-3 2xl:py-3 py-1 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
                <select
                  name="sedeRitiro"
                  className="w-full outline-none border-none"
                  id=""
                  required
                  onChange={(e) => setUserSedeRitiro(e.target.value)}
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
            </div>
          </div>
          <button
            className=" w-40 mt-5 cursor-pointer whitespace-nowrap outline-none text-white border-[1.5px] border-transparent bg-[#FF690F] hover:bg-[#d55508] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg px-5 py-1 text-center"
            type="submit"
          >
            continua
          </button>
        </form>
        <div className="w-full h-full flex justify-center items-center shrink-0 grow-0 text-[#192024]">
          <form
            onSubmit={checkOtpCode}
            className="codice-otp-card px-4 py-2 w-[45%] h-[40%] bg-[#F0F3F5] rounded-md flex flex-col justify-center gap-3 items-center"
          >
            <h1 className="text-center text-3xl font-bold">
              Autonoleggio.itis{" "}
            </h1>
            <p className="text-center text-sm ">
              Inserisci il codice OTP inviato alla mail {newEmail}
            </p>
            <input
              className="input-codice-otp w-full h-11 text-xl text-center bg-[#D9D9D9] outline-none border-none"
              type="text"
              placeholder="000000"
              name=""
              id=""
              maxLength={6}
              minLength={6}
              required
              onChange={(e) => setUserInsertedOTP(e.target.value)}
            />
            <p>Il codice OTP inviato ha una validità di 2 minuti.</p>
            <div className="w-full flex justify-between items-center">
              <button
                type="submit"
                className="w-[45%] flex justify-center items-center cursor-pointer whitespace-nowrap outline-none text-white border-[1.5px] border-transparent bg-[#192024] hover:bg-[#212a2f] focus:ring-2 focus:outline-none focus:ring-[#2E3438] font-medium rounded-md px-5 py-2 text-center"
              >
                Conferma
              </button>
              <button
                type="button"
                className="w-[45%] flex justify-center items-center cursor-pointer whitespace-nowrap outline-none text-[#192024] border-[1.5px] border-[#192024] bg-trasparent hover:bg-[#EEEEEE] focus:ring-2 focus:outline-none focus:ring-[#2E3438] font-medium rounded-md px-5 py-2 text-center"
                onClick={(e) => {
                  toast.success(
                    "è stato inviato un nuovo codice OTP alla mail",
                    {
                      duration: 2500,
                    }
                  );
                  getIDChallenge(e);
                }}
              >
                Rinvio Codice OTP
              </button>
            </div>
          </form>
        </div>
        <div className="w-full h-full flex justify-center items-center shrink-0 grow-0 text-[#192024]">
          <h2 className="font-bold text-3xl 2xl:text-5xl">
            Ora puoi confermare il noleggio dell'auto!
          </h2>
        </div>
      </div>
      <div className="h-[35vh] sm:h-full w-full sm:w-[25vw] flex flex-col justify-between items-center z-50 border-t-[1.5px] sm:border-l-[1.5px] border-[#808080rgb(128, 128, 128)]">
        <div className="w-full h-[60vh] bg-white py-2 sm:py-5 px-2 sm:px-5 sm:h-[70vh] font-bold flex flex-wrap sm:flex-col text-[#192024]">
          <h1 className="text-2xl 2xl:text-3xl">Riepilogo transazione</h1>

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
              <p>{dataRitiro}</p>
            </div>

            {/* sezione data consegna */}
            <div className="w-1/2 sm:w-full flex flex-col sm:mt-2 order-3">
              <h2 className="text-[#808080] text-sm">Data consegna</h2>
              <p>{dataConsegna}</p>
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
                  defaultChecked
                  onClick={() => setSconto(false)}
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
                  onClick={() => setSconto(true)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[40vh] sm:h-[30vh] bg-[#F0F3F5] flex flex-col gap-2 sm:gap-3 py-2 sm:py-5 px-2 sm:px-5">
          <div className="w-full font-bold text-lg flex justify-between items-center">
            <h2>Totale:</h2>
            <p>{totale}€</p>
          </div>
          <button
            className={`w-full ${
              !userCanPay ? "opacity-50" : ""
            } -opacity-50 sm:mt-3 whitespace-nowrap outline-none text-white border-[1.5px] border-transparent bg-[#FF690F] hover:bg-[#d55508] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg px-5 py-1 text-center`}
            type="button"
            onClick={finalTransaction}
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
