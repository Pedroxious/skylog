/* ═══════════════════════════════════════════
   SKYLOG — Interactive Map System
   Leaflet.js + RainViewer Radar
   ═══════════════════════════════════════════ */

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchRadarTimestamps } from './api.js';

let map = null;
let marker = null;
let radarLayers = [];
let radarIndex = 0;
let radarInterval = null;
let radarData = null;

/* ── Dark Map Tile ── */
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTR = '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>';

/* ── Custom Marker Icon ── */
const markerIcon = L.divIcon({
    html: `<div style="
    width: 20px; height: 20px;
    background: radial-gradient(circle, #22d3ee 0%, #3b82f6 100%);
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.8);
    box-shadow: 0 0 20px rgba(34,211,238,0.6), 0 0 40px rgba(34,211,238,0.3);
    animation: mapPulse 2s infinite;
  "></div>`,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

/* ── Initialize Map ── */
export function initMap(lat = -23.55, lon = -46.64) {
    const container = document.getElementById('weather-map');
    if (!container) return;

    // Clear existing
    if (map) {
        map.remove();
        map = null;
    }

    map = L.map(container, {
        center: [lat, lon],
        zoom: 8,
        zoomControl: false,
        attributionControl: false
    });

    L.tileLayer(TILE_URL, {
        attribution: TILE_ATTR,
        maxZoom: 18,
        subdomains: 'abcd'
    }).addTo(map);

    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Add attribution (small)
    L.control.attribution({ position: 'bottomleft', prefix: '' }).addTo(map);

    marker = L.marker([lat, lon], { icon: markerIcon }).addTo(map);

    // Load radar
    loadRadar();

    // Fix rendering after container becomes visible
    setTimeout(() => map.invalidateSize(), 300);
}

/* ── Move Map to City ── */
export function flyToCity(lat, lon, name) {
    if (!map) {
        initMap(lat, lon);
        return;
    }

    map.flyTo([lat, lon], 8, {
        duration: 1.5,
        easeLinearity: 0.25
    });

    if (marker) {
        marker.setLatLng([lat, lon]);
    } else {
        marker = L.marker([lat, lon], { icon: markerIcon }).addTo(map);
    }

    if (name) {
        marker.bindPopup(`
      <div style="
        background: rgba(15,23,42,0.95);
        color: white;
        padding: 8px 14px;
        border-radius: 10px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 13px;
        border: 1px solid rgba(255,255,255,0.1);
        backdrop-filter: blur(10px);
      ">
        <strong>${name}</strong>
      </div>
    `, {
            className: 'skylog-popup',
            closeButton: false
        });
    }

    setTimeout(() => map.invalidateSize(), 300);
}

/* ── RainViewer Radar Overlay ── */
async function loadRadar() {
    if (!map) return;

    try {
        radarData = await fetchRadarTimestamps();
        if (!radarData?.radar?.past) return;

        // Clear old
        radarLayers.forEach(l => map.removeLayer(l));
        radarLayers = [];

        const allFrames = [
            ...radarData.radar.past,
            ...(radarData.radar.nowcast || [])
        ];

        allFrames.forEach((frame, i) => {
            const layer = L.tileLayer(
                `${radarData.host}${frame.path}/256/{z}/{x}/{y}/4/1_1.png`,
                { opacity: 0, zIndex: 300 + i }
            );
            layer.addTo(map);
            radarLayers.push(layer);
        });

        // Start animation
        startRadarAnimation();
    } catch (err) {
        console.warn('[MAP] Radar load failed:', err);
    }
}

function startRadarAnimation() {
    if (radarInterval) clearInterval(radarInterval);
    radarIndex = 0;

    radarInterval = setInterval(() => {
        radarLayers.forEach((l, i) => {
            l.setOpacity(i === radarIndex ? 0.5 : 0);
        });
        radarIndex = (radarIndex + 1) % radarLayers.length;
    }, 800);
}

/* ── Refresh Map Size ── */
export function refreshMap() {
    if (map) {
        setTimeout(() => map.invalidateSize(), 100);
    }
}

/* ── Cleanup ── */
export function destroyMap() {
    if (radarInterval) clearInterval(radarInterval);
    if (map) {
        map.remove();
        map = null;
    }
    marker = null;
    radarLayers = [];
}
