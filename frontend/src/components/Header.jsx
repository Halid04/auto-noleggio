import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Moon, ChevronDown, Sun } from "lucide-react";
import Logo from "./Logo";
import UserState from "./AuthCard";

function Header() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );
  const [userSurname, setUserSurname] = useState(
    localStorage.getItem("userSurname")
  );
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

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
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleMenuButtonClick = (event) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClose = () => {
    setIsDropdownOpen(false);
  };

  const handleSwitchTheme = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem("darkMode", newDarkMode.toString());
      return newDarkMode;
    });
  };

  return (
    <div
      className={
        "bg-white dark:bg-[#192024] transition-all duration-300 ease-in-out text-black dark:text-white sticky shadow-md top-0 flex-wrap z-[100] mx-auto flex w-full items-center justify-between p-4"
      }
    >
      <Logo />
      <div className="w-[40%] h-[2.3rem] flex justify-between items-center px-3 rounded-lg border-[1.5px] border-[#808080rgb(128, 128, 128)]">
        <Search color="#FF690F" />
        <input
          type="text"
          placeholder="Cerca..."
          className="border-none outline-none w-[90%] h-full bg-transparent"
        />
      </div>
      <div className="flex justify-center items-center w-[20%] gap-5">
        <button
          onClick={handleSwitchTheme}
          className="bg-transparent outline-none border-none"
        >
          {darkMode ? (
            <Sun color="white" className="cursor-pointer" />
          ) : (
            <Moon color="#192024" className="cursor-pointer" />
          )}
        </button>

        <div className="flex justify-center items-baseline md:items-center md:gap-3">
          {!localStorage.getItem("userToken") && <UserState />}

          {localStorage.getItem("userToken") && (
            <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 text-base md:text-lg text-white bg-[#FF690F] rounded-full">
              {localStorage.getItem("userName") &&
                localStorage.getItem("userName").charAt(0).toUpperCase()}{" "}
              <span className="hidden md:flex">
                {localStorage.getItem("userSurname") &&
                  localStorage.getItem("userSurname").charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {localStorage.getItem("userToken") && (
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex whitespace-nowrap w-full justify-center items-end outline-none bg-transparent text-[#192024] dark:text-white"
                  id="menu-button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  onClick={handleMenuButtonClick}
                >
                  <span className="hidden md:flex text-[#192024] dark:text-white">
                    {localStorage.getItem("userName")}{" "}
                    {localStorage.getItem("userSurname")}
                  </span>
                  <ChevronDown size={20} className="mr-1" />
                </button>
              </div>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-[#192024] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    {localStorage.getItem("isAdmin") === "1" ? (
                      <button
                        type="button"
                        className="text-gray-700 dark:text-white block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-gray-700 dark:text-white block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        onClick={() => navigate("/impostazioniProfilo")}
                      >
                        Impostazioni profilo
                      </button>
                    )}
                    <button
                      type="button"
                      className="text-gray-700 dark:text-white block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/auto");
                        window.location.reload();
                      }}
                    >
                      Disconnessione
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
