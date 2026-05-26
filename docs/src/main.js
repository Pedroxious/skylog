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
    renderCityList, showSkeletons, hideLoadingOverlay, startClock,
    renderWeatherCard
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

    // Fetch all other cities in the background for instant navigation & display temperatures
    prefetchAllCities();
}

/* ── Background Pre-fetcher ── */
async function prefetchAllCities() {
    console.log('[SKYLOG] Starting background sensor pre-fetch...');
    const otherCities = store.cities.filter(c => c !== store.selectedCity);
    
    const prefetchPromises = otherCities.map(async (city) => {
        try {
            const [weather, aqi] = await Promise.all([
                fetchWeather(city.lat, city.lon, city.tz),
                fetchAirQuality(city.lat, city.lon)
            ]);
            if (weather) {
                store.setWeatherData(city, weather);
                store.setAirQuality(city, aqi);
            }
        } catch (err) {
            console.error(`[SKYLOG] Pre-fetch failed for ${city.name}:`, err);
        }
    });

    await Promise.all(prefetchPromises);
    console.log('[SKYLOG] All sensors synced and cached!');
    
    // Refresh city list once all are pre-fetched so temperatures and descriptions load
    renderCityList();
}

/* ── Premium Transition Animator ── */
function triggerEntranceAnimations() {
    const targets = document.querySelectorAll(
        'main .glass-card, #hero-section, #metrics-grid > div'
    );
    targets.forEach(el => {
        el.classList.remove('animate-fade-in-up');
        void el.offsetWidth; // Force CSS reflow to restart keyframe animation
        el.classList.add('animate-fade-in-up');
    });
}

/* ── Data Fetching & UI Update ── */
async function loadCityData(city) {
    if (!city) return;

    // Check if weather and AQI data is already in cache/store for instant render
    const cachedWeather = store.getWeatherData(city);
    const cachedAqi = store.getAirQuality(city);

    if (cachedWeather && cachedAqi) {
        try {
            // 1. Scene Selection
            const bgScene = selectBackground(cachedWeather);
            applyBackground(bgScene);

            // 2. Update UI Panels
            renderHero(city, cachedWeather);
            renderHourlyForecast(cachedWeather.hourly);
            renderDailyForecast(cachedWeather.daily);
            renderMetrics(cachedWeather.current, cachedWeather.hourly, cachedWeather.daily);
            renderSunInfo(cachedWeather.daily);
            renderAirQuality(cachedAqi);
            renderWeatherCard(city);
            renderCityList();

            // 3. Update Charts
            destroyCharts();
            renderTempChart(cachedWeather.hourly);
            renderPrecipChart(cachedWeather.hourly);
            renderWindChart(cachedWeather.current);

            // 4. Update Map
            flyToCity(city.lat, city.lon, city.name);

            // 5. Start Live Clock for City Timezone
            startClock(city.tz);

            // 6. Refresh Icons
            initIcons();

            // 7. Trigger premium synchronized fadeInUp animations
            triggerEntranceAnimations();
        } catch (err) {
            console.error('[SKYLOG] Instant load error:', err);
        }
        return;
    }

    // Fallback: If not cached, fetch fresh
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
            renderWeatherCard(city);
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

            // 8. Trigger premium synchronized fadeInUp animations
            triggerEntranceAnimations();
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
