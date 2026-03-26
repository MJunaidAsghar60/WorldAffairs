'use client';

import { useEffect, useRef } from 'react';

interface WorldMapProps {
  highlightCountries?: string[];   // ISO-2 country codes to highlight (e.g. ['US','CN'])
  colorA?: string;                  // colour for first country
  colorB?: string;                  // colour for second country
  height?: number;
}

// We load Leaflet lazily so SSR never touches it.
export default function WorldMap({
  highlightCountries = [],
  colorA = '#6366f1',
  colorB = '#22d3ee',
  height = 320,
}: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    (async () => {
      const L = (await import('leaflet')).default;
      // Fix default marker icon path broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!containerRef.current) return;

      const map = L.map(containerRef.current, {
        center: [20, 0],
        zoom: 1.5,
        scrollWheelZoom: false,
        attributionControl: false,
        zoomControl: false,
      });

      mapRef.current = map;

      // Dark tile layer that matches the site theme
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
        { maxZoom: 6 }
      ).addTo(map);

      // Add subtle attribution
      L.control.attribution({ prefix: false, position: 'bottomright' })
        .addAttribution('© <a href="https://carto.com/">CARTO</a>')
        .addTo(map);

      // Highlight markers for selected countries
      const COUNTRY_COORDS: Record<string, [number, number]> = {
        US: [37.09, -95.71], CN: [35.86, 104.19], RU: [61.52, 105.31],
        IN: [20.59, 78.96], GB: [55.37, -3.43], FR: [46.22, 2.21],
        DE: [51.16, 10.45], JP: [36.20, 138.25], KR: [35.90, 127.76],
        KP: [40.33, 127.51], PK: [30.37, 69.34], IR: [32.42, 53.68],
        IL: [31.04, 34.85], SA: [23.88, 45.07], AE: [23.42, 53.84],
        TR: [38.96, 35.24], BR: [-14.23, -51.92], MX: [23.63, -102.55],
        CA: [56.13, -106.34], AU: [-25.27, 133.77], ZA: [-30.55, 22.93],
        NG: [9.08, 8.67], EG: [26.82, 30.80], ID: [-0.78, 113.92],
        UA: [48.37, 31.16], PL: [51.91, 19.14], SE: [60.12, 18.64],
        NO: [60.47, 8.46], CH: [46.81, 8.22], NL: [52.13, 5.29],
        IT: [41.87, 12.56], ES: [40.46, -3.74], AR: [-38.41, -63.61],
        CO: [4.57, -74.29], CL: [-35.67, -71.54], VE: [6.42, -66.58],
        IQ: [33.22, 43.67], SY: [34.80, 38.99], AF: [33.93, 67.70],
        KZ: [48.01, 66.92], BD: [23.68, 90.35], TH: [15.87, 100.99],
        VN: [14.05, 108.27], PH: [12.87, 121.77], MY: [4.21, 101.97],
        SG: [1.35, 103.81], NZ: [-40.90, 174.88], PT: [39.39, -8.22],
        GR: [39.07, 21.82], HU: [47.16, 19.50],
      };

      highlightCountries.forEach((code, i) => {
        const coords = COUNTRY_COORDS[code.toUpperCase()];
        if (!coords) return;
        const color = i === 0 ? colorA : colorB;

        L.circleMarker(coords, {
          radius: 10,
          fillColor: color,
          fillOpacity: 0.85,
          color: '#fff',
          weight: 2,
        }).addTo(map);
      });
    })();

    return () => {
      if (mapRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapRef.current as any).remove();
        mapRef.current = null;
      }
    };
    // Re-run when highlighted countries change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightCountries.join(',')]);

  return (
    <>
      {/* Leaflet CSS */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={containerRef}
        style={{
          height,
          width: '100%',
          borderRadius: '1rem',
          overflow: 'hidden',
          backgroundColor: '#0d1117',
        }}
      />
    </>
  );
}
