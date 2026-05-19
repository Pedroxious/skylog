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
            <div class="col-12 col-md-6 col-xl-4 pb-3">
                <div class="city-card premium-shadow ${theme}">
                    <div class="local-ecosystem" id="eco-${city.id}"></div>
                    
                    <div class="card-content d-flex flex-column h-100">
                        <!-- Top Row: Location & Icon -->
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h3 class="city-name text-truncate mb-0">${city.name}</h3>
                                <div class="city-meta mt-1">
                                    <span class="live-clock badge bg-dark bg-opacity-50 border border-light border-opacity-25" id="clock-${city.id}"></span> 
                                    &bull; ${city.country}
                                </div>
                            </div>
                            <img src="${BASE_URL_SVG}${info.svg}" class="weather-icon flex-shrink-0" alt="${info.label}">
                        </div>

                        <!-- Main Temp -->
                        <div class="d-flex align-items-end gap-3 mb-4 mt-2">
                            <span class="temp-large text-gradient">${Math.round(weather.temperature_2m)}°</span>
                            <div class="d-flex flex-column pb-1">
                                <span class="fw-bold fs-5">${info.label}</span>
                                <span class="opacity-75 small">Sensação térmica de ${Math.round(weather.apparent_temperature)}°</span>
                            </div>
                        </div>

                        <!-- Data Grid Panel -->
                        <div class="data-glass-panel mt-auto">
                            <div class="row g-2 text-center small fw-semibold">
                                <div class="col-4">
                                    <div class="data-box hover-lift">
                                        <div class="opacity-50 text-uppercase mb-1" style="font-size:0.65rem">Umidade</div>
                                        <div class="fs-6">💧 ${weather.relative_humidity_2m}%</div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="data-box hover-lift">
                                        <div class="opacity-50 text-uppercase mb-1" style="font-size:0.65rem">Vento</div>
                                        <div class="fs-6">💨 ${Math.round(weather.wind_speed_10m)} <span class="fs-7 opacity-75">km/h</span></div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="data-box hover-lift">
                                        <div class="opacity-50 text-uppercase mb-1" style="font-size:0.65rem">Precipitação</div>
                                        <div class="fs-6">☔ ${weather.precipitation.toFixed(1)} <span class="fs-7 opacity-75">mm</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    if (isFirstPaint) {
        grid.innerHTML = newHTML;
        // Removed VanillaTilt to fix document scroll bounds blocking

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
