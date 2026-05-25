/* ═══════════════════════════════════════════
   SKYLOG — State Management
   Reactive state with event system
   ═══════════════════════════════════════════ */

import { DEFAULT_CITIES } from './utils.js';

const STORAGE_KEY = 'skylog_cities';
const SELECTED_KEY = 'skylog_selected';

class Store {
    constructor() {
        this._listeners = {};
        this.cities = this._loadCities();
        this.selectedIndex = this._loadSelected();
        this.weatherData = {};
        this.airQualityData = {};
        this.loading = true;
        this.searchResults = [];
        this.searchOpen = false;
    }

    /* ── Event System ── */
    on(event, fn) {
        if (!this._listeners[event]) this._listeners[event] = [];
        this._listeners[event].push(fn);
        return () => { this._listeners[event] = this._listeners[event].filter(f => f !== fn); };
    }

    emit(event, data) {
        (this._listeners[event] || []).forEach(fn => fn(data));
    }

    /* ── City Management ── */
    get selectedCity() {
        return this.cities[this.selectedIndex] || this.cities[0];
    }

    selectCity(index) {
        if (index < 0 || index >= this.cities.length) return;
        this.selectedIndex = index;
        localStorage.setItem(SELECTED_KEY, index);
        this.emit('cityChanged', this.selectedCity);
    }

    addCity(city) {
        const exists = this.cities.find(c =>
            Math.abs(c.lat - city.lat) < 0.01 && Math.abs(c.lon - city.lon) < 0.01
        );
        if (exists) {
            const idx = this.cities.indexOf(exists);
            this.selectCity(idx);
            return;
        }
        this.cities.push(city);
        this._saveCities();
        const newIdx = this.cities.length - 1;
        this.selectCity(newIdx);
        this.emit('citiesUpdated', this.cities);
    }

    removeCity(index) {
        if (this.cities.length <= 1) return;
        this.cities.splice(index, 1);
        this._saveCities();
        if (this.selectedIndex >= this.cities.length) {
            this.selectedIndex = this.cities.length - 1;
        }
        localStorage.setItem(SELECTED_KEY, this.selectedIndex);
        this.emit('citiesUpdated', this.cities);
        this.emit('cityChanged', this.selectedCity);
    }

    /* ── Weather Data ── */
    setWeatherData(city, data) {
        const key = `${city.lat}:${city.lon}`;
        this.weatherData[key] = data;
        this.emit('weatherUpdated', { city, data });
    }

    getWeatherData(city) {
        if (!city) return null;
        return this.weatherData[`${city.lat}:${city.lon}`] || null;
    }

    setAirQuality(city, data) {
        const key = `${city.lat}:${city.lon}`;
        this.airQualityData[key] = data;
        this.emit('aqiUpdated', { city, data });
    }

    getAirQuality(city) {
        if (!city) return null;
        return this.airQualityData[`${city.lat}:${city.lon}`] || null;
    }

    setLoading(val) {
        this.loading = val;
        this.emit('loadingChanged', val);
    }

    /* ── Persistence ── */
    _loadCities() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch { }
        return [...DEFAULT_CITIES];
    }

    _saveCities() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cities));
    }

    _loadSelected() {
        try {
            const idx = parseInt(localStorage.getItem(SELECTED_KEY), 10);
            if (!isNaN(idx) && idx >= 0) return idx;
        } catch { }
        return 0;
    }
}

export const store = new Store();
