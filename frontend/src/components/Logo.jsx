import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="w-[3rem] sm:w-[7rem] md:w-[12rem] h-[2.5rem] flex justify-center items-baseline bg-[#FF690F] ">
        <img
          src="/src/assets/LogoGrande.png"
          className="hidden sm:flex w-full h-full object-cover"
          alt="logo grande"
        />
      </div>
    </Link>
  );
}

export default Logo;
