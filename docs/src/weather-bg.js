/* ═══════════════════════════════════════════
   SKYLOG — Intelligent Weather Background System
   Dynamic scene selection from conditions/ library
   ═══════════════════════════════════════════ */

import { CONDITIONS_BASE, getTimePeriod } from './utils.js';

/* ── Full image catalog (39 images) ── */
const IMAGES = [
    'Arid', 'Blizzard', 'Cyclone', 'DayClear', 'DayCumulonimbus',
    'DayCumulus Formations', 'DayCumulusCloudStreets', 'DayCumulusCongestus',
    'DayFog', 'DayPartialClean', 'DayPartialCloudy', 'DayRain',
    'DuskPartlyCloudy', 'Gusty', 'Heatwave', 'LightSnowfall', 'Mist',
    'Morning', 'NightAurora', 'NightClear', 'NightCloudy',
    'NightFullMoonClear', 'NightMoonClear', 'NightOvercast',
    'NightPartialClean', 'NightPartialCloudy', 'NightRain', 'RainHail',
    'Rainbow', 'SandStorm', 'Storm', 'Sunrise', 'Sunset', 'Tornado',
    'Wildfire', 'Windy', 'drizzle', 'dry', 'frost'
];

/* Preload cache */
const preloaded = new Set();

function getImageUrl(name) {
    return `${CONDITIONS_BASE}${encodeURIComponent(name)}.webp`;
}

function preloadImage(name) {
    if (preloaded.has(name)) return;
    preloaded.add(name);
    const img = new Image();
    img.src = getImageUrl(name);
}

/* ── Preload critical images ── */
export function preloadCriticalImages() {
    ['DayClear', 'NightClear', 'DayPartialCloudy', 'NightCloudy', 'DayRain', 'NightRain', 'Morning', 'Sunset', 'Sunrise'].forEach(preloadImage);
}

/* ══════════════════════════════════════════════════
   INTELLIGENT BACKGROUND SELECTION ALGORITHM
   ══════════════════════════════════════════════════
   Priority cascade:
   1. Extreme weather events (tornado, blizzard, cyclone)
   2. Thunderstorms
   3. Snow conditions
   4. Rain conditions
   5. Fog / Mist
   6. Wind conditions (gusty, windy)
   7. Temperature extremes (heatwave, frost)
   8. Time-of-day specials (sunrise, morning, sunset, dusk)
   9. Cloud cover gradients (day/night variants)
   10. Default clear sky
   ══════════════════════════════════════════════════ */

export function selectBackground(weatherData) {
    if (!weatherData?.current) return 'DayClear';

    const c = weatherData.current;
    const code = c.weather_code;
    const temp = c.temperature_2m;
    const wind = c.wind_speed_10m;
    const gusts = c.wind_gusts_10m || wind;
    const cloudCover = c.cloud_cover ?? 0;
    const precipitation = c.precipitation ?? 0;
    const isDay = c.is_day === 1;

    // Get sunrise/sunset for time period detection
    const daily = weatherData.daily;
    const sunrise = daily?.sunrise?.[0] || null;
    const sunset = daily?.sunset?.[0] || null;
    const now = new Date();
    const period = sunrise && sunset ? getTimePeriod(now, sunrise, sunset) : (isDay ? 'day' : 'night');

    // ─── 1. Extreme Events ───
    if (code === 99 || code === 96) {
        if (precipitation > 5) return 'RainHail';
        return 'Storm';
    }

    // ─── 2. Thunderstorms ───
    if (code === 95) return 'Storm';

    // ─── 3. Snow Conditions ───
    if ([75, 86].includes(code)) {
        if (wind > 50) return 'Blizzard';
        return 'LightSnowfall';
    }
    if ([71, 73, 77, 85].includes(code)) return 'LightSnowfall';

    // ─── 4. Rain Conditions ───
    if ([65, 66, 67, 82].includes(code)) {
        return isDay ? 'DayRain' : 'NightRain';
    }
    if ([61, 63, 80, 81].includes(code)) {
        return isDay ? 'DayRain' : 'NightRain';
    }
    if ([51, 53, 55, 56, 57].includes(code)) {
        return 'drizzle';
    }

    // ─── 5. Fog / Mist ───
    if ([45, 48].includes(code)) {
        if (isDay) return 'DayFog';
        return 'Mist';
    }

    // ─── 6. Wind Conditions ───
    if (gusts > 70 || wind > 60) return 'Gusty';
    if (wind > 40) return 'Windy';

    // ─── 7. Temperature Extremes ───
    if (temp > 38 && cloudCover < 30) return 'Heatwave';
    if (temp < -5) return 'frost';
    if (temp < 0 && precipitation === 0) return 'frost';
    if (temp > 35 && cloudCover < 20 && precipitation === 0) return 'Arid';

    // ─── 8. Time-of-Day Specials ───
    if (period === 'sunrise') return 'Sunrise';
    if (period === 'morning') return 'Morning';
    if (period === 'sunset') return 'Sunset';
    if (period === 'dusk') {
        if (cloudCover > 30) return 'DuskPartlyCloudy';
        return 'Sunset';
    }

    // ─── 9. Cloud Cover Gradients ───
    if (isDay || period === 'day') {
        if (code === 3 || cloudCover > 85) return 'DayCumulonimbus';
        if (cloudCover > 70) return 'DayCumulus Formations';
        if (cloudCover > 55) return 'DayCumulusCongestus';
        if (cloudCover > 40) return 'DayCumulusCloudStreets';
        if (cloudCover > 25) return 'DayPartialCloudy';
        if (cloudCover > 10) return 'DayPartialClean';
        return 'DayClear';
    }

    // Night cloud gradients
    if (code === 3 || cloudCover > 85) return 'NightOvercast';
    if (cloudCover > 60) return 'NightCloudy';
    if (cloudCover > 30) return 'NightPartialCloudy';
    if (cloudCover > 10) return 'NightPartialClean';

    // Clear night variants
    const dayOfMonth = now.getDate();
    if (dayOfMonth >= 13 && dayOfMonth <= 17) return 'NightFullMoonClear';
    if (cloudCover < 5) return 'NightMoonClear';
    return 'NightClear';
}

/* ── Background Transition Manager ── */
let currentBg = null;
let activeTimeout = null;
let activeImage = null;

export function applyBackground(imageName) {
    if (imageName === currentBg) return;

    const url = getImageUrl(imageName);
    const bgCurrent = document.getElementById('bg-current');
    const bgNext = document.getElementById('bg-next');
    if (!bgCurrent || !bgNext) return;

    // Cancel any pending load or transition timeout
    if (activeImage) {
        activeImage.onload = null;
        activeImage.onerror = null;
    }
    if (activeTimeout) {
        clearTimeout(activeTimeout);
    }

    const img = new Image();
    activeImage = img;

    img.onload = () => {
        if (activeImage !== img) return;

        // Set the next image source and animate the crossfade
        bgNext.src = url;
        bgNext.style.opacity = '1';
        bgCurrent.style.opacity = '0';

        activeTimeout = setTimeout(() => {
            // Swap the active image to bgCurrent instantly after transition ends
            bgCurrent.src = url;
            bgCurrent.style.opacity = '1';
            bgNext.style.opacity = '0';
            bgNext.src = '';
            
            currentBg = imageName;
            activeTimeout = null;
            activeImage = null;
        }, 750); // Matches the CSS transition duration perfectly
    };

    img.onerror = () => {
        if (activeImage !== img) return;
        activeImage = null;
        console.warn(`[BG] Failed to load: ${imageName}`);
    };

    img.src = url;
}

/* ── Initialize with default ── */
export function initBackground() {
    const bgCurrent = document.getElementById('bg-current');
    if (bgCurrent) {
        const defaultUrl = getImageUrl('DayClear');
        bgCurrent.src = defaultUrl;
        currentBg = 'DayClear';
    }
    preloadCriticalImages();
}
