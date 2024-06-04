import React from "react";
import CardAuto from "../components/CardAuto";
import AuthCard from "../components/AuthCard";

const NotLogged = () => {
  return (
    <div className="w-full h-full relative">
      <div className="auto-section absolute top-0 left-0 h-[90vh] px-5 sm:px-10 py-10 w-full flex items-start justify-start flex-wrap gap-x-16 gap-y-5">
        <CardAuto
          idAuto={0}
          marca={"Audi"}
          modello={"Q3"}
          anno_immatricolazione={"2010"}
          tipo_veicolo={"utilitaria"}
          tipo_carburazione={"benzina"}
          chilometraggio={100000}
          numero_posti={4}
          colore_veicolo={"rosso"}
          costo_giornaliero={50}
          images={[
            { nome_foto: "AudiQ31" },
            { nome_foto: "AudiQ32" },
            { nome_foto: "AudiQ33" },
            { nome_foto: "AudiQ34" },
          ]}
          citta={"Milano"}
          indirizzo={"Via Milano 1"}
          favorited={0}
        />

        <CardAuto
          idAuto={0}
          marca={"Audi"}
          modello={"S4"}
          anno_immatricolazione={"2010"}
          tipo_veicolo={"utilitaria"}
          tipo_carburazione={"benzina"}
          chilometraggio={100000}
          numero_posti={4}
          colore_veicolo={"rosso"}
          costo_giornaliero={50}
          images={[
            { nome_foto: "AudiS41" },
            { nome_foto: "AudiS42" },
            { nome_foto: "AudiS43" },
            { nome_foto: "AudiS44" },
          ]}
          citta={"Milano"}
          indirizzo={"Via Milano 1"}
          favorited={0}
        />

        <CardAuto
          idAuto={0}
          marca={"Audi"}
          modello={"S4"}
          anno_immatricolazione={"2010"}
          tipo_veicolo={"utilitaria"}
          tipo_carburazione={"benzina"}
          chilometraggio={100000}
          numero_posti={4}
          colore_veicolo={"rosso"}
          costo_giornaliero={50}
          images={[
            { nome_foto: "BMWI4M50Sport1" },
            { nome_foto: "BMWI4M50Sport2" },
            { nome_foto: "BMWI4M50Sport3" },
            { nome_foto: "BMWI4M50Sport4" },
          ]}
          citta={"Milano"}
          indirizzo={"Via Milano 1"}
          favorited={0}
        />

        <CardAuto
          idAuto={0}
          marca={"Audi"}
          modello={"S4"}
          anno_immatricolazione={"2010"}
          tipo_veicolo={"utilitaria"}
          tipo_carburazione={"benzina"}
          chilometraggio={100000}
          numero_posti={4}
          colore_veicolo={"rosso"}
          costo_giornaliero={50}
          images={[
            { nome_foto: "BugattiChiron1" },
            { nome_foto: "BugattiChiron2" },
            { nome_foto: "BugattiChiron3" },
            { nome_foto: "BugattiChiron4" },
          ]}
          citta={"Milano"}
          indirizzo={"Via Milano 1"}
          favorited={0}
        />
      </div>

      <div className="w-full h-full backdrop-brightness-50 absolute top-0 left-0 flex flex-col justify-center items-center z-50">
        <h1 className="text-4xl text-center font-bold text-white">
          Per poter visualizzare questa pagina devi prima effettuare l'accesso
          <span className="text-[#FF690F]">!</span>
        </h1>
      </div>
    </div>
  );
};

export default NotLogged;
