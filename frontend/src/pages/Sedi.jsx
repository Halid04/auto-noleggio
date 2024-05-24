import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import Map from "../components/Map";

function Sedi() {
  const position = [51.505, -0.09];

  return (
    <div className="h-full w-full bg-[#F0F3F5]">
      <Map />
    </div>
  );
}

export default Sedi;
