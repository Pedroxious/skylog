/* ═══════════════════════════════════════════
   SKYLOG — Utility Functions
   ═══════════════════════════════════════════ */

export const CONDITIONS_BASE = 'https://raw.githubusercontent.com/Pedroxious/skylog/main/conditions/';

export const DEFAULT_CITIES = [
    { name: 'São Paulo', country: 'BR', lat: -23.5475, lon: -46.6361, tz: 'America/Sao_Paulo' },
    { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060, tz: 'America/New_York' },
    { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278, tz: 'Europe/London' },
    { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo' },
    { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
    { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney' },
    { name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai' },
    { name: 'Buenos Aires', country: 'AR', lat: -34.6037, lon: -58.3816, tz: 'America/Argentina/Buenos_Aires' },
    { name: 'Cairo', country: 'EG', lat: 30.0444, lon: 31.2357, tz: 'Africa/Cairo' },
    { name: 'Mexico City', country: 'MX', lat: 19.4326, lon: -99.1332, tz: 'America/Mexico_City' },
    { name: 'San Francisco', country: 'US', lat: 37.7749, lon: -122.4194, tz: 'America/Los_Angeles' },
    { name: 'Rio de Janeiro', country: 'BR', lat: -22.9068, lon: -43.1729, tz: 'America/Sao_Paulo' }
];

/* ── Weather Code → Description ── */
const WMO_DESCRIPTIONS = {
    0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Rime Fog',
    51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
    56: 'Freezing Drizzle', 57: 'Heavy Freezing Drizzle',
    61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
    66: 'Freezing Rain', 67: 'Heavy Freezing Rain',
    71: 'Light Snow', 73: 'Moderate Snow', 75: 'Heavy Snow', 77: 'Snow Grains',
    80: 'Light Showers', 81: 'Moderate Showers', 82: 'Violent Showers',
    85: 'Light Snow Showers', 86: 'Heavy Snow Showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with Hail', 99: 'Severe Thunderstorm'
};

export function weatherCodeToDesc(code) {
    return WMO_DESCRIPTIONS[code] || 'Unknown';
}

/* ── Weather Code → Icon Name (for Lucide) ── */
export function weatherCodeToIcon(code, isDay) {
    if ([0, 1].includes(code)) return isDay ? 'sun' : 'moon';
    if (code === 2) return isDay ? 'cloud-sun' : 'cloud-moon';
    if (code === 3) return 'cloud';
    if ([45, 48].includes(code)) return 'cloud-fog';
    if ([51, 53, 55, 56, 57].includes(code)) return 'cloud-drizzle';
    if ([61, 63, 80, 81].includes(code)) return 'cloud-rain';
    if ([65, 66, 67, 82].includes(code)) return 'cloud-rain-wind';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snowflake';
    if ([95, 96, 99].includes(code)) return 'cloud-lightning';
    return 'cloud';
}

/* ── Temperature Formatting ── */
export function formatTemp(val, unit = 'C') {
    if (val == null) return '--';
    const rounded = Math.round(val);
    return `${rounded}°${unit === 'F' ? 'F' : ''}`;
}

/* ── Time Formatting ── */
export function formatTime(date, tz) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false
    }).format(date);
}

export function formatTimeShort(isoString) {
    const d = new Date(isoString);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function formatDay(isoString) {
    const d = new Date(isoString);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return 'Today';
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatFullDate(tz) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: tz, weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    }).format(new Date());
}

/* ── Wind Direction ── */
const COMPASS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
export function degToCompass(deg) {
    if (deg == null) return '--';
    const idx = Math.round(deg / 22.5) % 16;
    return COMPASS[idx];
}

/* ── UV Level ── */
export function getUVLevel(uv) {
    if (uv <= 2) return { label: 'Low', color: '#22c55e', bg: 'bg-green-500' };
    if (uv <= 5) return { label: 'Moderate', color: '#eab308', bg: 'bg-yellow-500' };
    if (uv <= 7) return { label: 'High', color: '#f97316', bg: 'bg-orange-500' };
    if (uv <= 10) return { label: 'Very High', color: '#ef4444', bg: 'bg-red-500' };
    return { label: 'Extreme', color: '#a855f7', bg: 'bg-purple-500' };
}

/* ── AQI Level ── */
export function getAQILevel(aqi) {
    if (aqi <= 50) return { label: 'Good', color: '#22c55e', emoji: '🟢' };
    if (aqi <= 100) return { label: 'Moderate', color: '#eab308', emoji: '🟡' };
    if (aqi <= 150) return { label: 'Unhealthy (Sensitive)', color: '#f97316', emoji: '🟠' };
    if (aqi <= 200) return { label: 'Unhealthy', color: '#ef4444', emoji: '🔴' };
    if (aqi <= 300) return { label: 'Very Unhealthy', color: '#a855f7', emoji: '🟣' };
    return { label: 'Hazardous', color: '#7f1d1d', emoji: '⚫' };
}

/* ── Debounce ── */
export function debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

/* ── Visibility Format ── */
export function formatVisibility(meters) {
    if (meters == null) return '--';
    if (meters >= 10000) return `${(meters / 1000).toFixed(0)} km`;
    if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
    return `${meters} m`;
}

/* ── Pressure Trend ── */
export function getPressureTrend(current) {
    if (current > 1020) return { label: 'High', icon: 'arrow-up' };
    if (current < 1000) return { label: 'Low', icon: 'arrow-down' };
    return { label: 'Normal', icon: 'minus' };
}

/* ── Country Code → Flag Emoji ── */
export function countryFlag(code) {
    if (!code || code.length !== 2) return '🌍';
    const codePoints = [...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65);
    return String.fromCodePoint(...codePoints);
}

/* ── Animate Number ── */
export function animateValue(el, start, end, duration = 800) {
    const startTime = performance.now();
    const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * eased;
        el.textContent = Math.round(current);
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

/* ── Sun Position Calculation ── */
export function getSunPosition(sunrise, sunset, now) {
    const sunriseTime = new Date(sunrise).getTime();
    const sunsetTime = new Date(sunset).getTime();
    const nowTime = now.getTime();
    if (nowTime < sunriseTime || nowTime > sunsetTime) return -1;
    return (nowTime - sunriseTime) / (sunsetTime - sunriseTime);
}

/* ── Time Period Detection ── */
export function getTimePeriod(now, sunrise, sunset) {
    const nowMs = now.getTime();
    const sunriseMs = new Date(sunrise).getTime();
    const sunsetMs = new Date(sunset).getTime();
    const THIRTY_MIN = 30 * 60 * 1000;
    const NINETY_MIN = 90 * 60 * 1000;

    if (Math.abs(nowMs - sunriseMs) < THIRTY_MIN) return 'sunrise';
    if (nowMs > sunriseMs && nowMs < sunriseMs + NINETY_MIN) return 'morning';
    if (Math.abs(nowMs - sunsetMs) < THIRTY_MIN) return 'sunset';
    if (nowMs > sunsetMs - THIRTY_MIN && nowMs < sunsetMs + THIRTY_MIN) return 'dusk';
    if (nowMs > sunriseMs && nowMs < sunsetMs) return 'day';
    return 'night';
}

/* ── Lucide Icon Helper ── */
export function icon(name, size = 18, cls = '') {
    return `<i data-lucide="${name}" class="${cls}" style="width:${size}px;height:${size}px;"></i>`;
}
