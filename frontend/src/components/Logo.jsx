import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="w-[3rem] sm:w-[7rem] md:w-[12rem] h-[2.5rem] flex justify-center items-baseline bg-[#FF690F] ">
        {""}
      </div>
    </Link>
  );
}

export default Logo;
