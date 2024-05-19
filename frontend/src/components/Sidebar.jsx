import React, { useState } from "react";
import { Info, CarFront, MapPinned } from "lucide-react";

function Sidebar() {
  const [navigateToAboutUs, setNavigateToAboutUs] = useState(false);
  const [navigateToAuto, setNavigateToAuto] = useState(false);
  const [navigateToAutoNoleggiate, setNavigateToAutoNoleggiate] =
    useState(false);
  const [navigateToSedi, setNavigateToSedi] = useState(false);

  const handleNavigateToAboutUs = () => {
    setNavigateToAboutUs(true);
    setNavigateToAuto(false);
    setNavigateToAutoNoleggiate(false);
    setNavigateToSedi(false);
  };

  const handleNavigateToAuto = () => {
    setNavigateToAuto(true);
    setNavigateToAboutUs(false);
    setNavigateToAutoNoleggiate(false);
    setNavigateToSedi(false);
  };

  const handleNavigateToAutoNoleggiate = () => {
    setNavigateToAutoNoleggiate(true);
    setNavigateToAuto(false);
    setNavigateToAboutUs(false);
    setNavigateToSedi(false);
  };

  const handleNavigateToSedi = () => {
    setNavigateToSedi(true);
    setNavigateToAutoNoleggiate(false);
    setNavigateToAuto(false);
    setNavigateToAboutUs(false);
  };

  return (
    <div className="h-full w-[20vw] flex flex-col justify-start items-start gap-5 py-10 px-4">
      <button
        type="button"
        onClick={handleNavigateToAboutUs}
        className={
          navigateToAboutUs
            ? "transition-all w-[70%] outline-none bg-[#FF690F] flex justify-start items-center gap-3 text-xl text-white px-4 py-1 rounded-lg"
            : "transition-all w-[70%] border-none bg-transparent outline-none flex justify-start items-center gap-3 text-xl text-[#192024] px-4 py-1"
        }
      >
        <Info color={navigateToAboutUs ? "white" : "#192024"} />
        <span className="">About Us</span>
      </button>
      <button
        type="button"
        onClick={handleNavigateToAuto}
        className={
          navigateToAuto
            ? "transition-all w-[70%] outline-none bg-[#FF690F] flex justify-start items-center gap-3 text-xl text-white px-4 py-1 rounded-lg"
            : "transition-all w-[70%] border-none bg-transparent outline-none flex justify-start items-center gap-3 text-xl text-[#192024] px-4 py-1"
        }
      >
        <CarFront color={navigateToAuto ? "white" : "#192024"} />
        <span className="">Auto</span>
      </button>
      <button type="button">Auto Noleggiate</button>
      <button
        type="button"
        onClick={handleNavigateToSedi}
        className={
          navigateToSedi
            ? "transition-all w-[70%] outline-none bg-[#FF690F] flex justify-start items-center gap-3 text-xl text-white px-4 py-1 rounded-lg"
            : "transition-all w-[70%] border-none bg-transparent outline-none flex justify-start items-center gap-3 text-xl text-[#192024] px-4 py-1"
        }
      >
        <MapPinned color={navigateToSedi ? "white" : "#192024"} />
        <span className="">Sedi</span>
      </button>
    </div>
  );
}

export default Sidebar;
