// Map.js
import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function Map({ sedi }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const brescia = { lng: 10.211802, lat: 45.541553 };
  const [zoom] = useState(4);
  maptilersdk.config.apiKey = "zKTSY8Huqpuc98tNjLwq";

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [brescia.lng, brescia.lat],
      zoom: zoom,
    });
  }, [brescia.lng, brescia.lat, zoom]);

  useEffect(() => {
    if (map.current && sedi && sedi.length > 0) {
      const markers = [];
      sedi.forEach((sede) => {
        const marker = new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat([sede.lon, sede.lat])
          .addTo(map.current);

        const popup = new maptilersdk.Popup({ offset: 25 }).setText(sede.nome);

        marker.getElement().addEventListener("mouseenter", () => {
          popup.setLngLat([sede.lon, sede.lat]).addTo(map.current);
        });

        marker.getElement().addEventListener("mouseleave", () => {
          popup.remove();
        });

        marker.getElement().addEventListener("click", () => {
          map.current.flyTo({
            center: [sede.lon, sede.lat],
            zoom: 14,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        });

        markers.push(marker);
      });

      // Cleanup markers and popups on sedi change
      return () => {
        markers.forEach((marker) => marker.remove());
      };
    }
  }, [sedi]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
