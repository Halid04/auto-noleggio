import React, { useState } from "react";
import { Info } from "lucide-react";

function Sidebar() {
  const [navigateToAboutUs, setNavigateToAboutUs] = useState(false);

  return (
    <div className="h-full w-[20vw] flex flex-col justify-start items-start gap-5 py-10 px-4">
      <button
        type="button"
        onClick={() => setNavigateToAboutUs(!navigateToAboutUs)}
        // className="border-none bg-transparent outline-none flex justify-between items-center gap-3 text-2xl text-[#192024] px-4"
        className="outline-none bg-[#FF690F] flex justify-between items-center gap-3 text-2xl text-white px-4 py-1 rounded-lg"
      >
        <Info
          // color="#192024"
          color="white"
        />
        <span className="">About Us</span>
      </button>
      <button type="button">Auto</button>
      <button type="button">Auto Noleggiate</button>
      <button type="button">Sedi</button>
    </div>
  );
}

export default Sidebar;
