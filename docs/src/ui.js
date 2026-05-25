/* ═══════════════════════════════════════════
   SKYLOG — UI Rendering Engine
   All dashboard DOM rendering + interactions
   ═══════════════════════════════════════════ */

import { store } from './state.js';
import {
    weatherCodeToDesc, weatherCodeToIcon, formatTemp, formatTime,
    formatTimeShort, formatDay, formatFullDate, degToCompass,
    getUVLevel, getAQILevel, formatVisibility, getPressureTrend,
    countryFlag, icon, getSunPosition
} from './utils.js';

/* ═══════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════ */
export function renderHero(city, weather) {
    const el = document.getElementById('hero-section');
    if (!el || !weather?.current) return;

    const c = weather.current;
    const daily = weather.daily;
    const sunrise = daily?.sunrise?.[0] || '';
    const sunset = daily?.sunset?.[0] || '';
    const isDay = c.is_day === 1;

    el.innerHTML = `
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
      <!-- Left: City & Temp -->
      <div class="space-y-4 flex-1 min-w-0">
        <div class="flex items-center gap-3 flex-wrap">
          <h2 class="text-3xl lg:text-5xl font-bold tracking-tight truncate">${city.name}</h2>
          <span class="text-2xl">${countryFlag(city.country)}</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase
            ${isDay ? 'bg-amber-500/20 text-amber-300 border border-amber-400/20' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/20'}">
            ${isDay ? 'Daytime' : 'Nighttime'}
          </span>
        </div>

        <p class="text-sm text-white/40 font-medium">${formatFullDate(city.tz || 'UTC')}</p>

        <div class="flex items-end gap-4">
          <span class="text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-br from-white via-white/90 to-white/60 bg-clip-text text-transparent leading-none">
            ${Math.round(c.temperature_2m)}°
          </span>
          <div class="pb-2 space-y-1">
            <p class="text-lg font-semibold text-white/90">${weatherCodeToDesc(c.weather_code)}</p>
            <p class="text-sm text-white/50">
              ${icon('thermometer', 14, 'inline-block align-middle mr-1')}
              Feels like ${formatTemp(c.apparent_temperature)}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-6 text-sm text-white/50 flex-wrap">
          <span class="flex items-center gap-1.5">
            ${icon('droplets', 14)} ${c.relative_humidity_2m}%
          </span>
          <span class="flex items-center gap-1.5">
            ${icon('wind', 14)} ${Math.round(c.wind_speed_10m)} km/h ${degToCompass(c.wind_direction_10m)}
          </span>
          <span class="flex items-center gap-1.5">
            ${icon('gauge', 14)} ${c.pressure_msl?.toFixed(0) || '--'} hPa
          </span>
          <span class="flex items-center gap-1.5">
            ${icon('cloud', 14)} ${c.cloud_cover}%
          </span>
        </div>
      </div>

      <!-- Right: Sun Info + Live Clock -->
      <div class="flex flex-col items-end gap-4">
        <div class="text-right">
          <div class="text-5xl font-mono font-bold text-white/90 tracking-tight" id="hero-clock">
            ${formatTime(new Date(), city.tz || 'UTC')}
          </div>
          <p class="text-xs text-white/30 mt-1 font-medium">${city.tz || 'UTC'}</p>
        </div>

        <div class="flex gap-4 text-sm">
          <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-400/10">
            ${icon('sunrise', 16, 'text-amber-400')}
            <span class="text-amber-300 font-medium">${sunrise ? formatTimeShort(sunrise) : '--:--'}</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-400/10">
            ${icon('sunset', 16, 'text-blue-400')}
            <span class="text-blue-300 font-medium">${sunset ? formatTimeShort(sunset) : '--:--'}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════
   HOURLY FORECAST
   ═══════════════════════════════════ */
export function renderHourlyForecast(hourly) {
    const container = document.getElementById('hourly-container');
    if (!container || !hourly?.time) return;

    let html = '';
    const count = Math.min(24, hourly.time.length);

    for (let i = 0; i < count; i++) {
        const t = new Date(hourly.time[i]);
        const hour = t.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false });
        const temp = Math.round(hourly.temperature_2m?.[i] ?? 0);
        const code = hourly.weather_code?.[i] ?? 0;
        const isDay = hourly.is_day?.[i] === 1;
        const precip = hourly.precipitation_probability?.[i] ?? 0;
        const iconName = weatherCodeToIcon(code, isDay);

        html += `
      <div class="flex-shrink-0 flex flex-col items-center gap-2 py-3 px-3 rounded-xl
        bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] transition-all duration-300
        min-w-[72px] cursor-default group">
        <span class="text-xs text-white/40 font-medium">${hour}</span>
        <div class="w-7 h-7 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
          ${icon(iconName, 22)}
        </div>
        <span class="text-sm font-bold">${temp}°</span>
        ${precip > 0 ? `<span class="text-[10px] text-cyan-400/70">${precip}%</span>` : ''}
      </div>
    `;
    }

    container.innerHTML = html;
}

/* ═══════════════════════════════════
   METRICS GRID
   ═══════════════════════════════════ */
export function renderMetrics(current, hourly, daily) {
    const grid = document.getElementById('metrics-grid');
    if (!grid || !current) return;

    const uvIdx = hourly?.uv_index?.[0] ?? 0;
    const uvLevel = getUVLevel(uvIdx);
    const visibility = hourly?.visibility?.[0];
    const dewPoint = hourly?.dew_point_2m?.[0];
    const pressure = current.pressure_msl;
    const pTrend = getPressureTrend(pressure);

    const metrics = [
        {
            label: 'Wind Speed', value: `${Math.round(current.wind_speed_10m)}`,
            unit: 'km/h', sub: `Gusts ${Math.round(current.wind_gusts_10m || 0)} km/h · ${degToCompass(current.wind_direction_10m)}`,
            iconName: 'wind', color: 'cyan'
        },
        {
            label: 'Humidity', value: `${current.relative_humidity_2m}`,
            unit: '%', sub: dewPoint != null ? `Dew point ${Math.round(dewPoint)}°` : '',
            iconName: 'droplets', color: 'blue'
        },
        {
            label: 'UV Index', value: `${Math.round(uvIdx)}`,
            unit: '', sub: uvLevel.label,
            iconName: 'sun', color: 'amber',
            badge: { text: uvLevel.label, bg: uvLevel.bg }
        },
        {
            label: 'Pressure', value: `${pressure?.toFixed(0) || '--'}`,
            unit: 'hPa', sub: `${pTrend.label} pressure`,
            iconName: 'gauge', color: 'purple'
        },
        {
            label: 'Visibility', value: formatVisibility(visibility),
            unit: '', sub: visibility > 10000 ? 'Crystal clear' : visibility > 5000 ? 'Good' : 'Reduced',
            iconName: 'eye', color: 'emerald'
        },
        {
            label: 'Cloud Cover', value: `${current.cloud_cover}`,
            unit: '%', sub: current.cloud_cover > 80 ? 'Overcast' : current.cloud_cover > 50 ? 'Mostly cloudy' : current.cloud_cover > 20 ? 'Partly cloudy' : 'Clear skies',
            iconName: 'cloud', color: 'slate'
        },
        {
            label: 'Precipitation', value: `${(current.precipitation || 0).toFixed(1)}`,
            unit: 'mm', sub: current.rain > 0 ? 'Rain' : current.snowfall > 0 ? 'Snow' : 'None',
            iconName: 'cloud-rain', color: 'sky'
        },
        {
            label: 'Feels Like', value: `${Math.round(current.apparent_temperature)}`,
            unit: '°', sub: current.apparent_temperature < current.temperature_2m ? 'Feels cooler' : current.apparent_temperature > current.temperature_2m ? 'Feels warmer' : 'Accurate',
            iconName: 'thermometer', color: 'rose'
        }
    ];

    grid.innerHTML = metrics.map(m => `
    <div class="group relative overflow-hidden rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.07]
      p-4 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-8 h-8 rounded-lg bg-${m.color}-500/10 flex items-center justify-center text-${m.color}-400">
          ${icon(m.iconName, 16)}
        </div>
        <span class="text-xs font-semibold text-white/40 uppercase tracking-wider">${m.label}</span>
      </div>
      <div class="flex items-baseline gap-1">
        <span class="text-2xl font-bold text-white">${m.value}</span>
        <span class="text-sm text-white/40">${m.unit}</span>
      </div>
      ${m.sub ? `<p class="text-xs text-white/30 mt-1.5">${m.sub}</p>` : ''}
      <div class="absolute inset-0 bg-gradient-to-t from-${m.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════
   7-DAY FORECAST
   ═══════════════════════════════════ */
export function renderDailyForecast(daily) {
    const container = document.getElementById('daily-forecast');
    if (!container || !daily?.time) return;

    let html = '';
    const count = Math.min(7, daily.time.length);

    for (let i = 0; i < count; i++) {
        const code = daily.weather_code?.[i] ?? 0;
        const high = Math.round(daily.temperature_2m_max?.[i] ?? 0);
        const low = Math.round(daily.temperature_2m_min?.[i] ?? 0);
        const precip = daily.precipitation_probability_max?.[i] ?? 0;
        const iconName = weatherCodeToIcon(code, true);
        const day = formatDay(daily.time[i]);

        html += `
      <div class="flex items-center justify-between py-3 px-4 rounded-xl
        bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/[0.06]
        transition-all duration-300 group">

        <div class="flex items-center gap-3 min-w-[130px]">
          <div class="w-8 h-8 flex items-center justify-center text-white/60 group-hover:text-white transition-colors">
            ${icon(iconName, 22)}
          </div>
          <div>
            <p class="text-sm font-semibold ${i === 0 ? 'text-cyan-300' : 'text-white/90'}">${day}</p>
            <p class="text-xs text-white/30">${weatherCodeToDesc(code)}</p>
          </div>
        </div>

        ${precip > 0 ? `
          <div class="flex items-center gap-1 text-xs text-cyan-400/60">
            ${icon('droplets', 12)} ${precip}%
          </div>
        ` : '<div></div>'}

        <div class="flex items-center gap-3 min-w-[100px] justify-end">
          <span class="text-sm font-bold text-white">${high}°</span>
          <div class="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r from-blue-400 to-amber-400"
              style="width: ${Math.max(10, ((high - low) / 30) * 100)}%; margin-left: ${Math.max(0, (low + 10) / 50 * 100)}%">
            </div>
          </div>
          <span class="text-sm text-white/40">${low}°</span>
        </div>
      </div>
    `;
    }

    container.innerHTML = html;
}

/* ═══════════════════════════════════
   SUNRISE / SUNSET ARC
   ═══════════════════════════════════ */
export function renderSunInfo(daily) {
    const container = document.getElementById('sun-container');
    if (!container || !daily?.sunrise) return;

    const sunrise = daily.sunrise[0];
    const sunset = daily.sunset[0];
    if (!sunrise || !sunset) return;

    const now = new Date();
    const pos = getSunPosition(sunrise, sunset, now);
    const isDaytime = pos >= 0 && pos <= 1;

    const sunriseStr = formatTimeShort(sunrise);
    const sunsetStr = formatTimeShort(sunset);

    const totalDayMs = new Date(sunset) - new Date(sunrise);
    const dayHours = Math.floor(totalDayMs / 3600000);
    const dayMins = Math.floor((totalDayMs % 3600000) / 60000);

    container.innerHTML = `
    <div class="relative">
      <!-- Sun Arc SVG -->
      <svg viewBox="0 0 200 110" class="w-full max-w-[280px] mx-auto" xmlns="http://www.w3.org/2000/svg">
        <!-- Arc track -->
        <path d="M 20 95 Q 100 5 180 95" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" stroke-linecap="round"/>
        <!-- Daylight portion -->
        ${isDaytime ? `
          <path d="M 20 95 Q 100 5 180 95" fill="none" stroke="url(#sunGrad)" stroke-width="2.5" stroke-linecap="round"
            stroke-dasharray="${pos * 240}" stroke-dashoffset="0"/>
          <!-- Sun dot -->
          <circle cx="${20 + pos * 160}" cy="${95 - Math.sin(pos * Math.PI) * 80}" r="6" fill="#fbbf24"
            filter="url(#sunGlow)"/>
        ` : `
          <circle cx="100" cy="100" r="4" fill="rgba(255,255,255,0.2)"/>
        `}
        <!-- Horizon line -->
        <line x1="10" y1="96" x2="190" y2="96" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="4 4"/>

        <defs>
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#ef4444"/>
          </linearGradient>
          <filter id="sunGlow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
      </svg>

      <!-- Labels -->
      <div class="flex justify-between mt-2 px-2">
        <div class="text-center">
          <div class="flex items-center gap-1 text-amber-400">
            ${icon('sunrise', 14)}
            <span class="text-sm font-semibold">${sunriseStr}</span>
          </div>
          <p class="text-[10px] text-white/30">Sunrise</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-white/40">${dayHours}h ${dayMins}m daylight</p>
        </div>
        <div class="text-center">
          <div class="flex items-center gap-1 text-orange-400">
            ${icon('sunset', 14)}
            <span class="text-sm font-semibold">${sunsetStr}</span>
          </div>
          <p class="text-[10px] text-white/30">Sunset</p>
        </div>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════
   AIR QUALITY
   ═══════════════════════════════════ */
export function renderAirQuality(aqiData) {
    const container = document.getElementById('aqi-container');
    if (!container) return;

    if (!aqiData?.current) {
        container.innerHTML = `
      <div class="text-center py-4">
        <p class="text-white/30 text-sm">Air quality data unavailable</p>
        <p class="text-white/20 text-xs mt-1">Service may be temporarily offline</p>
      </div>
    `;
        return;
    }

    const aqi = aqiData.current.us_aqi ?? 0;
    const level = getAQILevel(aqi);

    const pollutants = [
        { name: 'PM2.5', val: aqiData.current.pm2_5, unit: 'μg/m³' },
        { name: 'PM10', val: aqiData.current.pm10, unit: 'μg/m³' },
        { name: 'O₃', val: aqiData.current.ozone, unit: 'μg/m³' },
        { name: 'NO₂', val: aqiData.current.nitrogen_dioxide, unit: 'μg/m³' },
        { name: 'SO₂', val: aqiData.current.sulphur_dioxide, unit: 'μg/m³' },
        { name: 'CO', val: aqiData.current.carbon_monoxide, unit: 'μg/m³' }
    ].filter(p => p.val != null);

    container.innerHTML = `
    <div class="flex items-center gap-4 mb-4">
      <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
        style="background: ${level.color}22; color: ${level.color}; border: 1px solid ${level.color}33;">
        ${aqi}
      </div>
      <div>
        <p class="font-semibold text-white/90">${level.label}</p>
        <p class="text-xs text-white/40">US AQI Index</p>
      </div>
    </div>

    <!-- AQI Bar -->
    <div class="w-full h-2 rounded-full bg-white/5 overflow-hidden mb-4">
      <div class="h-full rounded-full transition-all duration-1000"
        style="width: ${Math.min(100, (aqi / 300) * 100)}%;
        background: linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444, #a855f7);">
      </div>
    </div>

    <!-- Pollutants -->
    <div class="grid grid-cols-3 gap-2">
      ${pollutants.map(p => `
        <div class="text-center py-2 px-1 rounded-lg bg-white/[0.03] border border-white/5">
          <p class="text-[10px] text-white/30 uppercase">${p.name}</p>
          <p class="text-sm font-semibold text-white/80">${p.val?.toFixed(1)}</p>
        </div>
      `).join('')}
    </div>
  `;
}

/* ═══════════════════════════════════
   CITY SIDEBAR
   ═══════════════════════════════════ */
export function renderCityList() {
    const list = document.getElementById('city-list');
    if (!list) return;

    const cities = store.cities;
    const selectedIdx = store.selectedIndex;

    list.innerHTML = cities.map((city, i) => {
        const weather = store.getWeatherData(city);
        const c = weather?.current;
        const isSelected = i === selectedIdx;

        return `
      <div class="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300
        ${isSelected
                ? 'bg-white/[0.1] border border-cyan-400/20 shadow-lg shadow-cyan-500/5'
                : 'bg-white/[0.03] border border-transparent hover:bg-white/[0.06] hover:border-white/[0.06]'
            }"
        data-city-index="${i}">

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="text-sm">${countryFlag(city.country)}</span>
            <p class="text-sm font-semibold truncate ${isSelected ? 'text-cyan-300' : 'text-white/80'}">${city.name}</p>
          </div>
          ${c ? `
            <p class="text-xs text-white/30 mt-0.5">${weatherCodeToDesc(c.weather_code)}</p>
          ` : ''}
        </div>

        ${c ? `
          <span class="text-lg font-bold ${isSelected ? 'text-white' : 'text-white/70'}">${Math.round(c.temperature_2m)}°</span>
        ` : `
          <div class="w-8 h-5 rounded bg-white/5 animate-pulse"></div>
        `}

        ${cities.length > 1 ? `
          <button class="opacity-0 group-hover:opacity-100 hover:!opacity-100 p-1 rounded-lg hover:bg-red-500/20 transition-all text-white/20 hover:text-red-400 remove-city"
            data-remove-index="${i}" title="Remove city">
            ${icon('x', 12)}
          </button>
        ` : ''}
      </div>
    `;
    }).join('');

    // Event listeners
    list.querySelectorAll('[data-city-index]').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.closest('.remove-city')) return;
            store.selectCity(parseInt(el.dataset.cityIndex));
        });
    });

    list.querySelectorAll('.remove-city').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            store.removeCity(parseInt(btn.dataset.removeIndex));
        });
    });
}

/* ═══════════════════════════════════
   LOADING SKELETONS
   ═══════════════════════════════════ */
export function showSkeletons() {
    // Hero skeleton
    const hero = document.getElementById('hero-section');
    if (hero) {
        hero.innerHTML = `
      <div class="animate-pulse space-y-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-48 bg-white/5 rounded-lg"></div>
          <div class="h-6 w-16 bg-white/5 rounded-full"></div>
        </div>
        <div class="h-4 w-32 bg-white/5 rounded"></div>
        <div class="flex items-end gap-4">
          <div class="h-24 w-32 bg-white/5 rounded-lg"></div>
          <div class="space-y-2 pb-2">
            <div class="h-5 w-40 bg-white/5 rounded"></div>
            <div class="h-4 w-28 bg-white/5 rounded"></div>
          </div>
        </div>
      </div>
    `;
    }

    // Hourly skeleton
    const hourly = document.getElementById('hourly-container');
    if (hourly) {
        hourly.innerHTML = Array(8).fill('').map(() => `
      <div class="flex-shrink-0 flex flex-col items-center gap-2 py-3 px-4 rounded-xl bg-white/[0.03] min-w-[72px] animate-pulse">
        <div class="h-3 w-8 bg-white/5 rounded"></div>
        <div class="h-7 w-7 bg-white/5 rounded-full"></div>
        <div class="h-4 w-6 bg-white/5 rounded"></div>
      </div>
    `).join('');
    }

    // Metrics skeleton
    const metrics = document.getElementById('metrics-grid');
    if (metrics) {
        metrics.innerHTML = Array(8).fill('').map(() => `
      <div class="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-4 animate-pulse">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-8 h-8 rounded-lg bg-white/5"></div>
          <div class="h-3 w-16 bg-white/5 rounded"></div>
        </div>
        <div class="h-7 w-14 bg-white/5 rounded mb-1"></div>
        <div class="h-3 w-20 bg-white/5 rounded"></div>
      </div>
    `).join('');
    }

    // Daily skeleton
    const daily = document.getElementById('daily-forecast');
    if (daily) {
        daily.innerHTML = Array(7).fill('').map(() => `
      <div class="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] animate-pulse">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-white/5 rounded-full"></div>
          <div class="space-y-1"><div class="h-4 w-20 bg-white/5 rounded"></div><div class="h-3 w-16 bg-white/5 rounded"></div></div>
        </div>
        <div class="h-4 w-24 bg-white/5 rounded"></div>
      </div>
    `).join('');
    }
}

/* ═══════════════════════════════════
   LIVE CLOCK UPDATE
   ═══════════════════════════════════ */
let clockRAF = null;
export function startClock(tz) {
    if (clockRAF) cancelAnimationFrame(clockRAF);
    const update = () => {
        const el = document.getElementById('hero-clock');
        if (el) el.textContent = formatTime(new Date(), tz || 'UTC');
        clockRAF = requestAnimationFrame(update);
    };
    update();
}

/* ═══════════════════════════════════
   LOADING OVERLAY
   ═══════════════════════════════════ */
export function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 600);
    }
}
