import React, { useRef, useState, useEffect } from "react";
import CardAuto from "../components/CardAuto";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

function Auto() {
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

  useEffect(() => {
    getAllAuto();
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
    const url = "http://localhost/auto-noleggio/backend/public/veicoli";

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
        setAuto(data.content);
      })
      .catch((error) => {
        console.error("Errore durante il recupero delle auto:", error);
      });
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

        const selezioniMarcaDefault = {};
        data.content.forEach((marca) => {
          selezioniMarcaDefault[marca.marca] = true;
        });

        setSelezioniMarca(selezioniMarcaDefault);
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

        const selezioniTipoMacchinaDefault = {};
        data.content.forEach((tipo) => {
          selezioniTipoMacchinaDefault[tipo.tipo_veicolo] = true;
        });

        setSelezioniTipoMacchina(selezioniTipoMacchinaDefault);
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

        const selezioniTipoCarburanteDefault = {};
        data.content.forEach((tipo) => {
          selezioniTipoCarburanteDefault[tipo.tipo_carburazione] = true;
        });

        setSelezioniTipoCarburante(selezioniTipoCarburanteDefault);
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

    const url = "http://localhost/auto-noleggio/backend/public/";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const selezionateMarche = Object.keys(selezioniMarca).filter(
      (marca) => selezioniMarca[marca]
    );
    const selezionatiTipiMacchina = Object.keys(selezioniTipoMacchina).filter(
      (tipo) => selezioniTipoMacchina[tipo]
    );
    const selezionatiTipiCarburante = Object.keys(
      selezioniTipoCarburante
    ).filter((tipo) => selezioniTipoCarburante[tipo]);

    const requestObj = {
      marche: selezionateMarche,
      tipiMacchina: selezionatiTipiMacchina,
      prezzo: {
        prezzoMassimo,
        prezzoMinimo: 0,
      },
      anno: selezioniAnno.map((range) => `${range.min}-${range.max}`),
      chilometraggio: {
        chilometraggioMassimo,
        chilometraggioMinimo: 0,
      },
      tipicarburante: selezionatiTipiCarburante,
    };

    console.log(requestObj);

    // fetch(url, {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(requestObj),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.text().then((text) => {
    //         throw new Error(text);
    //       });
    //     } else {
    //       return response.json(); // Moved inside the else block
    //     }
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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

  return (
    <div className=" h-full w-full shrink-0 bg-[#F0F3F5] overflow-x-hidden overflow-y-auto flex flex-col py-5 justify-between items-start ">
      <form
        onSubmit={handleApplyFilter}
        className="filtri-section shrink-0 h-[10vh] gap-5 px-5 sm:px-10  w-full flex justify-start items-center"
      >
        {/* Filtri generali */}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="hover:bg-[#EEEEEE] transition-all inline-flex w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] rounded-lg bg-white px-2 py-1 text-[#192024]"
              id="menu-button"
              aria-expanded={isDropdownGeneralFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickGeneralFiltri}
            >
              <SlidersHorizontal size={17} strokeWidth={3} color="#192024" />
            </button>
          </div>

          {isDropdownGeneralFiltriOpen && (
            <div
              ref={dropdownGeneralFiltriRef}
              className="flex flex-col shrink-0 text-[#192024] justify-start items-start absolute left-0 z-10 mt-2 w-60 sm:w-72 h-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                      className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE]"
                    >
                      <p className="w-[80%]">{marca.marca}</p>
                      <input
                        className="w-[20%] accent-[#192024] h-4 rounded-lg cursor-pointer"
                        type="checkbox"
                        checked={selezioniMarca[marca.marca] || false}
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
                      min="0"
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
                      className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE]"
                    >
                      <p className="w-[80%]">{tipo_veicolo.tipo_veicolo}</p>
                      <input
                        className="w-[20%] accent-[#192024] h-4 rounded-lg cursor-pointer"
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
                      className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE]"
                    >
                      <p className="w-[80%]">{range.label}</p>
                      <input
                        className="w-[20%] accent-[#192024] h-4 rounded-lg cursor-pointer"
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
                      min="0"
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
                      className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE]"
                    >
                      <p className="w-[80%]">
                        {tipo_carburazione.tipo_carburazione}
                      </p>
                      <input
                        className="w-[20%] accent-[#192024] h-4 rounded-lg cursor-pointer"
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
              <div className="w-full h-[20%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE]">
                <button
                  type="submit"
                  className="bg-[#192024] border-[1.5px] outline-none hover:bg-[#0f1315] text-white font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-transparent border-[1.5px] border-[#192024] hover:bg-[#EEEEEE] text-[#192024] font-bold py-1 px-4 sm:py-2 sm:px-7 rounded-lg"
                  // onClick={resetFilters}
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
              className="hover:bg-[#EEEEEE] transition-all inline-flex w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] rounded-lg bg-white px-3 py-1 text-[#192024]"
              id="menu-button"
              aria-expanded={isDropdownMarcaFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickMarcaFiltri}
            >
              <span className=" font-bold text-[#192024]">Marca</span>
              <ChevronDown
                className={`mr-1 h-5 w-5 transition-transdiv duration-300 ${
                  isDropdownMarcaFiltriOpen ? "rotate-180" : "rotate-0"
                }`}
                color="#192024"
              />
            </button>
          </div>

          {/* <!-- Dropdown Filtri marca menu --> */}
          {isDropdownMarcaFiltriOpen && (
            <div
              ref={dropdownMarcaFiltriRef}
              className="flex flex-col shrink-0 text-[#192024] justify-start items-start absolute left-0 z-10 mt-2 w-72 h-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="filtri-list-section w-full h-[80%] shrink-0 flex flex-col overflow-y-auto overflow-x-hidden justify-start items-start p-3">
                <h2 className="font-bold mb-2 px-2 text-lg">Marca</h2>
                {filtriMarca &&
                  filtriMarca.length > 0 &&
                  filtriMarca.map((marca, index) => (
                    <div
                      key={index}
                      className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE]"
                    >
                      <p className="w-[80%]">{marca.marca}</p>
                      <input
                        className="w-[20%] accent-[#192024] h-4 rounded-lg cursor-pointer"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  ))}
              </div>
              <div className="w-full h-[20%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE]">
                <button
                  type="submit"
                  className="bg-[#192024] border-[1.5px] outline-none hover:bg-[#0f1315] text-white font-bold py-2 px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-trasparent border-[1.5px] border-[#192024] hover:bg-[#EEEEEE] text-[#192024] font-bold py-2 px-5 rounded-lg"
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
              className="hover:bg-[#EEEEEE] transition-all inline-flex whitespace-nowrap w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] rounded-lg bg-white px-3 py-1 text-[#192024]"
              id="menu-button"
              aria-expanded={isDropdownTipoMacchinaFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickTipoMacchinaFiltri}
            >
              <span className=" font-bold text-[#192024]">
                Tipo di macchina
              </span>
              <ChevronDown
                className={`mr-1 h-5 w-5 transition-transdiv duration-300 ${
                  isDropdownTipoMacchinaFiltriOpen ? "rotate-180" : "rotate-0"
                }`}
                color="#192024"
              />
            </button>
          </div>

          {/* <!-- Dropdown Filtri Tipo Macchina menu --> */}
          {isDropdownTipoMacchinaFiltriOpen && (
            <div
              ref={dropdownTipoMacchinaFiltriRef}
              className="flex flex-col shrink-0 text-[#192024] justify-start items-start absolute left-0 z-10 mt-2 w-72 h-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="filtri-list-section w-full h-[80%] shrink-0 flex flex-col overflow-y-auto overflow-x-hidden justify-start items-start p-3">
                <h2 className="font-bold mb-2 px-2 text-lg">
                  Tipo di macchina
                </h2>
                {filtriTipoMacchina &&
                  filtriTipoMacchina.length > 0 &&
                  filtriTipoMacchina.map((tipo_veicolo, index) => (
                    <div
                      key={index}
                      className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE]"
                    >
                      <p className="w-[80%]">{tipo_veicolo.tipo_veicolo}</p>
                      <input
                        className="w-[20%] accent-[#192024] h-4 rounded-lg cursor-pointer"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  ))}
              </div>
              <div className="w-full h-[20%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE]">
                <button
                  type="submit"
                  className="bg-[#192024] border-[1.5px] outline-none hover:bg-[#0f1315] text-white font-bold py-2 px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-trasparent border-[1.5px] border-[#192024] hover:bg-[#EEEEEE] text-[#192024] font-bold py-2 px-5 rounded-lg"
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
              className="hover:bg-[#EEEEEE] transition-all inline-flex whitespace-nowrap w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] rounded-lg bg-white px-3 py-1 text-[#192024]"
              id="menu-button"
              aria-expanded={isDropdownPrezzoFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickPrezzoFiltri}
            >
              <span className=" font-bold text-[#192024]">Prezzo</span>
              <ChevronDown
                className={`mr-1 h-5 w-5 transition-transdiv duration-300 ${
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
              className="flex flex-col shrink-0 text-[#192024] justify-start items-start absolute right-0 lg:left-0 z-10 mt-2 w-72 h-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="filtri-list-section w-full h-[70%] shrink-0 flex flex-col overflow-y-auto overflow-x-hidden justify-start items-start p-3">
                <h2 className="font-bold mb-2 px-2 text-lg">Prezzo</h2>

                <div className="shrink-0 w-full gap-5 h-[5rem] px-2 rounded-lg flex flex-col justify-center items-center">
                  <p className="w-full">
                    Prezzo minimo:{" "}
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
                    min="0"
                    max="1000"
                    step={50}
                    value={prezzoMassimo}
                    onChange={handleSliderChange}
                  />
                </div>
              </div>
              <div className="w-full h-[30%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE]">
                <button
                  type="submit"
                  className="bg-[#192024] border-[1.5px] outline-none hover:bg-[#0f1315] text-white font-bold py-2 px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-trasparent border-[1.5px] border-[#192024] hover:bg-[#EEEEEE] text-[#192024] font-bold py-2 px-5 rounded-lg"
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
              className="hover:bg-[#EEEEEE] transition-all inline-flex whitespace-nowrap w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] rounded-lg bg-white px-3 py-1 text-[#192024]"
              id="menu-button"
              aria-expanded={isDropdownAnnoFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickAnnoFiltri}
            >
              <span className=" font-bold text-[#192024]">Anno</span>
              <ChevronDown
                className={`mr-1 h-5 w-5 transition-transdiv duration-300 ${
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
              className="flex flex-col shrink-0 text-[#192024] justify-start items-start absolute right-0 xl:left-0 z-10 mt-2 w-72 h-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="filtri-list-section w-full h-[80%] shrink-0 flex flex-col overflow-y-auto overflow-x-hidden justify-start items-start p-3">
                <h2 className="font-bold mb-2 px-2 text-lg">Anno</h2>
                {/* 2005-2010 */}
                <div className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE]">
                  <p className="w-[80%]">2005-2010</p>
                  <input
                    className="w-[20%] accent-[#192024] h-4 rounded-lg cursor-pointer"
                    type="checkbox"
                    defaultChecked
                  />
                </div>

                {/* 2010-2015 */}
                <div className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE]">
                  <p className="w-[80%]">2010-2015</p>
                  <input
                    className="w-[20%] accent-[#192024] h-4 rounded-lg cursor-pointer"
                    type="checkbox"
                    defaultChecked
                  />
                </div>

                {/* 2015-2020 */}
                <div className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE]">
                  <p className="w-[80%]">2015-2020</p>
                  <input
                    className="w-[20%] accent-[#192024] h-4 rounded-lg cursor-pointer"
                    type="checkbox"
                    defaultChecked
                  />
                </div>

                {/* 2020-oggi */}
                <div className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE]">
                  <p className="w-[80%]">2020-oggi</p>
                  <input
                    className="w-[20%] accent-[#192024] h-4 rounded-lg cursor-pointer"
                    type="checkbox"
                    defaultChecked
                  />
                </div>
              </div>
              <div className="w-full h-[20%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE]">
                <button
                  type="submit"
                  className="bg-[#192024] border-[1.5px] outline-none hover:bg-[#0f1315] text-white font-bold py-2 px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-trasparent border-[1.5px] border-[#192024] hover:bg-[#EEEEEE] text-[#192024] font-bold py-2 px-5 rounded-lg"
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
              className="hover:bg-[#EEEEEE] transition-all inline-flex whitespace-nowrap w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] rounded-lg bg-white px-3 py-1 text-[#192024]"
              id="menu-button"
              aria-expanded={isDropdownTipoCarburanteFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickTipoCarburanteFiltri}
            >
              <span className=" font-bold text-[#192024]">Tipo carburante</span>
              <ChevronDown
                className={`mr-1 h-5 w-5 transition-transdiv duration-300 ${
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
              className="flex flex-col shrink-0 text-[#192024] justify-start items-start absolute right-0 xl:left-0 z-10 mt-2 w-72 h-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="filtri-list-section w-full h-[80%] shrink-0 flex flex-col overflow-y-auto overflow-x-hidden justify-start items-start p-3">
                <h2 className="font-bold mb-2 px-2 text-lg">Tipo carburante</h2>
                {filtriTipoCarburante &&
                  filtriTipoCarburante.length > 0 &&
                  filtriTipoCarburante.map((tipo_carburazione, index) => (
                    <div
                      key={index}
                      className="shrink-0 w-full h-[2.5rem] px-2 rounded-lg flex justify-start items-center hover:bg-[#EEEEEE]"
                    >
                      <p className="w-[80%]">
                        {tipo_carburazione.tipo_carburazione}
                      </p>
                      <input
                        className="w-[20%] accent-[#192024] h-4 rounded-lg cursor-pointer"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  ))}
              </div>
              <div className="w-full h-[20%] flex justify-around items-center border-t-[1.5px] border-t-[#EEEEEE]">
                <button
                  type="submit"
                  className="bg-[#192024] border-[1.5px] outline-none hover:bg-[#0f1315] text-white font-bold py-2 px-7 rounded-lg"
                >
                  Applica
                </button>
                <button
                  type="button"
                  className="bg-trasparent border-[1.5px] border-[#192024] hover:bg-[#EEEEEE] text-[#192024] font-bold py-2 px-5 rounded-lg"
                >
                  Reimposta
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtri Vicino a te  */}
        <div className="hidden relative lg:inline-block text-left">
          <div>
            <button
              type="button"
              className="hover:bg-[#EEEEEE] transition-all inline-flex whitespace-nowrap w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] rounded-lg bg-white px-3 py-1 text-[#192024]"
              id="menu-button"
              aria-expanded={isDropdownVicinoATeFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickVicinoATeFiltri}
            >
              <span className=" font-bold text-[#192024]">Vicino a te</span>
              <ChevronDown
                className={`mr-1 h-5 w-5 transition-transdiv duration-300 ${
                  isDropdownVicinoATeFiltriOpen ? "rotate-180" : "rotate-0"
                }`}
                color="#192024"
              />
            </button>
          </div>

          {/* <!-- Dropdown Filtri Vicino a te menu --> */}
          {isDropdownVicinoATeFiltriOpen && (
            <div
              ref={dropdownVicinoATeFiltriRef}
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <button
                  type="button"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  // onClick={handleNavigateToAccount}
                >
                  Vicino a te - da fare per ultimo
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
            />
          ))
        ) : (
          <p>Nessuna auto disponibile</p>
        )}
      </div>
    </div>
  );
}

export default Auto;
