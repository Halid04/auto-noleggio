import React, { useRef, useState, useEffect } from "react";
import CardAuto from "../components/CardAuto";
import toast, { Toaster } from "react-hot-toast";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

function AutoNoleggiate() {
  const [auto, setAuto] = useState([]);
  const [filtriMarca, setFiltriMarca] = useState([]);
  const [filtriTipoMacchina, setFiltriTipoMacchina] = useState([]);
  const [filtriTipoCarburante, setFiltriTipoCarburante] = useState([]);
  const [prezzoMassimo, setPrezzoMassimo] = useState(1000);
  const [chilometraggioMassimo, setChilometraggioMassimo] = useState(300000);
  const [selezioniMarca, setSelezioniMarca] = useState({});
  const [selezioniTipoMacchina, setSelezioniTipoMacchina] = useState({});
  const [selezioniTipoCarburante, setSelezioniTipoCarburante] = useState({});
  const [selezioniAnno, setSelezioniAnno] = useState([]);
  const dropdownGeneralFiltriRef = useRef(null);
  const dropdownMarcaFiltriRef = useRef(null);
  const dropdownTipoMacchinaFiltriRef = useRef(null);
  const dropdownPrezzoFiltriRef = useRef(null);
  const dropdownAnnoFiltriRef = useRef(null);
  const dropdownTipoCarburanteFiltriRef = useRef(null);
  const dropdownVicinoATeFiltriRef = useRef(null);
  const [isDropdownGeneralFiltriOpen, setIsDropdownGeneralFiltriOpen] =
    useState(false);
  const [isDropdownMarcaFiltriOpen, setIsDropdownMarcaFiltriOpen] =
    useState(false);
  const [
    isDropdownTipoMacchinaFiltriOpen,
    setIsDropdownTipoMacchinaFiltriOpen,
  ] = useState(false);
  const [isDropdownPrezzoFiltriOpen, setIsDropdownPrezzoFiltriOpen] =
    useState(false);
  const [isDropdownAnnoFiltriOpen, setIsDropdownAnnoFiltriOpen] =
    useState(false);
  const [
    isDropdownTipoCarburanteFiltriOpen,
    setIsDropdownTipoCarburanteFiltriOpen,
  ] = useState(false);
  const [isDropdownVicinoATeFiltriOpen, setIsDropdownVicinoATeFiltriOpen] =
    useState(false);
  // Aggiungi stato per tenere traccia del primo caricamento
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Salva lo stato dei filtri quando cambia
  useEffect(() => {
    if (Object.keys(selezioniMarca).length > 0) {
      localStorage.setItem("selezioniMarca", JSON.stringify(selezioniMarca));
    }

    if (Object.keys(selezioniTipoMacchina).length > 0) {
      localStorage.setItem(
        "selezioniTipoMacchina",
        JSON.stringify(selezioniTipoMacchina)
      );
    }

    if (Object.keys(selezioniTipoCarburante).length > 0) {
      localStorage.setItem(
        "selezioniTipoCarburante",
        JSON.stringify(selezioniTipoCarburante)
      );
    }
  }, [selezioniMarca, selezioniTipoMacchina, selezioniTipoCarburante]);

  // useEffect(() => {
  //   // Imposta tutti gli anni come selezionati di default
  //   setSelezioniAnno([
  //     { min: 2005, max: 2010 },
  //     { min: 2010, max: 2015 },
  //     { min: 2015, max: 2020 },
  //     { min: 2020, max: new Date().getFullYear() },
  //   ]);
  // }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("selezioniMarca");
    if (savedState) {
      setSelezioniMarca(JSON.parse(savedState));
    }

    const savedStateTipoMacchina = localStorage.getItem(
      "selezioniTipoMacchina"
    );
    if (savedStateTipoMacchina) {
      setSelezioniTipoMacchina(JSON.parse(savedStateTipoMacchina));
    }

    const savedStateTipoCarburante = localStorage.getItem(
      "selezioniTipoCarburante"
    );
    if (savedStateTipoCarburante) {
      setSelezioniTipoCarburante(JSON.parse(savedStateTipoCarburante));
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad) {
      getAllAuto();
      setIsFirstLoad(false); // Imposta a false dopo il primo caricamento
    }
    getFiltiMarca();
    getFiltiTipoMacchina();
    getFiltriTipoCarburante();

    const handleClickOutsideGeneralFiltri = (event) => {
      if (
        dropdownGeneralFiltriRef.current &&
        !dropdownGeneralFiltriRef.current.contains(event.target)
      ) {
        setIsDropdownGeneralFiltriOpen(false);
      }
    };

    const handleClickOutsideMarcaFiltri = (event) => {
      if (
        dropdownMarcaFiltriRef.current &&
        !dropdownMarcaFiltriRef.current.contains(event.target)
      ) {
        setIsDropdownMarcaFiltriOpen(false);
      }
    };

    const handleClickOutsideTipoMacchinaFiltri = (event) => {
      if (
        dropdownTipoMacchinaFiltriRef.current &&
        !dropdownTipoMacchinaFiltriRef.current.contains(event.target)
      ) {
        setIsDropdownTipoMacchinaFiltriOpen(false);
      }
    };

    const handleClickOutsidePrezzoFiltri = (event) => {
      if (
        dropdownPrezzoFiltriRef.current &&
        !dropdownPrezzoFiltriRef.current.contains(event.target)
      ) {
        setIsDropdownPrezzoFiltriOpen(false);
      }
    };

    const handleClickOutsideAnnoFiltri = (event) => {
      if (
        dropdownAnnoFiltriRef.current &&
        !dropdownAnnoFiltriRef.current.contains(event.target)
      ) {
        setIsDropdownAnnoFiltriOpen(false);
      }
    };

    const handleClickOutsideTipoCarburanteFiltri = (event) => {
      if (
        dropdownTipoCarburanteFiltriRef.current &&
        !dropdownTipoCarburanteFiltriRef.current.contains(event.target)
      ) {
        setIsDropdownTipoCarburanteFiltriOpen(false);
      }
    };

    const handleClickOutsideVicinoATeFiltri = (event) => {
      if (
        dropdownVicinoATeFiltriRef.current &&
        !dropdownVicinoATeFiltriRef.current.contains(event.target)
      ) {
        setIsDropdownVicinoATeFiltriOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutsideGeneralFiltri);
    document.addEventListener("click", handleClickOutsideMarcaFiltri);
    document.addEventListener("click", handleClickOutsideTipoMacchinaFiltri);
    document.addEventListener("click", handleClickOutsidePrezzoFiltri);
    document.addEventListener("click", handleClickOutsideAnnoFiltri);
    document.addEventListener("click", handleClickOutsideTipoCarburanteFiltri);
    document.addEventListener("click", handleClickOutsideVicinoATeFiltri);

    return () => {
      document.removeEventListener("click", handleClickOutsideGeneralFiltri);
      document.removeEventListener("click", handleClickOutsideMarcaFiltri);
      document.removeEventListener(
        "click",
        handleClickOutsideTipoMacchinaFiltri
      );
      document.removeEventListener("click", handleClickOutsidePrezzoFiltri);
      document.removeEventListener("click", handleClickOutsideAnnoFiltri);
      document.removeEventListener(
        "click",
        handleClickOutsideTipoCarburanteFiltri
      );
      document.removeEventListener("click", handleClickOutsideVicinoATeFiltri);
    };
  }, [
    isDropdownGeneralFiltriOpen,
    isDropdownMarcaFiltriOpen,
    isDropdownTipoMacchinaFiltriOpen,
    isDropdownPrezzoFiltriOpen,
    isDropdownAnnoFiltriOpen,
    isDropdownTipoCarburanteFiltriOpen,
    isDropdownVicinoATeFiltriOpen,
  ]);

  const getAllAuto = () => {
    const url =
      "http://localhost/auto-noleggio/backend/public/veicoli/noleggiati";

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
        console.log("get all auto", data.content);
        localStorage.removeItem("selezioniMarca");
        localStorage.removeItem("selezioniTipoMacchina");
        localStorage.removeItem("selezioniTipoCarburante");

        setAuto(data.content);
      })
      .catch((error) => {
        console.error("Errore durante il recupero delle auto:", error);
      });

    setIsDropdownGeneralFiltriOpen(false);
    setIsDropdownMarcaFiltriOpen(false);
    setIsDropdownTipoMacchinaFiltriOpen(false);
    setIsDropdownPrezzoFiltriOpen(false);
    setIsDropdownAnnoFiltriOpen(false);
    setIsDropdownTipoCarburanteFiltriOpen(false);
    setIsDropdownVicinoATeFiltriOpen(false);
  };

  const getFiltiMarca = () => {
    const url = "http://localhost/auto-noleggio/backend/public/veicoli/marche";

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
        setFiltriMarca(data.content);

        const savedState = localStorage.getItem("selezioniMarca");
        if (!savedState) {
          const selezioniMarcaDefault = {};
          data.content.forEach((marca) => {
            selezioniMarcaDefault[marca.marca] = false;
          });
          setSelezioniMarca(selezioniMarcaDefault);
        }
      })
      .catch((error) => {
        console.error("Errore durante il recupero delle marche:", error);
      });
  };

  const getFiltiTipoMacchina = () => {
    const url = "http://localhost/auto-noleggio/backend/public/veicoli/tipi";

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
        setFiltriTipoMacchina(data.content);

        const savedState = localStorage.getItem("selezioniTipoMacchina");
        if (!savedState) {
          const selezioniTipoDefault = {};
          data.content.forEach((tipo) => {
            selezioniTipoDefault[tipo.tipo_veicolo] = false;
          });
          setSelezioniTipoMacchina(selezioniTipoDefault);
        }
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero del tipo di macchina:",
          error
        );
      });
  };

  const getFiltriTipoCarburante = () => {
    const url =
      "http://localhost/auto-noleggio/backend/public/veicoli/carburazioni";

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
        setFiltriTipoCarburante(data.content);

        const savedState = localStorage.getItem("selezioniTipoCarburante");
        if (!savedState) {
          const selezioniTipoCarburanteDefault = {};
          data.content.forEach((tipo) => {
            selezioniTipoCarburanteDefault[tipo.tipo_carburazione] = false;
          });
          setSelezioniTipoCarburante(selezioniTipoCarburanteDefault);
        }
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero del tipo di carburante:",
          error
        );
      });
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();

    const selezionateMarche = Object.keys(selezioniMarca).filter(
      (marca) => selezioniMarca[marca]
    );
    const selezionatiTipiMacchina = Object.keys(selezioniTipoMacchina).filter(
      (tipo) => selezioniTipoMacchina[tipo]
    );
    const selezionatiTipiCarburante = Object.keys(
      selezioniTipoCarburante
    ).filter((tipo) => selezioniTipoCarburante[tipo]);

    // Verifica che almeno una opzione sia selezionata per ogni filtro
    if (selezionateMarche.length === 0) {
      toast.error(
        "Per poter applicare i filtri almeno una marca deve essere selezionata.",
        {
          duration: 2000,
        }
      );
      return;
    }

    if (selezionatiTipiMacchina.length === 0) {
      toast.error(
        "Per poter applicare i filtri almeno un tipo di macchina deve essere selezionato.",
        {
          duration: 2000,
        }
      );
      return;
    }

    if (selezionatiTipiCarburante.length === 0) {
      toast.error(
        "Per poter applicare i filtri almeno un tipo di carburante deve essere selezionato.",
        {
          duration: 2000,
        }
      );
      return;
    }

    if (selezioniAnno.length === 0) {
      toast.error(
        "Per poter applicare i filtri almeno un intervallo di anno deve essere selezionato.",
        {
          duration: 2000,
        }
      );
      return;
    }

    const requestObj = {
      filters: {
        marca: selezionateMarche,
        tipo_veicolo: selezionatiTipiMacchina,
        costo_giornaliero: {
          upperbound: prezzoMassimo,
          lowerbound: 0,
        },
        anno_immatricolazione: selezioniAnno.map(
          (range) => `${range.min}-${range.max}`
        ),
        chilometraggio: {
          upperbound: chilometraggioMassimo,
          lowerbound: 0,
        },
        tipo_carburazione: selezionatiTipiCarburante,
      },
    };

    const url = `http://localhost/auto-noleggio/backend/public/veicoli/filtra?json=${encodeURIComponent(
      JSON.stringify(requestObj)
    )}`;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const token = localStorage.getItem("userToken");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

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
        console.log("auto con filtri", data.content);
        setAuto(data.content);
      })
      .catch((error) => {
        console.error("Errore durante il recupero delle auto filtrate:", error);
      });

    setIsDropdownGeneralFiltriOpen(false);
    setIsDropdownMarcaFiltriOpen(false);
    setIsDropdownTipoMacchinaFiltriOpen(false);
    setIsDropdownPrezzoFiltriOpen(false);
    setIsDropdownAnnoFiltriOpen(false);
    setIsDropdownTipoCarburanteFiltriOpen(false);
    setIsDropdownVicinoATeFiltriOpen(false);
  };

  const handleMenuButtonClickGeneralFiltri = (event) => {
    event.stopPropagation();
    setIsDropdownGeneralFiltriOpen(!isDropdownGeneralFiltriOpen);
    setIsDropdownMarcaFiltriOpen(false);
    setIsDropdownTipoMacchinaFiltriOpen(false);
    setIsDropdownPrezzoFiltriOpen(false);
    setIsDropdownAnnoFiltriOpen(false);
    setIsDropdownTipoCarburanteFiltriOpen(false);
    setIsDropdownVicinoATeFiltriOpen(false);
  };

  const handleMenuButtonClickMarcaFiltri = (event) => {
    event.stopPropagation();
    setIsDropdownMarcaFiltriOpen(!isDropdownMarcaFiltriOpen);
    setIsDropdownGeneralFiltriOpen(false);
    setIsDropdownTipoMacchinaFiltriOpen(false);
    setIsDropdownPrezzoFiltriOpen(false);
    setIsDropdownAnnoFiltriOpen(false);
    setIsDropdownTipoCarburanteFiltriOpen(false);
    setIsDropdownVicinoATeFiltriOpen(false);
  };

  const handleMenuButtonClickTipoMacchinaFiltri = (event) => {
    event.stopPropagation();
    setIsDropdownTipoMacchinaFiltriOpen(!isDropdownTipoMacchinaFiltriOpen);
    setIsDropdownGeneralFiltriOpen(false);
    setIsDropdownMarcaFiltriOpen(false);
    setIsDropdownPrezzoFiltriOpen(false);
    setIsDropdownAnnoFiltriOpen(false);
    setIsDropdownTipoCarburanteFiltriOpen(false);
    setIsDropdownVicinoATeFiltriOpen(false);
  };

  const handleMenuButtonClickPrezzoFiltri = (event) => {
    event.stopPropagation();
    setIsDropdownPrezzoFiltriOpen(!isDropdownPrezzoFiltriOpen);
    setIsDropdownGeneralFiltriOpen(false);
    setIsDropdownMarcaFiltriOpen(false);
    setIsDropdownTipoMacchinaFiltriOpen(false);
    setIsDropdownAnnoFiltriOpen(false);
    setIsDropdownTipoCarburanteFiltriOpen(false);
    setIsDropdownVicinoATeFiltriOpen(false);
  };

  const handleMenuButtonClickAnnoFiltri = (event) => {
    event.stopPropagation();
    setIsDropdownAnnoFiltriOpen(!isDropdownAnnoFiltriOpen);
    setIsDropdownGeneralFiltriOpen(false);
    setIsDropdownMarcaFiltriOpen(false);
    setIsDropdownTipoMacchinaFiltriOpen(false);
    setIsDropdownPrezzoFiltriOpen(false);
    setIsDropdownTipoCarburanteFiltriOpen(false);
    setIsDropdownVicinoATeFiltriOpen(false);
  };

  const handleMenuButtonClickTipoCarburanteFiltri = (event) => {
    event.stopPropagation();
    setIsDropdownTipoCarburanteFiltriOpen(!isDropdownTipoCarburanteFiltriOpen);
    setIsDropdownGeneralFiltriOpen(false);
    setIsDropdownMarcaFiltriOpen(false);
    setIsDropdownTipoMacchinaFiltriOpen(false);
    setIsDropdownPrezzoFiltriOpen(false);
    setIsDropdownAnnoFiltriOpen(false);
    setIsDropdownVicinoATeFiltriOpen(false);
  };

  const handleMenuButtonClickVicinoATeFiltri = (event) => {
    event.stopPropagation();
    setIsDropdownVicinoATeFiltriOpen(!isDropdownVicinoATeFiltriOpen);
    setIsDropdownGeneralFiltriOpen(false);
    setIsDropdownMarcaFiltriOpen(false);
    setIsDropdownTipoMacchinaFiltriOpen(false);
    setIsDropdownPrezzoFiltriOpen(false);
    setIsDropdownAnnoFiltriOpen(false);
    setIsDropdownTipoCarburanteFiltriOpen(false);
  };

  const handleSliderChange = (event) => {
    setPrezzoMassimo(event.target.value);
  };

  const handleSliderChangeChilometraggio = (event) => {
    setChilometraggioMassimo(event.target.value);
  };

  const handleYearRangeChange = (min, max, isChecked) => {
    setSelezioniAnno((prevState) => {
      const updatedSelection = [...prevState];
      if (isChecked) {
        updatedSelection.push({ min, max });
      } else {
        return updatedSelection.filter(
          (range) => range.min !== min || range.max !== max
        );
      }
      return updatedSelection;
    });
  };

  const handleCheckboxChange = (tipo, valore, isChecked) => {
    if (tipo === "marca") {
      setSelezioniMarca((prevState) => ({
        ...prevState,
        [valore]: isChecked,
      }));
    } else if (tipo === "tipoMacchina") {
      setSelezioniTipoMacchina((prevState) => ({
        ...prevState,
        [valore]: isChecked,
      }));
    } else if (tipo === "tipoCarburante") {
      setSelezioniTipoCarburante((prevState) => ({
        ...prevState,
        [valore]: isChecked,
      }));
    }
  };

  const resetFiltri = () => {
    getAllAuto();

    setSelezioniMarca({});
    setSelezioniTipoMacchina({});
    setSelezioniTipoCarburante({});
    setSelezioniAnno([]);

    getFiltiMarca();
    getFiltiTipoMacchina();
    getFiltriTipoCarburante();

    setPrezzoMassimo(1000);
    setChilometraggioMassimo(300000);
  };

  return (
    <div className=" h-full w-full shrink-0 bg-[#F0F3F5] dark:bg-[#444C50] overflow-x-hidden overflow-y-auto flex flex-col py-5 justify-between items-start transition-all duration-300 ease-in-out">
      {/* <Toaster /> */}
      <form
        onSubmit={handleApplyFilter}
        className="filtri-section shrink-0 h-[10vh] gap-5 px-5 sm:px-10  w-full flex justify-start items-center"
      >
        {/* Filtri generali */}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438] transition-all inline-flex w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] dark:border-[#2E3438] rounded-lg bg-white dark:bg-[#192024] px-2 py-2 text-[#192024] dark:text-white"
              id="menu-button"
              aria-expanded={isDropdownGeneralFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickGeneralFiltri}
            >
              <SlidersHorizontal
                size={17}
                strokeWidth={3}
                className="stroke-[#192024] dark:stroke-white"
              />
            </button>
          </div>

          {isDropdownGeneralFiltriOpen && (
            <div
              ref={dropdownGeneralFiltriRef}
              className="flex flex-col shrink-0 text-[#192024] dark:text-white justify-start items-start absolute left-0 z-10 mt-2 w-60 sm:w-72 h-96 origin-top-right rounded-md bg-white dark:bg-[#192024] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="filtri-list-section w-full h-[80%] shrink-0 flex flex-col overflow-y-auto overflow-x-hidden justify-start items-start p-3">
                <h2 className="font-bold mb-5 px-2 text-lg">Tutti i filtri</h2>

                {/* Marca Filtri */}
                <div className="shrink-0 w-full flex flex-col justify-start items-start">
                  <h2 className="font-bold mb-2 px-2 text-lg">Marca</h2>
                  {filtriMarca.map((marca, index) => (
                    <div
                      key={index}
                      className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438]"
                    >
                      <p className="w-[80%]">{marca.marca}</p>
                      <input
                        className="w-[20%] accent-[#192024] dark:accent-white h-4 rounded-lg cursor-pointer"
                        type="checkbox"
                        checked={selezioniMarca[marca.marca]}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "marca",
                            marca.marca,
                            e.target.checked
                          )
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* Prezzo Filtri */}
                <div className="shrink-0 w-full flex flex-col justify-start items-start mt-5">
                  <h2 className="font-bold mb-2 px-2 text-lg">Prezzo</h2>
                  <div className="shrink-0 w-full gap-5 h-[5rem] px-2 rounded-lg flex flex-col justify-center items-center">
                    <p className="w-full">
                      Prezzo massimo:{" "}
                      <span className="font-bold">{prezzoMassimo}</span>
                    </p>
                    <input
                      type="range"
                      className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
  [&::-webkit-slider-thumb]:w-2.5
  [&::-webkit-slider-thumb]:h-2.5
  [&::-webkit-slider-thumb]:-mt-0.5
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:bg-white
  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_#192024]
  [&::-webkit-slider-thumb]:dark:shadow-[0_0_0_4px_#ffffff]
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:duration-150
  [&::-webkit-slider-thumb]:ease-in-out
  [&::-webkit-slider-thumb]:dark:bg-[#192024]

  [&::-moz-range-thumb]:w-2.5
  [&::-moz-range-thumb]:h-2.5
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:bg-white
  [&::-moz-range-thumb]:border-4
  [&::-moz-range-thumb]:border-[#192024]
  [&::-moz-range-thumb]:dark:border-white
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:duration-150
  [&::-moz-range-thumb]:ease-in-out

  [&::-webkit-slider-runnable-track]:w-full
  [&::-webkit-slider-runnable-track]:h-2
  [&::-webkit-slider-runnable-track]:bg-gray-100
  [&::-webkit-slider-runnable-track]:rounded-full
  [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

  [&::-moz-range-track]:w-full
  [&::-moz-range-track]:h-2
  [&::-moz-range-track]:bg-gray-100
  [&::-moz-range-track]:rounded-full"
                      id="prezzoMassimo"
                      min="10"
                      max="1000"
                      step={50}
                      value={prezzoMassimo}
                      onChange={handleSliderChange}
                    />
                  </div>
                </div>

                {/* Tipo macchina Filtri */}
                <div className="shrink-0 w-full flex flex-col justify-start items-start mt-5">
                  <h2 className="font-bold mb-2 px-2 text-lg">
                    Tipo di macchina
                  </h2>
                  {filtriTipoMacchina.map((tipo_veicolo, index) => (
                    <div
                      key={index}
                      className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438]"
                    >
                      <p className="w-[80%]">{tipo_veicolo.tipo_veicolo}</p>
                      <input
                        className="w-[20%] accent-[#192024] dark:accent-white h-4 rounded-lg cursor-pointer"
                        type="checkbox"
                        checked={
                          selezioniTipoMacchina[tipo_veicolo.tipo_veicolo] ||
                          false
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            "tipoMacchina",
                            tipo_veicolo.tipo_veicolo,
                            e.target.checked
                          )
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* Anno Filtri */}
                <div className="shrink-0 w-full flex flex-col justify-start items-start mt-5">
                  <h2 className="font-bold mb-2 px-2 text-lg">Anno</h2>
                  {[
                    { label: "2005-2010", min: 2005, max: 2010 },
                    { label: "2010-2015", min: 2010, max: 2015 },
                    { label: "2015-2020", min: 2015, max: 2020 },
                    {
                      label: "2020-oggi",
                      min: 2020,
                      max: new Date().getFullYear(),
                    },
                  ].map((range, index) => (
                    <div
                      key={index}
                      className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438]"
                    >
                      <p className="w-[80%]">{range.label}</p>
                      <input
                        className="w-[20%] accent-[#192024] dark:accent-white h-4 rounded-lg cursor-pointer"
                        type="checkbox"
                        checked={selezioniAnno.some(
                          (r) => r.min === range.min && r.max === range.max
                        )}
                        onChange={(e) =>
                          handleYearRangeChange(
                            range.min,
                            range.max,
                            e.target.checked
                          )
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* Chilometraggio Filtri */}
                <div className="shrink-0 w-full flex flex-col justify-start items-start mt-5">
                  <h2 className="font-bold mb-2 px-2 text-lg">
                    Chilometraggio
                  </h2>
                  <div className="shrink-0 w-full gap-5 h-[5rem] px-2 rounded-lg flex flex-col justify-center items-center">
                    <p className="w-full">
                      Chilometraggio massimo:{" "}
                      <span className="font-bold">{chilometraggioMassimo}</span>
                    </p>
                    <input
                      type="range"
                      className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
  [&::-webkit-slider-thumb]:w-2.5
  [&::-webkit-slider-thumb]:h-2.5
  [&::-webkit-slider-thumb]:-mt-0.5
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:bg-white
  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_#192024]
  [&::-webkit-slider-thumb]:dark:shadow-[0_0_0_4px_#ffffff]
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:duration-150
  [&::-webkit-slider-thumb]:ease-in-out
  [&::-webkit-slider-thumb]:dark:bg-neutral-700

  [&::-moz-range-thumb]:w-2.5
  [&::-moz-range-thumb]:h-2.5
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:bg-white
  [&::-moz-range-thumb]:border-4
  [&::-moz-range-thumb]:border-[#192024]
  [&::-moz-range-thumb]:dark:border-white
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:duration-150
  [&::-moz-range-thumb]:ease-in-out

  [&::-webkit-slider-runnable-track]:w-full
  [&::-webkit-slider-runnable-track]:h-2
  [&::-webkit-slider-runnable-track]:bg-gray-100
  [&::-webkit-slider-runnable-track]:rounded-full
  [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

  [&::-moz-range-track]:w-full
  [&::-moz-range-track]:h-2
  [&::-moz-range-track]:bg-gray-100
  [&::-moz-range-track]:rounded-full"
                      id="chilometraggioMassimo"
                      min="1000"
                      max="300000"
                      step={10000}
                      value={chilometraggioMassimo}
                      onChange={handleSliderChangeChilometraggio}
                    />
                  </div>
                </div>

                {/* Tipo carburante Filtri */}
                <div className="shrink-0 w-full flex flex-col justify-start items-start mt-5">
                  <h2 className="font-bold mb-2 px-2 text-lg">
                    Tipo carburante
                  </h2>
                  {filtriTipoCarburante.map((tipo_carburazione, index) => (
                    <div
                      key={index}
                      className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438]"
                    >
                      <p className="w-[80%]">
                        {tipo_carburazione.tipo_carburazione}
                      </p>
                      <input
                        className="w-[20%] accent-[#192024] dark:accent-white h-4 rounded-lg cursor-pointer"
                        type="checkbox"
                        checked={
                          selezioniTipoCarburante[
                            tipo_carburazione.tipo_carburazione
                          ] || false
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            "tipoCarburante",
                            tipo_carburazione.tipo_carburazione,
                            e.target.checked
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-[20%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE] dark:border-t-[#2E3438]">
                <button
                  type="submit"
                  className="bg-[#192024] dark:bg-white border-[1.5px] border-[#192024] dark:border-white outline-none hover:bg-[#0f1315] hover:dark:bg-[#e3e3e3] text-white dark:text-[#192024] font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-transparent border-[1.5px] border-[#192024] dark:border-white hover:bg-[#EEEEEE] hover:dark:bg-[#2E3438] text-[#192024] dark:text-white font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                  onClick={resetFiltri}
                >
                  Reimposta
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtri Marca  */}
        <div className="hidden relative md:inline-block text-left">
          <div>
            <button
              type="button"
              className="hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438] transition-all inline-flex w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] dark:border-[#2E3438] rounded-lg bg-white dark:bg-[#192024] px-2 py-1 text-[#192024] dark:text-white"
              id="menu-button"
              aria-expanded={isDropdownMarcaFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickMarcaFiltri}
            >
              <span className=" font-bold text-[#192024] dark:text-white">
                Marca
              </span>
              <ChevronDown
                className={`mr-1 h-5 w-5 stroke-[#192024] dark:stroke-white transition-transdiv duration-300 ${
                  isDropdownMarcaFiltriOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>

          {/* <!-- Dropdown Filtri marca menu --> */}
          {isDropdownMarcaFiltriOpen && (
            <div
              ref={dropdownMarcaFiltriRef}
              className="flex flex-col shrink-0 text-[#192024] dark:text-white justify-start items-start absolute left-0 z-10 mt-2 w-60 sm:w-72 h-96 origin-top-right rounded-md bg-white dark:bg-[#192024] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="filtri-list-section w-full h-[80%] shrink-0 flex flex-col overflow-y-auto overflow-x-hidden justify-start items-start p-3">
                <h2 className="font-bold mb-2 px-2 text-lg">Marca</h2>
                {filtriMarca.map((marca, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438]"
                  >
                    <p className="w-[80%]">{marca.marca}</p>
                    <input
                      className="w-[20%] accent-[#192024] dark:accent-white h-4 rounded-lg cursor-pointer"
                      type="checkbox"
                      checked={selezioniMarca[marca.marca]}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "marca",
                          marca.marca,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="w-full h-[20%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE] dark:border-t-[#2E3438]">
                <button
                  type="submit"
                  className="bg-[#192024] dark:bg-white border-[1.5px] border-[#192024] dark:border-white outline-none hover:bg-[#0f1315] hover:dark:bg-[#e3e3e3] text-white dark:text-[#192024] font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-transparent border-[1.5px] border-[#192024] dark:border-white hover:bg-[#EEEEEE] hover:dark:bg-[#2E3438] text-[#192024] dark:text-white font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                  onClick={resetFiltri}
                >
                  Reimposta
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtri Tipo macchina  */}
        <div className="hidden relative md:inline-block text-left">
          <div>
            <button
              type="button"
              className="hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438] transition-all inline-flex w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] dark:border-[#2E3438] rounded-lg bg-white dark:bg-[#192024] px-2 py-1 text-[#192024] dark:text-white"
              id="menu-button"
              aria-expanded={isDropdownTipoMacchinaFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickTipoMacchinaFiltri}
            >
              <span className=" font-bold text-[#192024] dark:text-white">
                Tipo di macchina
              </span>
              <ChevronDown
                className={`mr-1 h-5 w-5 stroke-[#192024] dark:stroke-white transition-transdiv duration-300 ${
                  isDropdownTipoMacchinaFiltriOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>

          {/* <!-- Dropdown Filtri Tipo Macchina menu --> */}
          {isDropdownTipoMacchinaFiltriOpen && (
            <div
              ref={dropdownTipoMacchinaFiltriRef}
              className="flex flex-col shrink-0 text-[#192024] dark:text-white justify-start items-start absolute left-0 z-10 mt-2 w-60 sm:w-72 h-96 origin-top-right rounded-md bg-white dark:bg-[#192024] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="filtri-list-section w-full h-[80%] shrink-0 flex flex-col overflow-y-auto overflow-x-hidden justify-start items-start p-3">
                <h2 className="font-bold mb-2 px-2 text-lg">
                  Tipo di macchina
                </h2>
                {filtriTipoMacchina.map((tipo_veicolo, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438]"
                  >
                    <p className="w-[80%]">{tipo_veicolo.tipo_veicolo}</p>
                    <input
                      className="w-[20%] accent-[#192024] dark:accent-white h-4 rounded-lg cursor-pointer"
                      type="checkbox"
                      checked={
                        selezioniTipoMacchina[tipo_veicolo.tipo_veicolo] ||
                        false
                      }
                      onChange={(e) =>
                        handleCheckboxChange(
                          "tipoMacchina",
                          tipo_veicolo.tipo_veicolo,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="w-full h-[20%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE] dark:border-t-[#2E3438]">
                <button
                  type="submit"
                  className="bg-[#192024] dark:bg-white border-[1.5px] border-[#192024] dark:border-white outline-none hover:bg-[#0f1315] hover:dark:bg-[#e3e3e3] text-white dark:text-[#192024] font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-transparent border-[1.5px] border-[#192024] dark:border-white hover:bg-[#EEEEEE] hover:dark:bg-[#2E3438] text-[#192024] dark:text-white font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                  onClick={resetFiltri}
                >
                  Reimposta
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtri Prezzo  */}
        <div className="hidden relative md:inline-block text-left">
          <div>
            <button
              type="button"
              className="hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438] transition-all inline-flex w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] dark:border-[#2E3438] rounded-lg bg-white dark:bg-[#192024] px-2 py-1 text-[#192024] dark:text-white"
              id="menu-button"
              aria-expanded={isDropdownPrezzoFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickPrezzoFiltri}
            >
              <span className=" font-bold text-[#192024] dark:text-white">
                Prezzo
              </span>
              <ChevronDown
                className={`mr-1 h-5 w-5 stroke-[#192024] dark:stroke-white transition-transdiv duration-300 ${
                  isDropdownPrezzoFiltriOpen ? "rotate-180" : "rotate-0"
                }`}
                color="#192024"
              />
            </button>
          </div>

          {/* <!-- Dropdown Filtri prezzo menu --> */}
          {isDropdownPrezzoFiltriOpen && (
            <div
              ref={dropdownPrezzoFiltriRef}
              className="flex flex-col shrink-0 text-[#192024] dark:text-white justify-start items-start absolute left-0 z-10 mt-2 w-60 sm:w-72 h-52 origin-top-right rounded-md bg-white dark:bg-[#192024] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="filtri-list-section w-full h-[70%] shrink-0 flex flex-col overflow-y-auto overflow-x-hidden justify-start items-start p-3">
                <h2 className="font-bold mb-2 px-2 text-lg">Prezzo</h2>

                <div className="shrink-0 w-full gap-5 h-[5rem] px-2 rounded-lg flex flex-col justify-center items-center">
                  <p className="w-full">
                    Prezzo massimo:{" "}
                    <span className="font-bold">{prezzoMassimo}</span>{" "}
                  </p>

                  <input
                    type="range"
                    className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
  [&::-webkit-slider-thumb]:w-2.5
  [&::-webkit-slider-thumb]:h-2.5
  [&::-webkit-slider-thumb]:-mt-0.5
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:bg-white
  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_#192024]
  [&::-webkit-slider-thumb]:dark:shadow-[0_0_0_4px_#ffffff]
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:duration-150
  [&::-webkit-slider-thumb]:ease-in-out
  [&::-webkit-slider-thumb]:dark:bg-neutral-700

  [&::-moz-range-thumb]:w-2.5
  [&::-moz-range-thumb]:h-2.5
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:bg-white
  [&::-moz-range-thumb]:border-4
  [&::-moz-range-thumb]:border-[#192024]
  [&::-moz-range-thumb]:dark:border-white
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:duration-150
  [&::-moz-range-thumb]:ease-in-out

  [&::-webkit-slider-runnable-track]:w-full
  [&::-webkit-slider-runnable-track]:h-2
  [&::-webkit-slider-runnable-track]:bg-gray-100
  [&::-webkit-slider-runnable-track]:rounded-full
  [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

  [&::-moz-range-track]:w-full
  [&::-moz-range-track]:h-2
  [&::-moz-range-track]:bg-gray-100
  [&::-moz-range-track]:rounded-full"
                    id="prezzoMassimo"
                    min="10"
                    max="1000"
                    step={50}
                    value={prezzoMassimo}
                    onChange={handleSliderChange}
                  />
                </div>
              </div>
              <div className="w-full h-[20%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE] dark:border-t-[#2E3438]">
                <button
                  type="submit"
                  className="bg-[#192024] dark:bg-white border-[1.5px] border-[#192024] dark:border-white outline-none hover:bg-[#0f1315] hover:dark:bg-[#e3e3e3] text-white dark:text-[#192024] font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-transparent border-[1.5px] border-[#192024] dark:border-white hover:bg-[#EEEEEE] hover:dark:bg-[#2E3438] text-[#192024] dark:text-white font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                  onClick={resetFiltri}
                >
                  Reimposta
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtri Anno  */}
        <div className="hidden relative lg:inline-block text-left">
          <div>
            <button
              type="button"
              className="hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438] transition-all inline-flex w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] dark:border-[#2E3438] rounded-lg bg-white dark:bg-[#192024] px-2 py-1 text-[#192024] dark:text-white"
              id="menu-button"
              aria-expanded={isDropdownAnnoFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickAnnoFiltri}
            >
              <span className=" font-bold text-[#192024] dark:text-white">
                Anno
              </span>
              <ChevronDown
                className={`mr-1 h-5 w-5 stroke-[#192024] dark:stroke-white transition-transdiv duration-300 ${
                  isDropdownAnnoFiltriOpen ? "rotate-180" : "rotate-0"
                }`}
                color="#192024"
              />
            </button>
          </div>

          {/* <!-- Dropdown Filtri Anno menu --> */}
          {isDropdownAnnoFiltriOpen && (
            <div
              ref={dropdownAnnoFiltriRef}
              className="flex flex-col shrink-0 text-[#192024] dark:text-white justify-start items-start absolute left-0 z-10 mt-2 w-60 sm:w-72 h-72 origin-top-right rounded-md bg-white dark:bg-[#192024] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="filtri-list-section w-full h-[80%] shrink-0 flex flex-col overflow-y-auto overflow-x-hidden justify-start items-start p-3">
                <h2 className="font-bold mb-2 px-2 text-lg">Anno</h2>
                {[
                  { label: "2005-2010", min: 2005, max: 2010 },
                  { label: "2010-2015", min: 2010, max: 2015 },
                  { label: "2015-2020", min: 2015, max: 2020 },
                  {
                    label: "2020-oggi",
                    min: 2020,
                    max: new Date().getFullYear(),
                  },
                ].map((range, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438]"
                  >
                    <p className="w-[80%]">{range.label}</p>
                    <input
                      className="w-[20%] accent-[#192024] dark:accent-white h-4 rounded-lg cursor-pointer"
                      type="checkbox"
                      checked={selezioniAnno.some(
                        (r) => r.min === range.min && r.max === range.max
                      )}
                      onChange={(e) =>
                        handleYearRangeChange(
                          range.min,
                          range.max,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="w-full h-[20%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE] dark:border-t-[#2E3438]">
                <button
                  type="submit"
                  className="bg-[#192024] dark:bg-white border-[1.5px] border-[#192024] dark:border-white outline-none hover:bg-[#0f1315] hover:dark:bg-[#e3e3e3] text-white dark:text-[#192024] font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-transparent border-[1.5px] border-[#192024] dark:border-white hover:bg-[#EEEEEE] hover:dark:bg-[#2E3438] text-[#192024] dark:text-white font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                  onClick={resetFiltri}
                >
                  Reimposta
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtri Tipo carburante  */}
        <div className="hidden relative lg:inline-block text-left">
          <div>
            <button
              type="button"
              className="hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438] transition-all inline-flex w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] dark:border-[#2E3438] rounded-lg bg-white dark:bg-[#192024] px-2 py-1 text-[#192024] dark:text-white"
              id="menu-button"
              aria-expanded={isDropdownTipoCarburanteFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickTipoCarburanteFiltri}
            >
              <span className=" font-bold text-[#192024] dark:text-white">
                Tipo carburante
              </span>
              <ChevronDown
                className={`mr-1 h-5 w-5 stroke-[#192024] dark:stroke-white transition-transdiv duration-300 ${
                  isDropdownTipoCarburanteFiltriOpen ? "rotate-180" : "rotate-0"
                }`}
                color="#192024"
              />
            </button>
          </div>

          {/* <!-- Dropdown Filtri Tipo carburante menu --> */}
          {isDropdownTipoCarburanteFiltriOpen && (
            <div
              ref={dropdownTipoCarburanteFiltriRef}
              className="flex flex-col shrink-0 text-[#192024] dark:text-white justify-start items-start absolute left-0 z-10 mt-2 w-60 sm:w-72 h-72 origin-top-right rounded-md bg-white dark:bg-[#192024] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="filtri-list-section w-full h-[80%] shrink-0 flex flex-col overflow-y-auto overflow-x-hidden justify-start items-start p-3">
                <h2 className="font-bold mb-2 px-2 text-lg">Tipo carburante</h2>
                {filtriTipoCarburante.map((tipo_carburazione, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE] dark:hover:bg-[#2E3438]"
                  >
                    <p className="w-[80%]">
                      {tipo_carburazione.tipo_carburazione}
                    </p>
                    <input
                      className="w-[20%] accent-[#192024] dark:accent-white h-4 rounded-lg cursor-pointer"
                      type="checkbox"
                      checked={
                        selezioniTipoCarburante[
                          tipo_carburazione.tipo_carburazione
                        ] || false
                      }
                      onChange={(e) =>
                        handleCheckboxChange(
                          "tipoCarburante",
                          tipo_carburazione.tipo_carburazione,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="w-full h-[20%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE] dark:border-t-[#2E3438]">
                <button
                  type="submit"
                  className="bg-[#192024] dark:bg-white border-[1.5px] border-[#192024] dark:border-white outline-none hover:bg-[#0f1315] hover:dark:bg-[#e3e3e3] text-white dark:text-[#192024] font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-transparent border-[1.5px] border-[#192024] dark:border-white hover:bg-[#EEEEEE] hover:dark:bg-[#2E3438] text-[#192024] dark:text-white font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                  onClick={resetFiltri}
                >
                  Reimposta
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
      <div className="auto-section shrink-0 h-[90vh] px-5 sm:px-10 py-5 w-full flex items-start justify-start flex-wrap gap-x-16 gap-y-5">
        {auto && auto.length > 0 ? (
          auto.map((auto, index) => (
            <CardAuto
              key={index}
              idAuto={auto.id_veicolo}
              marca={auto.marca}
              modello={auto.modello}
              anno_immatricolazione={auto.anno_immatricolazione}
              tipo_veicolo={auto.tipo_veicolo}
              tipo_carburazione={auto.tipo_carburazione}
              chilometraggio={auto.chilometraggio}
              numero_posti={auto.numero_posti}
              colore_veicolo={auto.colore_veicolo}
              costo_giornaliero={auto.costo_giornaliero}
              images={auto.images}
              citta={auto.città}
              indirizzo={auto.indirizzo}
              favorited={auto.favorited}
            />
          ))
        ) : (
          <p className="text-lg 2xl:text-2xl text-[#192024]">
            Nessuna auto noleggiata
          </p>
        )}
      </div>
    </div>
  );
}

export default AutoNoleggiate;
