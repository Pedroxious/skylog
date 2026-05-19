/* 
  SKYLOG PREMIUM - Intelligent 3D Engine
*/

const CITIES = [
    { id: "sao-paulo", name: "São Paulo", country: "BR", tz: "America/Sao_Paulo", lat: -23.5475, lon: -46.6361 },
    { id: "buenos-aires", name: "Buenos Aires", country: "AR", tz: "America/Argentina/Buenos_Aires", lat: -34.6131, lon: -58.3772 },
    { id: "rio", name: "Rio de Janeiro", country: "BR", tz: "America/Sao_Paulo", lat: -22.9064, lon: -43.1822 },
    { id: "mexico", name: "Mexico City", country: "MX", tz: "America/Mexico_City", lat: 19.4284, lon: -99.1276 },
    { id: "new-york", name: "New York", country: "US", tz: "America/New_York", lat: 40.7142, lon: -74.0059 },
    { id: "san-fran", name: "San Francisco", country: "US", tz: "America/Los_Angeles", lat: 37.7749, lon: -122.4194 },
    { id: "london", name: "London", country: "UK", tz: "Europe/London", lat: 51.5085, lon: -0.1257 },
    { id: "paris", name: "Paris", country: "FR", tz: "Europe/Paris", lat: 48.8534, lon: 2.3488 },
    { id: "tokyo", name: "Tokyo", country: "JP", tz: "Asia/Tokyo", lat: 35.6895, lon: 139.6917 },
    { id: "dubai", name: "Dubai", country: "AE", tz: "Asia/Dubai", lat: 25.2769, lon: 55.2962 },
    { id: "cairo", name: "Cairo", country: "EG", tz: "Africa/Cairo", lat: 30.0626, lon: 31.2496 },
    { id: "sydney", name: "Sydney", country: "AU", tz: "Australia/Sydney", lat: -33.8678, lon: 151.2073 }
];

const BASE_URL_SVG = "https://cdn.jsdelivr.net/gh/basmilius/weather-icons@master/design/fill/animation-ready/";

function parseWeatherPremium(code, isDay) {
    const timeStr = isDay ? "day" : "night";
    if ([0, 1].includes(code)) return { svg: `clear-${timeStr}.svg`, mood: "clear", label: "Céu Limpo", localFx: "none" };
    if ([2].includes(code)) return { svg: `partly-cloudy-${timeStr}.svg`, mood: "clouds", label: "Parcialmente Nublado", localFx: "none" };
    if ([3].includes(code)) return { svg: `cloudy.svg`, mood: "clouds", label: "Nublado", localFx: "none" };
    if ([45, 48].includes(code)) return { svg: `fog-${timeStr}.svg`, mood: "clouds", label: "Nevoeiro", localFx: "none" };
    if ([51, 53, 55, 56, 57].includes(code)) return { svg: `drizzle.svg`, mood: "rain", label: "Garoa", localFx: "rain" };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { svg: `rain.svg`, mood: "rain", label: "Chuva Intensa", localFx: "rain" };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { svg: `snow.svg`, mood: "clear", label: "Neve", localFx: "snow" };
    if ([95, 96, 99].includes(code)) return { svg: `thunderstorms-rain.svg`, mood: "storm", label: "Tempestade com Raios", localFx: "storm" };
    return { svg: `partly-cloudy-${timeStr}.svg`, mood: "clear", label: "Estável", localFx: "none" };
}

// Audio System
let audioEnabled = false;
const audioObj = {
    clear: document.getElementById('audio-birds'),
    clouds: document.getElementById('audio-wind'),
    rain: document.getElementById('audio-rain'),
    storm: document.getElementById('audio-storm')
};
document.getElementById('playAudioBtn').addEventListener('click', (e) => {
    audioEnabled = !audioEnabled;
    e.currentTarget.innerHTML = audioEnabled ? "<span class='icon'>🔊</span> Áudio Atmosférico Em Tempo Real" : "<span class='icon'>🔇</span> Som Ambiente";
    e.currentTarget.classList.toggle('text-info', audioEnabled);
    if (!audioEnabled) Object.values(audioObj).forEach(a => { a.pause(); a.volume = 0; });
    else setGlobalMood(currentGlobalMood);
});

let currentGlobalMood = 'clear';
function setGlobalMood(mood) {
    document.body.className = `global-mood-${mood}`;
    currentGlobalMood = mood;
    if (audioEnabled) {
        Object.keys(audioObj).forEach(k => {
            if (k === mood) {
                audioObj[k].volume = 0.4;
                audioObj[k].play().catch(() => console.log("Audio blocked by browser."));
            } else { audioObj[k].pause(); }
        });
    }
}

// Local Physics Effects
function createLocalEcosystem(container, type) {
    container.innerHTML = '';
    if (type === 'rain' || type === 'storm') {
        const dropCount = type === 'storm' ? 30 : 15;
        for (let i = 0; i < dropCount; i++) {
            let drop = document.createElement('div');
            drop.className = 'local-rain';
            drop.style.left = (Math.random() * 100) + '%';
            drop.style.animationDuration = (Math.random() * 0.3 + 0.4) + 's';
            drop.style.animationDelay = (Math.random() * 1) + 's';
            container.appendChild(drop);
        }
    }
    if (type === 'snow') {
        for (let i = 0; i < 20; i++) {
            let flake = document.createElement('div');
            flake.className = 'local-snow';
            flake.style.left = (Math.random() * 100) + '%';
            flake.style.animationDuration = (Math.random() * 2 + 2) + 's';
            flake.style.animationDelay = (Math.random() * 2) + 's';
            container.appendChild(flake);
        }
    }
    if (type === 'storm') {
        let flash = document.createElement('div');
        flash.className = 'local-storm-flash';
        container.appendChild(flash);
    }
}

async function fetchCityWeather(city) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=${encodeURIComponent(city.tz)}`;
        const res = await fetch(url);
        const data = await res.json();
        return { city, weather: data.current };
    } catch (err) {
        return null; // Silent fail for seamless UX
    }
}

// Live Clock Elements
let liveClocks = [];
function renderClocks() {
    const now = new Date();
    liveClocks.forEach(c => {
        const formatter = new Intl.DateTimeFormat('en-US', { timeZone: c.tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        c.element.innerText = formatter.format(now);
    });
    requestAnimationFrame(renderClocks);
}

function updateDOM(results) {
    const grid = document.getElementById('citiesGrid');

    // First paint or update?
    const isFirstPaint = grid.children.length === 0;

    let moodCounts = { clear: 0, clouds: 0, rain: 0, storm: 0 };
    let newHTML = '';

    results.forEach((res, index) => {
        if (!res) return;
        const { city, weather } = res;
        const info = parseWeatherPremium(weather.weather_code, weather.is_day);
        moodCounts[info.mood]++;

        const isNight = weather.is_day === 0;
        const theme = info.mood === 'storm' ? 'theme-storm' : (isNight ? 'theme-night' : 'theme-day');

        newHTML += `
            <div class="col-12 col-lg-6 col-xl-4">
                <div class="city-card ${theme}" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-glare data-tilt-max-glare="0.3">
                    <div class="local-ecosystem" id="eco-${city.id}"></div>
                    <div class="card-content d-flex justify-content-between">
                        <div class="d-flex flex-column justify-content-between" style="width: 60%">
                            <div>
                                <h3 class="city-name">${city.name}</h3>
                                <div class="city-meta mt-1 opacity-75">${city.country} &bull; <span class="live-clock" id="clock-${city.id}"></span></div>
                            </div>
                            <div class="mt-4">
                                <div class="temp-large">${Math.round(weather.temperature_2m)}°</div>
                                <div class="mt-1 fw-bold fs-6 opacity-75">${info.label} (Sens: ${Math.round(weather.apparent_temperature)}°)</div>
                                <div class="opacity-50 small mt-2 d-flex gap-2">
                                    <span>💧 ${weather.relative_humidity_2m}%</span>
                                    <span>💨 ${Math.round(weather.wind_speed_10m)} km/h</span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-end" style="width: 40%">
                            <img src="${BASE_URL_SVG}${info.svg}" class="weather-icon" alt="${info.label}">
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    if (isFirstPaint) {
        grid.innerHTML = newHTML;
        // Init 3D Physics
        VanillaTilt.init(document.querySelectorAll(".city-card"));
        // Register Live Clocks
        liveClocks = [];
        results.forEach(res => {
            if (res) liveClocks.push({ element: document.getElementById(`clock-${res.city.id}`), tz: res.city.tz });
        });
        requestAnimationFrame(renderClocks);

        // Init Eco Systems
        results.forEach(res => {
            if (res) {
                const info = parseWeatherPremium(res.weather.weather_code, res.weather.is_day);
                createLocalEcosystem(document.getElementById(`eco-${res.city.id}`), info.localFx);
            }
        });
    }

    // Process mood dominance
    let dominantMood = 'clear';
    let max = -1;
    for (const [m, count] of Object.entries(moodCounts)) {
        if (count > max) { max = count; dominantMood = m; }
    }
    setGlobalMood(dominantMood);

    document.getElementById('lastUpdated').innerText = `Sync Ativo (${new Date().toLocaleTimeString()})`;
}

async function startEngine() {
    const promises = CITIES.map(c => fetchCityWeather(c));
    const results = await Promise.all(promises);
    updateDOM(results);
}

// Engage Engine
window.addEventListener('DOMContentLoaded', () => {
    startEngine();
    setInterval(startEngine, 60000); // 60s live loop
});
