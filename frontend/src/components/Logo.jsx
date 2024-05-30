import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/homePage">
      <div className="w-[3rem] sm:w-[7rem] md:w-[12rem] h-[2.5rem] flex justify-center items-baseline bg-trasparent ">
        <img
          src="/src/assets/LogoGrande.png"
          className="hidden sm:flex w-full h-full object-cover"
          alt="Logo grande"
        />
        <img
          src="/src/assets/LogoPiccolo2.jpg"
          className="flex sm:hidden w-full h-full object-cover"
          alt="Logo piccolo"
        />
      </div>
    </Link>
  );
}

export default Logo;
