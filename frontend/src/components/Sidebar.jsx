import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Info,
  CarFront,
  MapPinned,
  HandCoins,
  Home,
  Heart,
} from "lucide-react";

const routes = [
  { path: "/homePage", name: "Home", icon: Home },
  { path: "/auto", name: "Auto", icon: CarFront },
  { path: "/autoNoleggiate", name: "Auto Noleggiate", icon: HandCoins },
  { path: "/sedi", name: "Sedi", icon: MapPinned },
  { path: "/preferiti", name: "Preferiti", icon: Heart },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleNavigation = (path) => {
    setActivePath(path);

    if (path === "/preferiti" && !localStorage.getItem("userToken")) {
      return navigate("/notLogged");
    }

    if (path === "/autoNoleggiate" && !localStorage.getItem("userToken")) {
      return navigate("/notLogged");
    }

    navigate(path);
  };

  return (
    <div className="h-full w-[20vw] z-[100] flex flex-col justify-between items-start py-10 px-4">
      <div className="h-[80vh] w-full flex flex-col justify-start items-start gap-5">
        {routes.slice(0, 4).map((route) => (
          <button
            key={route.path}
            type="button"
            onClick={() => handleNavigation(route.path)}
            className={`transition-all w-[90%] ${
              activePath === route.path
                ? "bg-[#FF690F] text-white"
                : "bg-transparent text-[#192024] dark:text-white"
            } outline-none whitespace-nowrap flex justify-start items-center gap-3 text-base 2xl:text-xl px-4 py-1 rounded-lg`}
          >
            <route.icon
              size={22}
              className={`${
                activePath === route.path
                  ? "stroke-white"
                  : "stroke-[#192024] dark:stroke-white"
              }`}
              // color={activePath === route.path ? "white" : "#192024"}
            />
            <span className="hidden md:flex">{route.name}</span>
          </button>
        ))}
      </div>
      <div className="h-[20vh] w-full flex justify-start 2xl:items-center items-start">
        <button
          type="button"
          onClick={() => handleNavigation(routes[4].path)}
          className={`transition-all w-[70%] ${
            activePath === routes[4].path
              ? "bg-[#FF690F] text-white"
              : "bg-transparent text-[#192024] dark:text-white"
          } outline-none flex justify-start items-center gap-3 text-base 2xl:text-xl px-4 py-1 rounded-lg`}
        >
          <Heart
            size={22}
            className={`${
              activePath === routes[4].path
                ? "stroke-white"
                : "stroke-[#192024] dark:stroke-white"
            }`}
            // color={activePath === routes[4].path ? "white" : "#192024"}
          />
          <span className="hidden md:flex">{routes[4].name}</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
