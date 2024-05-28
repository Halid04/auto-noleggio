import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function Transazione() {
  const { idAuto } = useParams();
  const navigate = useNavigate();
  return (
    <div className="h-full w-full bg-[#F0F3F5]">
      <h1 className="text-4xl text-center mt-5">Transazione!! auto {idAuto}</h1>
      <button onClick={() => navigate("/auto")}>auto</button>
    </div>
  );
}

export default Transazione;
