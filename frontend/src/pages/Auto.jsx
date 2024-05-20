import React, { useRef, useState, useEffect } from "react";
import CardAuto from "../components/CardAuto";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

function Auto() {
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

  return (
    <div className=" h-full w-full shrink-0 bg-[#F0F3F5] overflow-x-hidden overflow-y-auto flex flex-col py-5 justify-between items-start ">
      <div className="filtri-section shrink-0 h-[10vh] gap-5 px-5 sm:px-10  w-full flex justify-start items-center">
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

          {/* <!-- Dropdown General Filtri menu --> */}
          {isDropdownGeneralFiltriOpen && (
            <div
              ref={dropdownGeneralFiltriRef}
              className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                  General Filtri
                </button>
                <button
                  type="button"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  // onClick={handleLogout}
                >
                  Disconnessione
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtri Marca  */}
        <div className="relative inline-block text-left">
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
              <ChevronDown className="-mr-1 h-5 w-5" color="#192024" />
            </button>
          </div>

          {/* <!-- Dropdown Filtri marca menu --> */}
          {isDropdownMarcaFiltriOpen && (
            <div
              ref={dropdownMarcaFiltriRef}
              className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                  Marca
                </button>
                <button
                  type="button"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  // onClick={handleLogout}
                >
                  Disconnessione
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtri Tipo macchina  */}
        <div className="hidden relative sm:inline-block text-left">
          <div>
            <button
              type="button"
              className="hover:bg-[#EEEEEE] transition-all inline-flex whitespace-nowrap w-full justify-center items-center outline-none border-[1.5px] border-[#EEEEEE] rounded-lg bg-white px-3 py-1 text-[#192024]"
              id="menu-button"
              aria-expanded={isDropdownTipoMacchinaFiltriOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClickTipoMacchinaFiltri}
            >
              <span className=" font-bold text-[#192024]">Tipo macchina</span>
              <ChevronDown className="-mr-1 h-5 w-5" color="#192024" />
            </button>
          </div>

          {/* <!-- Dropdown Filtri marca menu --> */}
          {isDropdownTipoMacchinaFiltriOpen && (
            <div
              ref={dropdownTipoMacchinaFiltriRef}
              className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                  Tipo macchina
                </button>
                <button
                  type="button"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  // onClick={handleLogout}
                >
                  Disconnessione
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtri Prezzo  */}
        <div className="hidden relative sm:inline-block text-left">
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
              <ChevronDown className="-mr-1 h-5 w-5" color="#192024" />
            </button>
          </div>

          {/* <!-- Dropdown Filtri prezzo menu --> */}
          {isDropdownPrezzoFiltriOpen && (
            <div
              ref={dropdownPrezzoFiltriRef}
              className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                  Prezzo
                </button>
                <button
                  type="button"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  // onClick={handleLogout}
                >
                  Disconnessione
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtri Anno  */}
        <div className="hidden relative sm:inline-block text-left">
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
              <ChevronDown className="-mr-1 h-5 w-5" color="#192024" />
            </button>
          </div>

          {/* <!-- Dropdown Filtri Anno menu --> */}
          {isDropdownAnnoFiltriOpen && (
            <div
              ref={dropdownAnnoFiltriRef}
              className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                  Anno
                </button>
                <button
                  type="button"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  // onClick={handleLogout}
                >
                  Disconnessione
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtri Tipo carburante  */}
        <div className="hidden relative md:inline-block text-left">
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
              <ChevronDown className="-mr-1 h-5 w-5" color="#192024" />
            </button>
          </div>

          {/* <!-- Dropdown Filtri Tipo carburante menu --> */}
          {isDropdownTipoCarburanteFiltriOpen && (
            <div
              ref={dropdownTipoCarburanteFiltriRef}
              className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                  Tipo carburante
                </button>
                <button
                  type="button"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  // onClick={handleLogout}
                >
                  Disconnessione
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
              <ChevronDown className="-mr-1 h-5 w-5" color="#192024" />
            </button>
          </div>

          {/* <!-- Dropdown Filtri Vicino a te menu --> */}
          {isDropdownVicinoATeFiltriOpen && (
            <div
              ref={dropdownVicinoATeFiltriRef}
              className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                  Vicino a te
                </button>
                <button
                  type="button"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  // onClick={handleLogout}
                >
                  Disconnessione
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="auto-section shrink-0 h-[90vh] px-5 sm:px-10 py-5 w-full flex items-start justify-start flex-wrap gap-x-16 gap-y-5">
        <CardAuto />
        <CardAuto />
        <CardAuto />
        <CardAuto />
        <CardAuto />
        <CardAuto />
        <CardAuto />
      </div>
    </div>
  );
}

export default Auto;
