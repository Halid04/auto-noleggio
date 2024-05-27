import React from "react";
import { useNavigate } from "react-router-dom";

function Transazione() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full bg-[#F0F3F5]">
      <h1 className="text-4xl text-center mt-5">Transazione!!</h1>
      <button onClick={() => navigate("/auto")}>auto</button>
    </div>
  );
}

export default Transazione;
