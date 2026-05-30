#!/usr/bin/env python3
"""
SkyLog — Automated Weather Dashboard Generator
Fetches real-time weather data for 15 global cities, generates animated SVG cards,
updates CSV history, and builds a visual README dashboard.
"""

import requests
import csv
import os
import math
import urllib.parse
from datetime import datetime, timezone, timedelta

# ============================================================
# Try to import pytz; fall back to manual UTC offsets if missing
# ============================================================
try:
    import pytz
    HAS_PYTZ = True
except ImportError:
    HAS_PYTZ = False

# ============================================================
# CITY DATA — 15 cities across global regions
# ============================================================
CIDADES = [
    {"nome": "São Paulo",      "pais": "Brasil",          "continente": "América do Sul",   "lat": -23.5505, "lon": -46.6333, "tz": "America/Sao_Paulo",              "slug": "sao_paulo",      "landmark": "SaoPaulo.webp",      "utc_offset": -3},
    {"nome": "Rio de Janeiro",  "pais": "Brasil",          "continente": "América do Sul",   "lat": -22.9068, "lon": -43.1729, "tz": "America/Sao_Paulo",              "slug": "rio_de_janeiro", "landmark": "RiodeJaneiro.webp",  "utc_offset": -3},
    {"nome": "Buenos Aires",   "pais": "Argentina",       "continente": "América do Sul",   "lat": -34.6037, "lon": -58.3816, "tz": "America/Argentina/Buenos_Aires", "slug": "buenos_aires",   "landmark": "Argentina.webp",     "utc_offset": -3},
    {"nome": "Mexico City",    "pais": "México",          "continente": "América Central",  "lat":  19.4326, "lon": -99.1332, "tz": "America/Mexico_City",            "slug": "mexico_city",    "landmark": "Mexico.webp",        "utc_offset": -6},
    {"nome": "Havana",         "pais": "Cuba",            "continente": "América Central",  "lat":  23.1136, "lon": -82.3666, "tz": "America/Havana",                 "slug": "havana",         "landmark": "Havana.webp",        "utc_offset": -4},
    {"nome": "Miami",          "pais": "EUA",             "continente": "América do Norte", "lat":  25.7617, "lon": -80.1918, "tz": "America/New_York",               "slug": "miami",          "landmark": "Miami.webp",         "utc_offset": -4},
    {"nome": "New York",       "pais": "EUA",             "continente": "América do Norte", "lat":  40.7128, "lon": -74.0060, "tz": "America/New_York",               "slug": "new_york",       "landmark": "NewYork.webp",       "utc_offset": -4},

    {"nome": "London",         "pais": "Reino Unido",     "continente": "Europa",           "lat":  51.5074, "lon":  -0.1278, "tz": "Europe/London",                  "slug": "london",         "landmark": "London.webp",        "utc_offset": 1},
    {"nome": "Paris",          "pais": "França",          "continente": "Europa",           "lat":  48.8566, "lon":   2.3522, "tz": "Europe/Paris",                   "slug": "paris",          "landmark": "Paris.webp",         "utc_offset": 2},
    {"nome": "Moscow",         "pais": "Rússia",          "continente": "Europa",           "lat":  55.7558, "lon":  37.6173, "tz": "Europe/Moscow",                  "slug": "moscow",         "landmark": "Moscow.webp",        "utc_offset": 3},
    {"nome": "Bangkok",        "pais": "Tailândia",       "continente": "Ásia",             "lat":  13.7563, "lon": 100.5018, "tz": "Asia/Bangkok",                   "slug": "bangkok",        "landmark": "Bangkok.webp",       "utc_offset": 7},
    {"nome": "Tokyo",          "pais": "Japão",           "continente": "Ásia",             "lat":  35.6762, "lon": 139.6503, "tz": "Asia/Tokyo",                     "slug": "tokyo",          "landmark": "Tokyo.webp",         "utc_offset": 9},
    {"nome": "Dubai",          "pais": "Emirados Árabes", "continente": "Oriente Médio",    "lat":  25.2048, "lon":  55.2708, "tz": "Asia/Dubai",                     "slug": "dubai",          "landmark": "Dubai.webp",         "utc_offset": 4},
    {"nome": "Cairo",          "pais": "Egito",           "continente": "África",           "lat":  30.0444, "lon":  31.2357, "tz": "Africa/Cairo",                   "slug": "cairo",          "landmark": "Cairo.webp",         "utc_offset": 2},
    {"nome": "Sydney",         "pais": "Austrália",       "continente": "Oceania",          "lat": -33.8688, "lon": 151.2093, "tz": "Australia/Sydney",               "slug": "sydney",         "landmark": "Sydney.webp",        "utc_offset": 10},
]

# ============================================================
# DAYTIME MAPPING — determines banner image based on hour
# ============================================================
DAYTIME_MAP = [
    (5,  7,  "Dawn.jpeg",  "Amanhecer"),
    (7,  17, "Day.jpeg",   "Dia"),
    (17, 19, "Dusk.jpeg",  "Entardecer"),
    (19, 24, "Night.jpeg", "Noite"),
    (0,  5,  "Night.jpeg", "Noite"),
]

# ============================================================
# CONTINENT EMOJIS
# ============================================================
CONTINENT_EMOJI = {
    "América do Sul":   "🌎",
    "América Central":  "🌎",
    "América do Norte": "🌎",
    "Europa":           "🌍",
    "Ásia":             "🌏",
    "Oriente Médio":    "🌍",
    "África":           "🌍",
    "Oceania":          "🌏",
}

def get_local_time(city):
    """Get the current local time for a city."""
    if HAS_PYTZ:
        tz = pytz.timezone(city["tz"])
        return datetime.now(tz)
    else:
        offset = timedelta(hours=city["utc_offset"])
        tz = timezone(offset)
        return datetime.now(tz)

def get_daytime_image(hour):
    """Return the daytime image filename and label for a given hour."""
    for start, end, img, label in DAYTIME_MAP:
        if start <= hour < end:
            return img, label
    return "Night.jpeg", "Noite"

def get_bg_palette_3stop(temp, condition_key, is_day):
    """Return an intelligent 3-stop background gradient depending on weather, time, and temp."""
    if not is_day:
        if condition_key in ("chuva", "tempestade"):
            return "#0B0C10", "#1F2833", "#11141A"  # Dark scary night
        else:
            return "#0B132B", "#1C2541", "#3A506B"  # Moonlit crisp night
    else:
        if condition_key == "tempestade":
            return "#1F1C2C", "#928DAB", "#1F1C2C"  # Stormy day
        elif condition_key == "chuva":
            return "#3A6073", "#3a7bd5", "#283c86"  # Rainy mood
        elif condition_key == "neblina":
            return "#757F9A", "#B7C1D1", "#D7DDE8"  # Foggy
        
        # Clear or cloudy -> Temp-based
        if temp < 5:
            return "#E0EAFC", "#CFDEF3", "#B9D4F1"  # Freezing day
        elif temp < 15:
            return "#70A1FF", "#1E90FF", "#3742FA"  # Cool day
        elif temp < 25:
            return "#4facfe", "#00f2fe", "#00c6ff"  # Perfect day
        elif temp < 32:
            return "#FFB75E", "#ED8F03", "#FE8C00"  # Warm day
        else:
            return "#FF4E50", "#F9D423", "#F857A6"  # Hot day

def get_condition_image(weather_code, is_day):
    """Return the correct condition image based on weather code and day/night context."""
    if weather_code == 0:
        emoji, desc, condition_key, img = "☀️", "Céu limpo", "limpo", ("DayClear.webp" if is_day else "NightFullMoonClear.webp")
    elif weather_code == 1:
        emoji, desc, condition_key, img = "🌤️", "Principalmente limpo", "limpo", ("DayPartialClean.webp" if is_day else "NightPartialClean.webp")
    elif weather_code == 2:
        emoji, desc, condition_key, img = "⛅", "Parcialmente nublado", "nublado", ("DayPartialCloudy.webp" if is_day else "NightPartialCloudy.webp")
    elif weather_code == 3:
        emoji, desc, condition_key, img = "☁️", "Nublado", "nublado", ("DayCumulusCongestus.webp" if is_day else "NightOvercast.webp")
    elif weather_code in (45, 48):
        emoji, desc, condition_key, img = "🌫️", "Neblina", "neblina", ("DayFog.webp" if is_day else "Mist.webp")
    elif weather_code in (51, 53, 55):
        emoji, desc, condition_key, img = "🌦️", "Chuvisco", "chuva", ("drizzle.webp" if is_day else "NightRain.webp")
    elif weather_code in (61, 63, 65, 80):
        emoji, desc, condition_key, img = "🌧️", "Chuva", "chuva", ("DayRain.webp" if is_day else "NightRain.webp")
    elif weather_code in (56, 57, 66, 67, 71, 73, 75, 85):
        emoji, desc, condition_key, img = "🌨️", "Neve", "neve", "LightSnowfall.webp"
    elif weather_code in (77, 86, 96):
        emoji, desc, condition_key, img = "🌨️", "Granizo", "tempestade", "RainHail.webp"
    elif weather_code in (81, 82, 95):
        emoji, desc, condition_key, img = "⛈️", "Tempestade", "tempestade", "Storm.webp"
    elif weather_code == 99:
        emoji, desc, condition_key, img = "🌪️", "Tornado", "tempestade", "Tornado.webp"
    else:
        emoji, desc, condition_key, img = "❓", "Desconhecido", "nublado", "DayCumulus Formations.webp"
        
    return emoji, desc, condition_key, img

def fetch_weather(city):
    """Fetch current weather + daily + hourly forecast from Open-Meteo API."""
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": city["lat"],
        "longitude": city["lon"],
        "current": "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,precipitation,pressure_msl,visibility,cloud_cover,is_day",
        "hourly": "temperature_2m,weather_code,uv_index,precipitation_probability",
        "daily": "temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,weather_code",
        "timezone": city["tz"],
        "forecast_days": 3,
    }
    headers = {
        "User-Agent": "SkyLogWeatherDashboard/2.0 (contact: pedroazevedojoel@gmail.com; github: Pedroxious/skylog)"
    }
    resp = requests.get(url, params=params, headers=headers, timeout=15)
    resp.raise_for_status()
    return resp.json()

def parse_weather(city, data):
    """Parse API response into a detailed dict of weather info including forecasts."""
    current = data["current"]
    daily = data["daily"]
    hourly = data.get("hourly", {})
    
    local_now = get_local_time(city)
    
    sunrise_str = daily["sunrise"][0]
    sunset_str = daily["sunset"][0]
    
    sunrise_dt = datetime.fromisoformat(sunrise_str)
    sunset_dt = datetime.fromisoformat(sunset_str)
    
    local_naive = local_now.replace(tzinfo=None)
    is_day = current.get("is_day", 1) == 1
    
    if is_day:
        total_day = (sunset_dt - sunrise_dt).total_seconds()
        elapsed = (local_naive - sunrise_dt).total_seconds()
        day_progress = min(max(elapsed / total_day * 100, 0), 100)
    else:
        day_progress = 0 if local_naive < sunrise_dt else 100

    weather_code = current.get("weather_code", 0)
    emoji, condition_desc, condition_key, condition_img = get_condition_image(weather_code, is_day)
    color1, color2, color3 = get_bg_palette_3stop(current["temperature_2m"], condition_key, is_day)

    # Find matching hourly index for current time to extract UV index and rain probability
    hourly_times = hourly.get("time", [])
    hourly_temps = hourly.get("temperature_2m", [])
    hourly_codes = hourly.get("weather_code", [])
    hourly_uvs = hourly.get("uv_index", [])
    hourly_rain_probs = hourly.get("precipitation_probability", [])
    
    local_iso_hour = local_now.strftime("%Y-%m-%dT%H:00")
    curr_idx = 0
    for idx, t_str in enumerate(hourly_times):
        if t_str == local_iso_hour or t_str.startswith(local_now.strftime("%Y-%m-%dT%H:")) or t_str >= local_iso_hour:
            curr_idx = idx
            break
            
    current_uv = hourly_uvs[curr_idx] if curr_idx < len(hourly_uvs) else 0.0
    current_rain_prob = hourly_rain_probs[curr_idx] if curr_idx < len(hourly_rain_probs) else 0

    # Mini 3-hour forecast for SVG card
    forecast_3h = []
    for offset in [1, 2, 3]:
        idx = curr_idx + offset
        if idx < len(hourly_times):
            f_time = datetime.fromisoformat(hourly_times[idx])
            f_temp = hourly_temps[idx]
            f_code = hourly_codes[idx]
            if f_temp is None:
                f_temp = 0.0
            f_is_day = f_time.hour >= 6 and f_time.hour < 18
            f_emoji, f_desc, _, _ = get_condition_image(f_code, f_is_day)
            forecast_3h.append({
                "time": f_time.strftime("%H:%M"),
                "temp": f_temp,
                "emoji": f_emoji,
                "desc": f_desc
            })

    # Mini 3-day forecast for README
    forecast_3d = []
    for i in range(min(3, len(daily["time"]))):
        d_time = datetime.fromisoformat(daily["time"][i])
        d_max = daily["temperature_2m_max"][i]
        d_min = daily["temperature_2m_min"][i]
        d_code = daily["weather_code"][i]
        d_uv = daily["uv_index_max"][i]
        d_precip = daily["precipitation_sum"][i]
        d_emoji, d_desc, _, _ = get_condition_image(d_code, True)
        
        # Safe-guards for None values returned by the API
        if d_max is None:
            d_max = 0.0
        if d_min is None:
            d_min = 0.0
        if d_uv is None:
            d_uv = 0.0
        if d_precip is None:
            d_precip = 0.0
            
        day_label = d_time.strftime("%d/%m")
        if i == 0:
            day_label = "Hoje"
        elif i == 1:
            day_label = "Amanhã"
            
        forecast_3d.append({
            "day_name": day_label,
            "max": d_max,
            "min": d_min,
            "emoji": d_emoji,
            "desc": d_desc,
            "uv": d_uv,
            "precip": d_precip
        })

    return {
        "city_name": city["nome"],
        "country": city["pais"],
        "continent": city["continente"],
        "slug": city["slug"],
        "landmark": city["landmark"],
        "lat": city["lat"],
        "lon": city["lon"],
        "temp": current["temperature_2m"],
        "feels_like": current["apparent_temperature"],
        "humidity": current["relative_humidity_2m"],
        "wind": current["wind_speed_10m"],
        "wind_dir": current.get("wind_direction_10m", 0),
        "precipitation": current.get("precipitation", 0),
        "pressure": current.get("pressure_msl", 1013.25),
        "visibility": current.get("visibility", 10000) / 1000.0,  # in km
        "cloud_cover": current.get("cloud_cover", 0),
        "uv_index": current_uv,
        "rain_prob": current_rain_prob,
        "weather_code": weather_code,
        "emoji": emoji,
        "condition": condition_desc,
        "condition_img": condition_img,
        "condition_key": condition_key,
        "temp_min": daily["temperature_2m_min"][0],
        "temp_max": daily["temperature_2m_max"][0],
        "sunrise": sunrise_str,
        "sunset": sunset_str,
        "is_day": is_day,
        "day_progress": day_progress,
        "local_time": local_now.strftime("%H:%M"),
        "local_date": local_now.strftime("%Y-%m-%d"),
        "local_datetime": local_now.strftime("%Y-%m-%d %H:%M"),
        "color1": color1,
        "color2": color2,
        "color3": color3,
        "forecast_3h": forecast_3h,
        "forecast_3d": forecast_3d
    }

# ============================================================
# SVG CARD GENERATION — animated weather cards
# ============================================================

def generate_weather_animations(condition_key, is_day):
    """Generate SVG animation elements based on weather condition."""
    animations = ""
    
    if condition_key == "chuva" or condition_key == "tempestade":
        # Rain drops
        for i in range(12):
            x = 30 + (i * 38) % 460
            delay = (i * 0.15) % 1.5
            length = 15 + (i % 3) * 5
            animations += f'''<line x1="{x}" y1="-10" x2="{x-8}" y2="{length}" 
                stroke="rgba(200,220,255,0.4)" stroke-width="1.5" class="rain" 
                style="animation-delay:{delay:.2f}s"/>
            '''
    
    if condition_key == "tempestade":
        # Lightning bolt
        animations += '''<polygon points="220,20 210,80 225,75 215,130 240,60 225,65 235,20" 
            fill="#FFE082" opacity="0" class="lightning"/>
        '''
    
    if condition_key == "neve":
        # Falling snow particles
        for i in range(12):
            x = 30 + (i * 38) % 460
            delay = (i * 0.25) % 2.5
            duration = 2.0 + (i % 3) * 0.5
            animations += f'''<circle cx="{x}" cy="-5" r="{1.5 + (i % 2)}" fill="#FFFFFF" 
                opacity="0.8" class="snow" style="animation-delay:{delay:.2f}s; animation-duration:{duration:.2f}s"/>
            '''

    if condition_key == "nublado" or condition_key == "neblina":
        # Floating clouds
        animations += '''<ellipse cx="100" cy="60" rx="60" ry="20" fill="rgba(255,255,255,0.22)" class="cloud1"/>
            <ellipse cx="350" cy="45" rx="50" ry="15" fill="rgba(255,255,255,0.18)" class="cloud2"/>
        '''
    
    if condition_key == "limpo" and is_day:
        # Sun with rotating rays
        animations += '''<circle cx="440" cy="50" r="22" fill="#FFD54F" opacity="0.9" class="sun"/>
            <circle cx="440" cy="50" r="30" fill="none" stroke="#FFD54F" stroke-width="2" 
                opacity="0.4" class="sun-ray"/>
        '''
    
    if not is_day and condition_key in ("limpo", "nublado"):
        # Stars
        for i in range(8):
            x = 40 + (i * 57) % 440
            y = 20 + (i * 23) % 60
            delay = i * 0.4
            animations += f'''<circle cx="{x}" cy="{y}" r="1.5" fill="white" 
                opacity="0.6" class="star" style="animation-delay:{delay:.1f}s"/>
            '''
        # Moon
        animations += '''<circle cx="440" cy="45" r="16" fill="#E8EAF6" opacity="0.85"/>
            <circle cx="448" cy="40" r="14" fill="''' + ('#0B132B' if condition_key == 'limpo' else '#11141A') + '''"/>
        '''
    
    if condition_key == "neblina":
        # Fog layers
        for i in range(3):
            y = 180 + i * 30
            delay = i * 1.2
            animations += f'''<rect x="0" y="{y}" width="500" height="15" 
                fill="rgba(255,255,255,0.12)" class="fog" 
                style="animation-delay:{delay:.1f}s"/>
            '''
    
    return animations

def generate_svg_styles():
    """Generate CSS animation styles for SVG cards."""
    return '''<style>
        @keyframes rainFall {
            0% { transform: translateY(-20px); opacity: 0.7; }
            100% { transform: translateY(320px); opacity: 0; }
        }
        @keyframes flash {
            0%, 100% { opacity: 0; }
            5% { opacity: 0.9; }
            10% { opacity: 0; }
            12% { opacity: 0.7; }
            15% { opacity: 0; }
        }
        @keyframes snowFall {
            0% { transform: translateY(-10px) translateX(0); opacity: 0.8; }
            50% { transform: translateY(160px) translateX(8px); opacity: 0.6; }
            100% { transform: translateY(320px) translateX(-8px); opacity: 0; }
        }
        @keyframes drift1 {
            0% { transform: translateX(-80px); }
            100% { transform: translateX(520px); }
        }
        @keyframes drift2 {
            0% { transform: translateX(520px); }
            100% { transform: translateX(-80px); }
        }
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
        @keyframes sunPulse {
            0%, 100% { r: 30; opacity: 0.3; }
            50% { r: 36; opacity: 0.6; }
        }
        @keyframes sunRotate {
            0% { transform: rotate(0deg); transform-origin: 440px 50px; }
            100% { transform: rotate(360deg); transform-origin: 440px 50px; }
        }
        @keyframes fogDrift {
            0% { transform: translateX(-50px); opacity: 0.1; }
            50% { opacity: 0.2; }
            100% { transform: translateX(50px); opacity: 0.1; }
        }
        .rain { animation: rainFall 0.8s linear infinite; }
        .lightning { animation: flash 4s ease-in-out infinite; }
        .snow { animation: snowFall 2.8s linear infinite; }
        .cloud1 { animation: drift1 20s linear infinite; }
        .cloud2 { animation: drift2 24s linear infinite; }
        .star { animation: twinkle 2s ease-in-out infinite; }
        .sun { animation: sunRotate 30s linear infinite; }
        .sun-ray { animation: sunPulse 3s ease-in-out infinite; }
        .fog { animation: fogDrift 6s ease-in-out infinite alternate; }
    </style>'''

def generate_svg_card(w):
    """Generate a complete animated SVG weather card."""
    is_day = w["is_day"]
    condition_key = w["condition_key"]
    
    bg1 = w["color1"]
    bg2 = w["color2"]
    bg3 = w["color3"]
    
    # Premium Unified Text Colors
    text_main = "#FFFFFF"
    text_secondary = "#F1F5F9"
    text_light = "#CBD5E1"
    font_fam = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    
    styles = generate_svg_styles()
    animations = generate_weather_animations(condition_key, is_day)
    
    # Day progress bar
    progress_width = int(w["day_progress"] * 4.6)  # max 460px
    progress_color = "#FFD54F" if is_day else "#81D4FA"
    day_label = "Dia" if is_day else "Noite"
    
    # 3-Hour Forecast Pills coordinates
    forecast_pills = ""
    for idx, f in enumerate(w["forecast_3h"][:3]):
        start_x = 20 + idx * 158
        forecast_pills += f'''
        <!-- Pill {idx + 1} -->
        <rect x="{start_x}" y="240" width="144" height="52" rx="10" 
            fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1"/>
        <text x="{start_x + 12}" y="261" font-family="{font_fam}" font-size="11" font-weight="600" fill="{text_secondary}">{f["time"]}</text>
        <text x="{start_x + 12}" y="280" font-family="{font_fam}" font-size="14" font-weight="800" fill="{text_main}">{f["temp"]:.1f}°C</text>
        <text x="{start_x + 104}" y="275" font-family="{font_fam}" font-size="22" filter="url(#shadow)">{f["emoji"]}</text>
        '''

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="500" height="320" viewBox="0 0 500 320">
    {styles}
    <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:{bg1}"/>
            <stop offset="50%" style="stop-color:{bg2}"/>
            <stop offset="100%" style="stop-color:{bg3}"/>
        </linearGradient>
        <clipPath id="rounded">
            <rect x="0" y="0" width="500" height="320" rx="20" ry="20"/>
        </clipPath>
        <!-- Dropshadow Filters -->
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
        <filter id="light-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.4"/>
        </filter>
    </defs>
    
    <!-- Outer Shadow -->
    <rect x="4" y="4" width="500" height="320" rx="20" ry="20" fill="rgba(0,0,0,0.15)"/>
    
    <!-- Card Frame -->
    <g clip-path="url(#rounded)">
        <rect width="500" height="320" fill="url(#bg)" rx="20" ry="20"/>
        
        <!-- Weather Animations -->
        {animations}
        
        <!-- Top Info -->
        <text x="25" y="38" font-family="{font_fam}" font-size="22" 
            font-weight="800" fill="{text_main}" filter="url(#shadow)">{w["city_name"]}, {w["country"]}</text>
        <text x="25" y="56" font-family="{font_fam}" font-size="12" font-weight="500"
            fill="{text_secondary}" filter="url(#light-shadow)">{w["continent"]} · {w["local_time"]} · {day_label}</text>
        
        <!-- Current Conditions (Left) -->
        <text x="25" y="118" font-family="{font_fam}" font-size="52" 
            font-weight="900" fill="{text_main}" filter="url(#shadow)">{w["temp"]:.1f}°C</text>
        <text x="25" y="136" font-family="{font_fam}" font-size="13" font-weight="500"
            fill="{text_secondary}" filter="url(#light-shadow)">Sensação: {w["feels_like"]:.1f}°C</text>
        
        <!-- Current Conditions (Right) -->
        <text x="475" y="102" font-family="{font_fam}" font-size="48" text-anchor="end" filter="url(#shadow)">{w["emoji"]}</text>
        <text x="475" y="128" font-family="{font_fam}" font-size="16" font-weight="700"
            fill="{text_main}" text-anchor="end" filter="url(#shadow)">{w["condition"]}</text>
        
        <!-- Glassmorphism Details Section -->
        <rect x="20" y="156" width="460" height="66" rx="12" 
            fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.5"/>
        
        <!-- Row 1 details -->
        <text x="35" y="181" font-family="{font_fam}" font-size="11" font-weight="600" fill="{text_light}" filter="url(#light-shadow)">💧 Umid: {w["humidity"]}%</text>
        <text x="180" y="181" font-family="{font_fam}" font-size="11" font-weight="600" fill="{text_light}" filter="url(#light-shadow)">💨 Vent: {w["wind"]:.1f} km/h</text>
        <text x="340" y="181" font-family="{font_fam}" font-size="11" font-weight="600" fill="{text_light}" filter="url(#light-shadow)">☀️ UV: {w["uv_index"]:.1f}</text>
        
        <!-- Row 2 details -->
        <text x="35" y="206" font-family="{font_fam}" font-size="11" font-weight="600" fill="{text_light}" filter="url(#light-shadow)">🎈 Press: {w["pressure"]:.0f} hPa</text>
        <text x="180" y="206" font-family="{font_fam}" font-size="11" font-weight="600" fill="{text_light}" filter="url(#light-shadow)">👁️ Visib: {w["visibility"]:.1f} km</text>
        <text x="340" y="206" font-family="{font_fam}" font-size="11" font-weight="600" fill="{text_light}" filter="url(#light-shadow)">☁️ Nuvens: {w["cloud_cover"]}%</text>
        
        <!-- 3-Hour Forecast Pills -->
        {forecast_pills}
        
        <!-- Slim Day Progress Bar at the very bottom -->
        <rect x="20" y="306" width="460" height="4" rx="2" fill="rgba(0,0,0,0.25)"/>
        <rect x="20" y="306" width="{progress_width}" height="4" rx="2" fill="{progress_color}"/>
    </g>
</svg>'''
    
    return svg

# ============================================================
# CSV HISTORY — standardized log
# ============================================================
CSV_FILE = "data/history.csv"
CSV_COLUMNS = [
    "datetime", "city", "country", "continent", "temp_c", "feels_like_c",
    "temp_min_c", "temp_max_c", "humidity_pct", "wind_kmh", "precipitation_mm",
    "weather_code", "condition", "image_key", "is_day", "sunrise", "sunset",
    "pressure_hpa", "uv_index", "visibility_km", "cloud_cover_pct", "wind_direction_deg"
]

def standardize_existing_csv():
    """Ensures existing history.csv records have new columns, maintaining absolute backup integrity."""
    if not os.path.exists(CSV_FILE) or os.path.getsize(CSV_FILE) == 0:
        return
    
    try:
        with open(CSV_FILE, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            rows = list(reader)
        
        if not rows:
            return
        
        header = rows[0]
        updated = False
        
        # If the header doesn't match the new CSV_COLUMNS exactly, pad columns and update header
        if header != CSV_COLUMNS:
            rows[0] = CSV_COLUMNS
            updated = True
            
        for i in range(1, len(rows)):
            if len(rows[i]) < len(CSV_COLUMNS):
                rows[i] = rows[i] + [""] * (len(CSV_COLUMNS) - len(rows[i]))
                updated = True
                
        if updated:
            with open(CSV_FILE, "w", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                writer.writerows(rows)
    except Exception as e:
        print(f"⚠️ Warning: Could not standardize CSV: {e}")

def append_csv(w):
    """Append a weather record to the CSV history file securely."""
    standardize_existing_csv()
    
    file_exists = os.path.exists(CSV_FILE) and os.path.getsize(CSV_FILE) > 0
    
    with open(CSV_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(CSV_COLUMNS)
        
        writer.writerow([
            w["local_datetime"],
            w["city_name"],
            w["country"],
            w["continent"],
            f'{w["temp"]:.1f}',
            f'{w["feels_like"]:.1f}',
            f'{w["temp_min"]:.1f}',
            f'{w["temp_max"]:.1f}',
            w["humidity"],
            f'{w["wind"]:.1f}',
            f'{w["precipitation"]:.1f}' if w["precipitation"] else "0.0",
            w["weather_code"],
            w["condition"],
            w["condition_img"],
            "1" if w["is_day"] else "0",
            w["sunrise"],
            w["sunset"],
            f'{w["pressure"]:.1f}',
            f'{w["uv_index"]:.1f}',
            f'{w["visibility"]:.1f}',
            w["cloud_cover"],
            w["wind_dir"]
        ])

def get_csv_stats():
    """Read CSV and return statistics."""
    stats = {
        "total_records": 0,
        "first_record": "N/A",
        "last_record": "N/A",
        "highest_temp": None,
        "highest_temp_city": "",
        "lowest_temp": None,
        "lowest_temp_city": "",
    }
    
    if not os.path.exists(CSV_FILE):
        return stats
    
    try:
        with open(CSV_FILE, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        
        if not rows:
            return stats
        
        stats["total_records"] = len(rows)
        stats["first_record"] = rows[0].get("datetime", "N/A")
        stats["last_record"] = rows[-1].get("datetime", "N/A")
        
        for row in rows:
            try:
                temp_c_str = row.get("temp_c")
                if not temp_c_str:
                    continue
                temp = float(temp_c_str)
                city = row.get("city", "")
                if stats["highest_temp"] is None or temp > stats["highest_temp"]:
                    stats["highest_temp"] = temp
                    stats["highest_temp_city"] = city
                if stats["lowest_temp"] is None or temp < stats["lowest_temp"]:
                    stats["lowest_temp"] = temp
                    stats["lowest_temp_city"] = city
            except (ValueError, KeyError):
                pass
    except Exception as e:
        print(f"⚠️ Warning: Could not compute CSV stats: {e}")
        
    return stats

# ============================================================
# README GENERATION — complete visual dashboard
# ============================================================

def generate_readme(all_weather, update_time):
    """Generate the full README.md dashboard."""
    
    csv_stats = get_csv_stats()
    
    readme = f"""<div align="center">

# SkyLog — Global Weather Dashboard

### Monitoramento climático em tempo real de 15 cidades ao redor do mundo

[![SkyLog Live](https://img.shields.io/badge/SkyLog%20Live-Acessar%20Web%20App-000000?style=for-the-badge&logoColor=white)](https://pedroxious.github.io/skylog/)
[![Registros CSV](https://img.shields.io/badge/Histórico%20CSV-{csv_stats['total_records']}%20Registros-2E8B57?style=for-the-badge)](data/history.csv)

---

### Sync Ativo • Última atualização: {update_time.split()[1]} (BRT)
*Projeto em expansão, operando com automações no GitHub Actions para manter métricas globais atualizadas em tempo real. Consulte o link superior para a versão Web.*

<img src="VisualLog/ShowcaseV2.png" width="800" alt="SkyLog Showcase"/>

</div>

<br/>

"""
    
    # City Sections
    for w in all_weather:
        readme += generate_city_section(w)
        
    # History section
    readme += f"""
<div align="center">

## Histórico de Dados

</div>

| Estatística | Valor |
|:---:|:---:|
| Total de registros | {csv_stats['total_records']} |
| Primeiro registro | `{csv_stats['first_record']}` |
| Último registro | `{csv_stats['last_record']}` |
| Temperatura mais alta | **{csv_stats['highest_temp']:.1f}°C** — {csv_stats['highest_temp_city']} |
| Temperatura mais baixa | **{csv_stats['lowest_temp']:.1f}°C** — {csv_stats['lowest_temp_city']} |

<div align="center">

📂 <a href="data/history.csv">Ver histórico completo (history.csv)</a>

</div>

"""
    
    # Footer
    readme += f"""
---

<div align="center">

### Informações Técnicas

</div>

| Item | Detalhe |
|:---:|:---:|
| Fonte de dados | <a href="https://open-meteo.com/">Open-Meteo API</a> (gratuita) |
| Frequência | 24× ao dia (a cada hora) |
| Automação | GitHub Actions — <a href=".github/workflows/weather.yml">ver workflow</a> |
| Script | `update_weather.py` (requests e pytz) |
| Cidades Monitoradas | 15 cidades globais |

---

<div align="center">

**Feito com amor por [Pedroxious](https://github.com/Pedroxious) · Dados: [Open-Meteo](https://open-meteo.com/)**

</div>
"""
    
    return readme

def generate_city_section(w):
    """Generate a clean, modern, fully visible section for a city, discarding dropdowns and excess emojis."""
    
    forecast_rows = ""
    for d in w["forecast_3d"]:
        forecast_rows += f"| {d['day_name']} | {d['emoji']} {d['desc']} | {d['min']:.1f}°C a {d['max']:.1f}°C | UV: {d['uv']:.0f} | Precip: {d['precip']:.1f} mm |\n"

    return f"""
<div align="center">

## {w["city_name"]}, {w["country"]}

<img src="landmarks/{w['landmark']}" width="800" alt="Vista de {w['city_name']}"/>

<table>
  <tr>
    <td align="center" width="50%">
      <img src="cards/{w['slug']}.svg?v=2" alt="Card {w['city_name']}"/>
    </td>
    <td align="center" width="50%">
      <img src="conditions/{w['condition_img']}" width="380" alt="Condição em tempo real {w['condition']}"/>
    </td>
  </tr>
</table>

| Parâmetro | Medição em Tempo Real |
|:---:|:---:|
| Temperatura | {w["temp"]:.1f}°C (Sensação: {w["feels_like"]:.1f}°C) |
| Variação Diária | {w["temp_min"]:.1f}°C — {w["temp_max"]:.1f}°C |
| Umidade / Pressão | {w["humidity"]}% / {w["pressure"]:.1f} hPa |
| Vento / Direção | {w["wind"]:.1f} km/h (Direção: {w["wind_dir"]}°) |
| UV / Visibilidade | {w["uv_index"]:.1f} / {w["visibility"]:.1f} km |
| Condição Atual | {w["condition"]} |
| Horário Local | {w["local_time"]} |

### Previsão para os Próximos Dias

| Dia | Condição | Temperatura | Índice UV Máximo | Precipitação Prevista |
|:---:|:---:|:---:|:---:|:---:|
{forecast_rows}

</div>

<br/><hr/><br/>
"""

# ============================================================
# MAIN EXECUTION
# ============================================================

def main():
    """Main function — orchestrates the full update pipeline."""
    print("🌍 SkyLog — Starting weather update...")
    print("=" * 55)
    
    # Ensure output directories exist
    os.makedirs("cards", exist_ok=True)
    os.makedirs("data", exist_ok=True)
    
    # Run historical standardization once to set up new columns securely
    standardize_existing_csv()
    
    all_weather = []
    errors = []
    
    for city in CIDADES:
        try:
            print(f"  📡 Fetching: {city['nome']}, {city['pais']}...", end=" ")
            data = fetch_weather(city)
            w = parse_weather(city, data)
            all_weather.append(w)
            
            # Generate SVG card
            svg = generate_svg_card(w)
            svg_path = f"cards/{city['slug']}.svg"
            with open(svg_path, "w", encoding="utf-8") as f:
                f.write(svg)
            
            # Append to CSV
            append_csv(w)
            
            print(f"✅ {w['temp']:.1f}°C {w['emoji']} {w['condition']} ({w['local_time']})")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            errors.append({"city": city["nome"], "error": str(e)})
    
    print("=" * 55)
    
    if all_weather:
        # Generate README
        update_time = datetime.now(timezone(timedelta(hours=-3))).strftime("%Y-%m-%d %H:%M BRT")
        readme = generate_readme(all_weather, update_time)
        with open("README.md", "w", encoding="utf-8") as f:
            f.write(readme)
        print(f"📝 README.md updated with {len(all_weather)} cities")
    
    # Summary
    print(f"\n🏁 Done! {len(all_weather)} cities updated, {len(errors)} errors")
    if errors:
        for e in errors:
            print(f"  ⚠️ {e['city']}: {e['error']}")
    
    csv_stats = get_csv_stats()
    print(f"📊 Total CSV records: {csv_stats['total_records']}")

if __name__ == "__main__":
    main()
