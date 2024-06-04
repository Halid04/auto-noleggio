// Map.js
import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function MapGPS({ veicoloPosizione }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const brescia = { lng: 10.211802, lat: 45.541553 };
  const [zoom] = useState(4);
  maptilersdk.config.apiKey = "YOUR_API_KEY";

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
    if (map.current && veicoloPosizione && veicoloPosizione.length > 0) {
      const markers = [];
      veicoloPosizione.forEach((veicolo) => {
        const marker = new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat([veicolo.longitudine, veicolo.latitudine])
          .addTo(map.current);

        const popup = new maptilersdk.Popup({ offset: 25 }).setText(
          veicolo.carDetail
        );

        marker.getElement().addEventListener("mouseenter", () => {
          popup
            .setLngLat([veicolo.longitudine, veicolo.latitudine])
            .addTo(map.current);
        });

        marker.getElement().addEventListener("mouseleave", () => {
          popup.remove();
        });

        marker.getElement().addEventListener("click", () => {
          map.current.flyTo({
            center: [veicolo.longitudine, veicolo.latitudine],
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
  }, [veicoloPosizione]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
