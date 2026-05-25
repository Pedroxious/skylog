/* ═══════════════════════════════════════════
   SKYLOG — Main Application Entry Point
   ═══════════════════════════════════════════ */

import {
    createIcons, Search, CloudRainWind, Thermometer, Wind, Droplets,
    Gauge, Eye, Sun, Cloud, CloudLightning, CloudRain, Snowflake,
    Clock, Calendar, LineChart, BarChart3, Map as MapIcon, Sunrise,
    Sunset, X, ChevronRight, Menu
} from 'lucide';

import { store } from './state.js';
import { fetchWeather, fetchAirQuality, searchCities } from './api.js';
import {
    initBackground, selectBackground, applyBackground
} from './weather-bg.js';
import {
    renderHero, renderHourlyForecast, renderDailyForecast,
    renderMetrics, renderSunInfo, renderAirQuality,
    renderCityList, showSkeletons, hideLoadingOverlay, startClock
} from './ui.js';
import { renderTempChart, renderPrecipChart, renderWindChart, destroyCharts } from './charts.js';
import { initMap, flyToCity } from './map.js';
import { debounce } from './utils.js';

/* ── Global Lucide Initialization ── */
function initIcons() {
    createIcons({
        icons: {
            Search, CloudRainWind, Thermometer, Wind, Droplets,
            Gauge, Eye, Sun, Cloud, CloudLightning, CloudRain, Snowflake,
            Clock, Calendar, LineChart, BarChart3, Map: MapIcon, Sunrise,
            Sunset, X, ChevronRight, Menu
        }
    });
}

/* ── Main App Initialization ── */
async function initApp() {
    console.log('[SKYLOG] Initializing Intelligence Hub...');

    // Set up UI listeners
    initEventListeners();

    // Initialize Weather Background
    initBackground();

    // Initial UI Render
    renderCityList();

    // Start with first city
    await loadCityData(store.selectedCity);

    // Remove Initial Loader
    hideLoadingOverlay();
}

/* ── Data Fetching & UI Update ── */
async function loadCityData(city) {
    if (!city) return;

    store.setLoading(true);
    showSkeletons();

    try {
        // 1. Fetch Data
        const [weather, aqi] = await Promise.all([
            fetchWeather(city.lat, city.lon, city.tz),
            fetchAirQuality(city.lat, city.lon)
        ]);

        if (weather) {
            store.setWeatherData(city, weather);
            store.setAirQuality(city, aqi);

            // 2. Scene Selection
            const bgScene = selectBackground(weather);
            applyBackground(bgScene);

            // 3. Update UI Panels
            renderHero(city, weather);
            renderHourlyForecast(weather.hourly);
            renderDailyForecast(weather.daily);
            renderMetrics(weather.current, weather.hourly, weather.daily);
            renderSunInfo(weather.daily);
            renderAirQuality(aqi);
            renderCityList();

            // 4. Update Charts
            destroyCharts();
            renderTempChart(weather.hourly);
            renderPrecipChart(weather.hourly);
            renderWindChart(weather.current);

            // 5. Update Map
            flyToCity(city.lat, city.lon, city.name);

            // 6. Start Live Clock for City Timezone
            startClock(city.tz);

            // 7. Refresh Icons
            initIcons();
        }
    } catch (err) {
        console.error('[SKYLOG] Load error:', err);
    } finally {
        store.setLoading(false);
    }
}

/* ── Event Listeners ── */
function initEventListeners() {
    // Store Listeners
    store.on('cityChanged', (city) => {
        loadCityData(city);
    });

    store.on('citiesUpdated', () => {
        renderCityList();
    });

    // Search Logic
    const searchInput = document.getElementById('city-search');
    const resultsBox = document.getElementById('search-results');

    if (searchInput && resultsBox) {
        const handleSearch = debounce(async (query) => {
            if (!query) {
                resultsBox.classList.add('hidden');
                return;
            }

            const results = await searchCities(query);
            if (results.length > 0) {
                resultsBox.innerHTML = results.map((r, i) => `
          <div class="search-item p-3 cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-between group" data-idx="${i}">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate">${r.name}</p>
              <p class="text-[10px] text-white/30 truncate">${r.display}</p>
            </div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-white/20 group-hover:text-cyan-400 transition-colors"></i>
          </div>
        `).join('');

                resultsBox.classList.remove('hidden');
                initIcons();

                resultsBox.querySelectorAll('.search-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const city = results[item.dataset.idx];
                        store.addCity(city);
                        searchInput.value = '';
                        resultsBox.classList.add('hidden');
                    });
                });
            } else {
                resultsBox.innerHTML = '<p class="p-4 text-xs text-center text-white/20">No cities found</p>';
                resultsBox.classList.remove('hidden');
            }
        }, 400);

        searchInput.addEventListener('input', (e) => handleSearch(e.target.value));

        // Close search on click outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
                resultsBox.classList.add('hidden');
            }
        });
    }
}

/* ── Global Error Handling ── */
window.addEventListener('unhandledrejection', (event) => {
    console.warn('[SKYLOG] Async error:', event.reason);
});

// Start the engine
window.addEventListener('DOMContentLoaded', () => {
    initIcons();
    initApp();
});
