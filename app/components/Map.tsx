'use client'

import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Load the Mapbox token from environment variable (must start with NEXT_PUBLIC_)
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (!MAPBOX_ACCESS_TOKEN) {
  throw new Error("Missing NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in environment variables.");
}

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const COUNTRIES = [
  {
    id: "uae",
    name: "United Arab Emirates",
    lngLat: [54.3, 24.4] as [number, number],
    flagUrl: "https://flagcdn.com/w80/ae.png",
    developments: "105+",
    exploreUrl: "https://visitabudhabi.ae/en/campaign/summer-in-abu-dhabi/map",
  },
  {
    id: "uk",
    name: "United Kingdom",
    lngLat: [-2.5, 54] as [number, number],
    flagUrl: "https://flagcdn.com/w80/gb.png",
    developments: "89+",
    exploreUrl: "https://earth.google.com/web/@54,-2.5,50000a,500000d,35y,0h,60t,0r",
  },
  {
    id: "egypt",
    name: "Egypt",
    lngLat: [30.8, 26.8] as [number, number],
    flagUrl: "https://flagcdn.com/w80/eg.png",
    developments: "42+",
    exploreUrl: "https://earth.google.com/web/@26.8,30.8,50000a,500000d,35y,0h,60t,0r",
  },
];

interface GlobeMapProps {
  started?: boolean;
}

const GlobeMap: React.FC<GlobeMapProps> = ({ started = false }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number>(0);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [25, 28],
      zoom: 1.6,
      projection: { name: "globe" },
    });

    map.on("style.load", () => {
      map.setFog({
        color: "rgb(120, 160, 220)",
        "high-color": "rgb(25, 55, 130)",
        "horizon-blend": 0.08,
        "space-color": "rgb(8, 8, 18)",
        "star-intensity": 0.9,
      });
    });

    mapRef.current = map;

    const markers: Marker[] = [];

    COUNTRIES.forEach((country, i) => {
      const markerEl = document.createElement("div");
      markerEl.className = "country-flag-marker";
      markerEl.innerHTML = `<img src="${country.flagUrl}" alt="${country.name}" />`;

      const marker = new mapboxgl.Marker({ element: markerEl, anchor: "center" })
        .setLngLat(country.lngLat)
        .addTo(map);

      markerEl.addEventListener("click", () => {
        map.flyTo({ center: country.lngLat, zoom: 2.5, duration: 1200 });
        setSelectedCountry(i);
      });

      markers.push(marker);
    });

    markersRef.current = markers;

    return () => {
      markers.forEach((m) => m.remove());
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, [started]);

  const country = COUNTRIES[selectedCountry];

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050510]">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      {/* Explore Modal - always visible at mid-bottom when map is shown */}
      {started && (
        <div className="absolute inset-0 z-9999 flex items-end justify-center pb-12 pointer-events-none">
          <div className="pointer-events-auto country-explore-modal">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={country.flagUrl}
                alt={country.name}
                className="w-6 h-4 object-cover rounded"
              />
              <span className="font-semibold text-white text-sm">{country.name}</span>
            </div>
            <p className="text-gray-400 text-xs mb-4">{country.developments} Developments</p>
            <a
              href={country.exploreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              Explore
            </a>
            <div className="flex justify-center gap-1.5 mt-4">
              {COUNTRIES.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition ${i === selectedCountry ? "bg-white scale-125" : "bg-white/50"
                    }`}
                />
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-3">
              {COUNTRIES.map((c, i) =>
                i !== selectedCountry ? (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedCountry(i);
                      mapRef.current?.flyTo({
                        center: c.lngLat,
                        zoom: 2.5,
                        duration: 1200,
                      });
                    }}
                    className="w-6 h-4 rounded overflow-hidden border border-white/30 hover:border-orange-500/50 transition"
                  >
                    <img src={c.flagUrl} alt={c.name} className="w-full h-full object-cover" />
                  </button>
                ) : null
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
