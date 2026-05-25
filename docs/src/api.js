/* ═══════════════════════════════════════════
   SKYLOG — API Layer
   Open-Meteo, Nominatim, RainViewer, Air Quality
   ═══════════════════════════════════════════ */

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
    const entry = cache.get(key);
    if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data;
    return null;
}

function setCache(key, data) {
    cache.set(key, { data, ts: Date.now() });
}

/* ── Open-Meteo: Full Weather Data ── */
export async function fetchWeather(lat, lon, tz) {
    const key = `weather:${lat}:${lon}`;
    const cached = getCached(key);
    if (cached) return cached;

    const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        timezone: tz || 'auto',
        current: [
            'temperature_2m', 'relative_humidity_2m', 'apparent_temperature',
            'is_day', 'precipitation', 'rain', 'showers', 'snowfall',
            'weather_code', 'cloud_cover', 'pressure_msl', 'surface_pressure',
            'wind_speed_10m', 'wind_direction_10m', 'wind_gusts_10m'
        ].join(','),
        hourly: [
            'temperature_2m', 'relative_humidity_2m', 'dew_point_2m',
            'apparent_temperature', 'precipitation_probability', 'precipitation',
            'weather_code', 'cloud_cover', 'visibility', 'wind_speed_10m',
            'wind_direction_10m', 'uv_index', 'is_day'
        ].join(','),
        daily: [
            'weather_code', 'temperature_2m_max', 'temperature_2m_min',
            'apparent_temperature_max', 'apparent_temperature_min',
            'sunrise', 'sunset', 'uv_index_max', 'precipitation_sum',
            'precipitation_probability_max', 'wind_speed_10m_max',
            'wind_gusts_10m_max'
        ].join(','),
        forecast_days: 7
    });

    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
        if (!res.ok) throw new Error(`Weather API: ${res.status}`);
        const data = await res.json();
        setCache(key, data);
        return data;
    } catch (err) {
        console.error('[API] Weather fetch failed:', err);
        return null;
    }
}

/* ── Open-Meteo: Air Quality ── */
export async function fetchAirQuality(lat, lon) {
    const key = `aqi:${lat}:${lon}`;
    const cached = getCached(key);
    if (cached) return cached;

    const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: [
            'us_aqi', 'pm10', 'pm2_5', 'carbon_monoxide',
            'nitrogen_dioxide', 'sulphur_dioxide', 'ozone'
        ].join(',')
    });

    try {
        const res = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${params}`);
        if (!res.ok) throw new Error(`AQI API: ${res.status}`);
        const data = await res.json();
        setCache(key, data);
        return data;
    } catch (err) {
        console.error('[API] Air quality fetch failed:', err);
        return null;
    }
}

/* ── Nominatim: City Search ── */
export async function searchCities(query) {
    if (!query || query.length < 2) return [];
    const key = `search:${query.toLowerCase()}`;
    const cached = getCached(key);
    if (cached) return cached;

    try {
        const params = new URLSearchParams({
            q: query, format: 'json', limit: 8, addressdetails: 1, 'accept-language': 'en'
        });
        const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
            headers: { 'User-Agent': 'SkylogWeatherDashboard/2.0' }
        });
        if (!res.ok) throw new Error(`Search API: ${res.status}`);
        const results = await res.json();
        const cities = results
            .filter(r => r.type === 'city' || r.type === 'town' || r.type === 'village' ||
                r.type === 'administrative' || r.class === 'place' || r.class === 'boundary')
            .map(r => ({
                name: r.address?.city || r.address?.town || r.address?.village || r.display_name.split(',')[0],
                country: r.address?.country_code?.toUpperCase() || '',
                lat: parseFloat(r.lat),
                lon: parseFloat(r.lon),
                display: r.display_name,
                tz: 'auto'
            }));
        setCache(key, cities);
        return cities;
    } catch (err) {
        console.error('[API] City search failed:', err);
        return [];
    }
}

/* ── RainViewer: Radar Tiles ── */
export async function fetchRadarTimestamps() {
    const key = 'radar:timestamps';
    const cached = getCached(key);
    if (cached) return cached;

    try {
        const res = await fetch('https://api.rainviewer.com/public/weather-maps.json');
        if (!res.ok) throw new Error(`Radar API: ${res.status}`);
        const data = await res.json();
        setCache(key, data);
        return data;
    } catch (err) {
        console.error('[API] Radar timestamps failed:', err);
        return null;
    }
}

/* ── Timezone Detection (reverse geocode) ── */
export async function detectTimezone(lat, lon) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&forecast_days=1&daily=sunrise`);
        const data = await res.json();
        return data.timezone || 'UTC';
    } catch {
        return 'UTC';
    }
}
