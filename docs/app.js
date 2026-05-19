/* 
  SKYLOG LIVE - Javascript Engine
  Handles Open-Meteo API fetching, DOM updates, audio, and mood contexts.
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

// Open-Meteo Weather Codes map to local modes
function parseWeather(code, isDay) {
    if ([0, 1].includes(code)) return { emoji: "☀️", mood: "clear", label: "Céu limpo" };
    if ([2, 3].includes(code)) return { emoji: "☁️", mood: "clouds", label: "Nublado" };
    if ([45, 48].includes(code)) return { emoji: "🌫️", mood: "clouds", label: "Nevoeiro" };
    if ([51, 53, 55, 56, 57].includes(code)) return { emoji: "🌧️", mood: "rain", label: "Garoa / Chuvisco" };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { emoji: "🌧️", mood: "rain", label: "Chuva" };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { emoji: "❄️", mood: "clear", label: "Neve" };
    if ([95, 96, 99].includes(code)) return { emoji: "⛈️", mood: "storm", label: "Tempestade" };
    return { emoji: "🌤", mood: "clear", label: "Desconhecido" };
}

// Audio management
let audioEnabled = false;
const audioBtn = document.getElementById('playAudioBtn');
const audios = {
    clear: document.getElementById('audio-birds'),
    clouds: document.getElementById('audio-wind'),
    rain: document.getElementById('audio-rain'),
    storm: document.getElementById('audio-storm')
};

audioBtn.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    audioBtn.innerHTML = audioEnabled ? "🔊 Som Ativado" : "🔈 Som Ambiente";
    audioBtn.classList.toggle('text-success', audioEnabled);
    if (!audioEnabled) {
        Object.values(audios).forEach(a => { a.pause(); a.volume = 0; });
    } else {
        updateGlobalMood(); // Re-trigger sounds
    }
});

let currentGlobalMood = 'clear';

function setGlobalMood(mood) {
    if (currentGlobalMood !== mood) {
        document.body.className = `mood-${mood}`;
        currentGlobalMood = mood;
        applyWeatherEffects(mood);
    }

    if (audioEnabled) {
        Object.keys(audios).forEach(k => {
            if (k === mood) {
                audios[k].volume = 0.4;
                audios[k].play().catch(() => console.log("Audio play blocked by browser policies"));
            } else {
                audios[k].pause();
            }
        });
    }
}

function applyWeatherEffects(mood) {
    const pContainer = document.getElementById('particles');
    pContainer.innerHTML = ''; // reset
    if (mood === 'rain' || mood === 'storm') {
        const count = mood === 'storm' ? 80 : 30;
        for (let i = 0; i < count; i++) {
            let drop = document.createElement('div');
            drop.className = 'drop';
            drop.style.left = Math.random() * 100 + 'vw';
            drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
            drop.style.animationDelay = Math.random() * 2 + 's';
            pContainer.appendChild(drop);
        }
    }

    if (mood === 'storm') {
        setInterval(() => {
            if (currentGlobalMood === 'storm' && Math.random() > 0.7) {
                let flash = document.createElement('div');
                flash.className = 'lightning-flash';
                document.body.appendChild(flash);
                setTimeout(() => flash.remove(), 1000);
            }
        }, 3000);
    }
}

// Data Fetching
async function fetchCityWeather(city) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=${encodeURIComponent(city.tz)}`;
        const res = await fetch(url);
        const data = await res.json();
        return { city, weather: data.current };
    } catch (err) {
        console.error(`Failed to fetch ${city.name}`, err);
        return null;
    }
}

function updateDOM(results) {
    const grid = document.getElementById('citiesGrid');
    grid.innerHTML = '';

    let moodCounts = { clear: 0, clouds: 0, rain: 0, storm: 0 };

    results.forEach(res => {
        if (!res) return;
        const { city, weather } = res;
        const info = parseWeather(weather.weather_code, weather.is_day);
        moodCounts[info.mood]++;

        const isNight = weather.is_day === 0;
        const theme = isNight ? 'theme-night' : 'theme-day';

        const cardHTML = `
            <div class="col-12 col-md-6 col-xl-4">
                <div class="city-card ${theme}">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h3 class="city-name">${city.name}</h3>
                            <div class="city-meta mt-1">${city.country} &bull; ${new Date().toLocaleTimeString('en-US', { timeZone: city.tz, hour: '2-digit', minute: '2-digit' })} ${isNight ? '🌙' : '☀️'}</div>
                        </div>
                        <div class="weather-emoji">${info.emoji}</div>
                    </div>
                    
                    <div class="mt-4 d-flex justify-content-between align-items-end">
                        <div>
                            <div class="temp-large">${Math.round(weather.temperature_2m)}°</div>
                            <div class="opacity-75 mt-1 fw-bold">${info.label} (Sens: ${Math.round(weather.apparent_temperature)}°)</div>
                        </div>
                        <div class="text-end opacity-75 small pb-1">
                            <div>💧 ${weather.relative_humidity_2m}% Umi</div>
                            <div>💨 ${Math.round(weather.wind_speed_10m)} km/h</div>
                            <div>☔ ${weather.precipitation.toFixed(1)} mm</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });

    // Compute dominant condition for the entire page background mapping
    let dominantMood = 'clear';
    let max = -1;
    for (const [m, count] of Object.entries(moodCounts)) {
        if (count > max) { max = count; dominantMood = m; }
    }
    setGlobalMood(dominantMood);

    document.getElementById('lastUpdated').innerText = `Ao vivo • ${new Date().toLocaleTimeString()}`;
}

async function cycleUpdate() {
    const promises = CITIES.map(c => fetchCityWeather(c));
    const results = await Promise.all(promises);
    updateDOM(results);
}

function updateGlobalMood() {
    setGlobalMood(currentGlobalMood);
}

// Boot
console.log("SkyLog Live Engine Started");
cycleUpdate();
setInterval(cycleUpdate, 60000); // 60s live loop
