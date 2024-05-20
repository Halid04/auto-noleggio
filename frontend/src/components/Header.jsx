import React, { useRef, useState, useEffect } from "react";
import { Search, Moon, ChevronDown } from "lucide-react";
import Logo from "./Logo";

function Header() {
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleMenuButtonClick = (event) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClose = () => {
    setIsDropdownOpen(false);
  };
  return (
    <div className=" bg-white text-black sticky shadow-md top-0 flex-wrap z-[100] mx-auto flex w-full items-center justify-between p-4">
      <Logo />
      <div className="w-[40%] h-[2.3rem] flex justify-between  items-center px-3 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
        <Search color="#FF690F" />
        <input
          type="text"
          name=""
          id=""
          placeholder="Cerca..."
          className="border-none outline-none w-[90%] h-full bg-transparent"
        />
      </div>
      <div className="flex justify-center items-center w-[20%] gap-5">
        <Moon color="#192024" />
        <div className="flex justify-center items-baseline md:items-center md:gap-3">
          <img
            className="w-6 md:w-8 aspect-square  rounded-full ring-1 ring-[#192024] object-cover"
            src="src/images/pearsonFace.jpg"
            alt="Bordered avatar"
            loading="lazy"
          />

          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex whitespace-nowrap w-full justify-center items-center outline-none bg-trasparent  text-[#192024]"
                id="menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                onClick={handleMenuButtonClick}
                // onBlur={handleMenuClose}
              >
                <span className="hidden md:flex">Halid Cisse</span>
                <ChevronDown className="-mr-1 h-5 w-5" color="#192024" />
              </button>
            </div>

            {/* <!-- Dropdown menu --> */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
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
                    Impostazioni profilo
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
      </div>
    </div>
  );
}

export default Header;
