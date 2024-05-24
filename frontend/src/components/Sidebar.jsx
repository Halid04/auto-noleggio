import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Info,
  CarFront,
  MapPinned,
  HandCoins,
  Home,
  Heart,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const [navigateToHomePage, setNavigateToHomePage] = useState(true);
  const [navigateToAuto, setNavigateToAuto] = useState(false);
  const [navigateToAutoNoleggiate, setNavigateToAutoNoleggiate] =
    useState(false);
  const [navigateToSedi, setNavigateToSedi] = useState(false);
  const [navigateToPreferiti, setNavigateToPreferiti] = useState(false);

  const handleNavigateToHomePage = () => {
    setNavigateToHomePage(true);
    setNavigateToAuto(false);
    setNavigateToAutoNoleggiate(false);
    setNavigateToSedi(false);
    setNavigateToPreferiti(false);
    navigate("/homePage");
  };

  const handleNavigateToAuto = () => {
    setNavigateToAuto(true);
    setNavigateToHomePage(false);
    setNavigateToAutoNoleggiate(false);
    setNavigateToSedi(false);
    setNavigateToPreferiti(false);
    navigate("/auto");
  };

  const handleNavigateToAutoNoleggiate = () => {
    setNavigateToAutoNoleggiate(true);
    setNavigateToAuto(false);
    setNavigateToHomePage(false);
    setNavigateToSedi(false);
    setNavigateToPreferiti(false);
    navigate("/autoNoleggiate");
  };

  const handleNavigateToSedi = () => {
    setNavigateToSedi(true);
    setNavigateToAutoNoleggiate(false);
    setNavigateToAuto(false);
    setNavigateToHomePage(false);
    setNavigateToPreferiti(false);
    navigate("/sedi");
  };

  const handleNavigateToPreferiti = () => {
    setNavigateToPreferiti(true);
    setNavigateToSedi(false);
    setNavigateToAutoNoleggiate(false);
    setNavigateToAuto(false);
    setNavigateToHomePage(false);
    navigate("/preferiti");
  };

  return (
    <div className="h-full  w-[20vw] flex flex-col justify-between items-start py-10 px-4">
      <div className="h-[80vh]  w-full flex flex-col justify-start items-start gap-5 ">
        <button
          type="button"
          onClick={handleNavigateToHomePage}
          className={
            navigateToHomePage
              ? "transition-all w-[70%] outline-none bg-[#FF690F] flex justify-start items-center gap-3 text-md text-white px-4 py-1 rounded-lg"
              : "transition-all w-[70%] border-none bg-transparent outline-none flex justify-start items-center gap-3 text-md text-[#192024] px-4 py-1"
          }
        >
          <Home color={navigateToHomePage ? "white" : "#192024"} />
          <span className="">Home</span>
        </button>
        <button
          type="button"
          onClick={handleNavigateToAuto}
          className={
            navigateToAuto
              ? "transition-all w-[70%] outline-none bg-[#FF690F] flex justify-start items-center gap-3 text-md text-white px-4 py-1 rounded-lg"
              : "transition-all w-[70%] border-none bg-transparent outline-none flex justify-start items-center gap-3 text-md text-[#192024] px-4 py-1"
          }
        >
          <CarFront color={navigateToAuto ? "white" : "#192024"} />
          <span className="">Auto</span>
        </button>
        <button
          type="button"
          onClick={handleNavigateToAutoNoleggiate}
          className={
            navigateToAutoNoleggiate
              ? "transition-all w-[90%] outline-none bg-[#FF690F] flex justify-start items-center gap-3 text-md text-white px-4 py-1 rounded-lg"
              : "transition-all w-[90%] border-none bg-transparent outline-none flex justify-start items-center gap-3 text-md text-[#192024] px-4 py-1"
          }
        >
          <HandCoins color={navigateToAutoNoleggiate ? "white" : "#192024"} />
          <span className="">Auto Noleggiate</span>
        </button>
        <button
          type="button"
          onClick={handleNavigateToSedi}
          className={
            navigateToSedi
              ? "transition-all w-[70%] outline-none bg-[#FF690F] flex justify-start items-center gap-3 text-md text-white px-4 py-1 rounded-lg"
              : "transition-all w-[70%] border-none bg-transparent outline-none flex justify-start items-center gap-3 text-md text-[#192024] px-4 py-1"
          }
        >
          <MapPinned color={navigateToSedi ? "white" : "#192024"} />
          <span className="">Sedi</span>
        </button>
      </div>

      <div className="h-[20vh] w-full flex justify-start items-start">
        <button
          type="button"
          onClick={handleNavigateToPreferiti}
          className={
            navigateToPreferiti
              ? "transition-all w-[70%] outline-none bg-[#FF690F] flex justify-start items-center gap-3 text-md text-white px-4 py-1 rounded-lg"
              : "transition-all w-[70%] border-none bg-transparent outline-none flex justify-start items-center gap-3 text-md text-[#192024] px-4 py-1"
          }
        >
          <Heart color={navigateToPreferiti ? "white" : "#192024"} />
          <span className="">Preferiti</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
