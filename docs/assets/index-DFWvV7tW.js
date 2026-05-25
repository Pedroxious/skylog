import{C as B,r as oe,u as ae}from"./charts-C_ASVdvE.js";import{r as se,g as le}from"./maps-zdHhRoWp.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=([e,t,n])=>{const r=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(i=>{r.setAttribute(i,String(t[i]))}),n!=null&&n.length&&n.forEach(i=>{const a=K(i);r.appendChild(a)}),r},ce=(e,t={})=>{const r={...Y,...t};return K(["svg",r,e])};/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,r)=>r?r.toUpperCase():n.toLowerCase());/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=e=>{const t=pe(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=e=>Array.from(e.attributes).reduce((t,n)=>(t[n.name]=n.value,t),{}),W=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",G=(e,{nameAttr:t,icons:n,attrs:r})=>{var m;const i=e.getAttribute(t);if(i==null)return;const a=me(i),o=n[a];if(!o)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const s=he(e),l=de(s)?{}:{"aria-hidden":"true"},c={...Y,"data-lucide":i,...l,...r,...s},u=W(s),p=W(r),d=ue("lucide",`lucide-${i}`,...u,...p);d&&Object.assign(c,{class:d});const h=ce(o,c);return(m=e.parentNode)==null?void 0:m.replaceChild(h,e)};/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"m19 9-5 5-4-4-3 3"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"m9 18 6-6-6-6"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=[["path",{d:"M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"}],["path",{d:"m13 12-3 5h4l-3 5"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"m9.2 22 3-7"}],["path",{d:"m9 13-3 7"}],["path",{d:"m17 13-3 7"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M16 14v6"}],["path",{d:"M8 14v6"}],["path",{d:"M12 16v6"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"}],["path",{d:"M15 5.764v15"}],["path",{d:"M9 3.236v15"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=[["path",{d:"M4 5h16"}],["path",{d:"M4 12h16"}],["path",{d:"M4 19h16"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=[["path",{d:"m10 20-1.25-2.5L6 18"}],["path",{d:"M10 4 8.75 6.5 6 6"}],["path",{d:"m14 20 1.25-2.5L18 18"}],["path",{d:"m14 4 1.25 2.5L18 6"}],["path",{d:"m17 21-3-6h-4"}],["path",{d:"m17 3-3 6 1.5 3"}],["path",{d:"M2 12h6.5L10 9"}],["path",{d:"m20 10-1.5 2 1.5 2"}],["path",{d:"M22 12h-6.5L14 15"}],["path",{d:"m4 10 1.5 2L4 14"}],["path",{d:"m7 21 3-6-1.5-3"}],["path",{d:"m7 3 3 6h4"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De=[["path",{d:"M12 10V2"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m16 6-4 4-4-4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=({icons:e={},nameAttr:t="data-lucide",attrs:n={},root:r=document,inTemplates:i}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof r>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(r.querySelectorAll(`[${t}]`)).forEach(o=>G(o,{nameAttr:t,icons:e,attrs:n})),i&&Array.from(r.querySelectorAll("template")).forEach(s=>Z({icons:e,nameAttr:t,attrs:n,root:s.content,inTemplates:i})),t==="data-lucide"){const o=r.querySelectorAll("[icon-name]");o.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(o).forEach(s=>G(s,{nameAttr:"icon-name",icons:e,attrs:n})))}},Re="https://raw.githubusercontent.com/Pedroxious/skylog/main/conditions/",Be=[{name:"São Paulo",country:"BR",lat:-23.5475,lon:-46.6361,tz:"America/Sao_Paulo"},{name:"New York",country:"US",lat:40.7128,lon:-74.006,tz:"America/New_York"},{name:"London",country:"GB",lat:51.5074,lon:-.1278,tz:"Europe/London"},{name:"Tokyo",country:"JP",lat:35.6762,lon:139.6503,tz:"Asia/Tokyo"},{name:"Paris",country:"FR",lat:48.8566,lon:2.3522,tz:"Europe/Paris"},{name:"Sydney",country:"AU",lat:-33.8688,lon:151.2093,tz:"Australia/Sydney"},{name:"Dubai",country:"AE",lat:25.2048,lon:55.2708,tz:"Asia/Dubai"},{name:"Buenos Aires",country:"AR",lat:-34.6037,lon:-58.3816,tz:"America/Argentina/Buenos_Aires"},{name:"Cairo",country:"EG",lat:30.0444,lon:31.2357,tz:"Africa/Cairo"},{name:"Mexico City",country:"MX",lat:19.4326,lon:-99.1332,tz:"America/Mexico_City"},{name:"San Francisco",country:"US",lat:37.7749,lon:-122.4194,tz:"America/Los_Angeles"},{name:"Rio de Janeiro",country:"BR",lat:-22.9068,lon:-43.1729,tz:"America/Sao_Paulo"}],Fe={0:"Clear Sky",1:"Mainly Clear",2:"Partly Cloudy",3:"Overcast",45:"Fog",48:"Rime Fog",51:"Light Drizzle",53:"Moderate Drizzle",55:"Dense Drizzle",56:"Freezing Drizzle",57:"Heavy Freezing Drizzle",61:"Slight Rain",63:"Moderate Rain",65:"Heavy Rain",66:"Freezing Rain",67:"Heavy Freezing Rain",71:"Light Snow",73:"Moderate Snow",75:"Heavy Snow",77:"Snow Grains",80:"Light Showers",81:"Moderate Showers",82:"Violent Showers",85:"Light Snow Showers",86:"Heavy Snow Showers",95:"Thunderstorm",96:"Thunderstorm with Hail",99:"Severe Thunderstorm"};function F(e){return Fe[e]||"Unknown"}function J(e,t){return[0,1].includes(e)?t?"sun":"moon":e===2?t?"cloud-sun":"cloud-moon":e===3?"cloud":[45,48].includes(e)?"cloud-fog":[51,53,55,56,57].includes(e)?"cloud-drizzle":[61,63,80,81].includes(e)?"cloud-rain":[65,66,67,82].includes(e)?"cloud-rain-wind":[71,73,75,77,85,86].includes(e)?"snowflake":[95,96,99].includes(e)?"cloud-lightning":"cloud"}function He(e,t="C"){return e==null?"--":`${Math.round(e)}°${t==="F"?"F":""}`}function q(e,t){return new Intl.DateTimeFormat("en-US",{timeZone:t,hour:"2-digit",minute:"2-digit",hour12:!1}).format(e)}function A(e){return new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}function Oe(e){const t=new Date(e),n=new Date;if(t.toDateString()===n.toDateString())return"Today";const r=new Date(n);return r.setDate(r.getDate()+1),t.toDateString()===r.toDateString()?"Tomorrow":t.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function je(e){return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(new Date)}const Ue=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];function X(e){if(e==null)return"--";const t=Math.round(e/22.5)%16;return Ue[t]}function We(e){return e<=2?{label:"Low",color:"#22c55e",bg:"bg-green-500"}:e<=5?{label:"Moderate",color:"#eab308",bg:"bg-yellow-500"}:e<=7?{label:"High",color:"#f97316",bg:"bg-orange-500"}:e<=10?{label:"Very High",color:"#ef4444",bg:"bg-red-500"}:{label:"Extreme",color:"#a855f7",bg:"bg-purple-500"}}function Ge(e){return e<=50?{label:"Good",color:"#22c55e",emoji:"🟢"}:e<=100?{label:"Moderate",color:"#eab308",emoji:"🟡"}:e<=150?{label:"Unhealthy (Sensitive)",color:"#f97316",emoji:"🟠"}:e<=200?{label:"Unhealthy",color:"#ef4444",emoji:"🔴"}:e<=300?{label:"Very Unhealthy",color:"#a855f7",emoji:"🟣"}:{label:"Hazardous",color:"#7f1d1d",emoji:"⚫"}}function Qe(e,t=300){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}function Ve(e){return e==null?"--":e>=1e4?`${(e/1e3).toFixed(0)} km`:e>=1e3?`${(e/1e3).toFixed(1)} km`:`${e} m`}function Ye(e){return e>1020?{label:"High",icon:"arrow-up"}:e<1e3?{label:"Low",icon:"arrow-down"}:{label:"Normal",icon:"minus"}}function ee(e){if(!e||e.length!==2)return"🌍";const t=[...e.toUpperCase()].map(n=>127462+n.charCodeAt(0)-65);return String.fromCodePoint(...t)}function Ke(e,t,n){const r=new Date(e).getTime(),i=new Date(t).getTime(),a=n.getTime();return a<r||a>i?-1:(a-r)/(i-r)}function Ze(e,t,n){const r=e.getTime(),i=new Date(t).getTime(),a=new Date(n).getTime(),o=1800*1e3,s=5400*1e3;return Math.abs(r-i)<o?"sunrise":r>i&&r<i+s?"morning":Math.abs(r-a)<o?"sunset":r>a-o&&r<a+o?"dusk":r>i&&r<a?"day":"night"}function g(e,t=18,n=""){return`<i data-lucide="${e}" class="${n}" style="width:${t}px;height:${t}px;"></i>`}const Q="skylog_cities",N="skylog_selected";class Je{constructor(){this._listeners={},this.cities=this._loadCities(),this.selectedIndex=this._loadSelected(),this.weatherData={},this.airQualityData={},this.loading=!0,this.searchResults=[],this.searchOpen=!1}on(t,n){return this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(n),()=>{this._listeners[t]=this._listeners[t].filter(r=>r!==n)}}emit(t,n){(this._listeners[t]||[]).forEach(r=>r(n))}get selectedCity(){return this.cities[this.selectedIndex]||this.cities[0]}selectCity(t){t<0||t>=this.cities.length||(this.selectedIndex=t,localStorage.setItem(N,t),this.emit("cityChanged",this.selectedCity))}addCity(t){const n=this.cities.find(i=>Math.abs(i.lat-t.lat)<.01&&Math.abs(i.lon-t.lon)<.01);if(n){const i=this.cities.indexOf(n);this.selectCity(i);return}this.cities.push(t),this._saveCities();const r=this.cities.length-1;this.selectCity(r),this.emit("citiesUpdated",this.cities)}removeCity(t){this.cities.length<=1||(this.cities.splice(t,1),this._saveCities(),this.selectedIndex>=this.cities.length&&(this.selectedIndex=this.cities.length-1),localStorage.setItem(N,this.selectedIndex),this.emit("citiesUpdated",this.cities),this.emit("cityChanged",this.selectedCity))}setWeatherData(t,n){const r=`${t.lat}:${t.lon}`;this.weatherData[r]=n,this.emit("weatherUpdated",{city:t,data:n})}getWeatherData(t){return t&&this.weatherData[`${t.lat}:${t.lon}`]||null}setAirQuality(t,n){const r=`${t.lat}:${t.lon}`;this.airQualityData[r]=n,this.emit("aqiUpdated",{city:t,data:n})}getAirQuality(t){return t&&this.airQualityData[`${t.lat}:${t.lon}`]||null}setLoading(t){this.loading=t,this.emit("loadingChanged",t)}_loadCities(){try{const t=localStorage.getItem(Q);if(t){const n=JSON.parse(t);if(Array.isArray(n)&&n.length>0)return n}}catch{}return[...Be]}_saveCities(){localStorage.setItem(Q,JSON.stringify(this.cities))}_loadSelected(){try{const t=parseInt(localStorage.getItem(N),10);if(!isNaN(t)&&t>=0)return t}catch{}return 0}}const b=new Je,te=new Map,qe=300*1e3;function T(e){const t=te.get(e);return t&&Date.now()-t.ts<qe?t.data:null}function D(e,t){te.set(e,{data:t,ts:Date.now()})}async function Xe(e,t,n){const r=`weather:${e}:${t}`,i=T(r);if(i)return i;const a=new URLSearchParams({latitude:e,longitude:t,timezone:n||"auto",current:["temperature_2m","relative_humidity_2m","apparent_temperature","is_day","precipitation","rain","showers","snowfall","weather_code","cloud_cover","pressure_msl","surface_pressure","wind_speed_10m","wind_direction_10m","wind_gusts_10m"].join(","),hourly:["temperature_2m","relative_humidity_2m","dew_point_2m","apparent_temperature","precipitation_probability","precipitation","weather_code","cloud_cover","visibility","wind_speed_10m","wind_direction_10m","uv_index","is_day"].join(","),daily:["weather_code","temperature_2m_max","temperature_2m_min","apparent_temperature_max","apparent_temperature_min","sunrise","sunset","uv_index_max","precipitation_sum","precipitation_probability_max","wind_speed_10m_max","wind_gusts_10m_max"].join(","),forecast_days:7});try{const o=await fetch(`https://api.open-meteo.com/v1/forecast?${a}`);if(!o.ok)throw new Error(`Weather API: ${o.status}`);const s=await o.json();return D(r,s),s}catch(o){return console.error("[API] Weather fetch failed:",o),null}}async function et(e,t){const n=`aqi:${e}:${t}`,r=T(n);if(r)return r;const i=new URLSearchParams({latitude:e,longitude:t,current:["us_aqi","pm10","pm2_5","carbon_monoxide","nitrogen_dioxide","sulphur_dioxide","ozone"].join(",")});try{const a=await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${i}`);if(!a.ok)throw new Error(`AQI API: ${a.status}`);const o=await a.json();return D(n,o),o}catch(a){return console.error("[API] Air quality fetch failed:",a),null}}async function tt(e){if(!e||e.length<2)return[];const t=`search:${e.toLowerCase()}`,n=T(t);if(n)return n;try{const r=new URLSearchParams({q:e,format:"json",limit:8,addressdetails:1,"accept-language":"en"}),i=await fetch(`https://nominatim.openstreetmap.org/search?${r}`,{headers:{"User-Agent":"SkylogWeatherDashboard/2.0"}});if(!i.ok)throw new Error(`Search API: ${i.status}`);const o=(await i.json()).filter(s=>s.type==="city"||s.type==="town"||s.type==="village"||s.type==="administrative"||s.class==="place"||s.class==="boundary").map(s=>{var l,c,u,p,d;return{name:((l=s.address)==null?void 0:l.city)||((c=s.address)==null?void 0:c.town)||((u=s.address)==null?void 0:u.village)||s.display_name.split(",")[0],country:((d=(p=s.address)==null?void 0:p.country_code)==null?void 0:d.toUpperCase())||"",lat:parseFloat(s.lat),lon:parseFloat(s.lon),display:s.display_name,tz:"auto"}});return D(t,o),o}catch(r){return console.error("[API] City search failed:",r),[]}}async function nt(){const e="radar:timestamps",t=T(e);if(t)return t;try{const n=await fetch("https://api.rainviewer.com/public/weather-maps.json");if(!n.ok)throw new Error(`Radar API: ${n.status}`);const r=await n.json();return D(e,r),r}catch(n){return console.error("[API] Radar timestamps failed:",n),null}}const V=new Set;function H(e){return`${Re}${encodeURIComponent(e)}.webp`}function ne(e){if(V.has(e))return;V.add(e);const t=new Image;t.src=H(e)}function rt(){["DayClear","NightClear","DayPartialCloudy","NightCloudy","DayRain","NightRain","Morning","Sunset","Sunrise"].forEach(ne)}function it(e){var k,U;if(!(e!=null&&e.current))return"DayClear";const t=e.current,n=t.weather_code,r=t.temperature_2m,i=t.wind_speed_10m,a=t.wind_gusts_10m||i,o=t.cloud_cover??0,s=t.precipitation??0,l=t.is_day===1,c=e.daily,u=((k=c==null?void 0:c.sunrise)==null?void 0:k[0])||null,p=((U=c==null?void 0:c.sunset)==null?void 0:U[0])||null,d=new Date,h=u&&p?Ze(d,u,p):l?"day":"night";if(n===99||n===96)return s>5?"RainHail":"Storm";if(n===95)return"Storm";if([75,86].includes(n))return i>50?"Blizzard":"LightSnowfall";if([71,73,77,85].includes(n))return"LightSnowfall";if([65,66,67,82].includes(n)||[61,63,80,81].includes(n))return l?"DayRain":"NightRain";if([51,53,55,56,57].includes(n))return"drizzle";if([45,48].includes(n))return l?"DayFog":"Mist";if(a>70||i>60)return"Gusty";if(i>40)return"Windy";if(r>38&&o<30)return"Heatwave";if(r<-5||r<0&&s===0)return"frost";if(r>35&&o<20&&s===0)return"Arid";if(h==="sunrise")return"Sunrise";if(h==="morning")return"Morning";if(h==="sunset")return"Sunset";if(h==="dusk")return o>30?"DuskPartlyCloudy":"Sunset";if(l||h==="day")return n===3||o>85?"DayCumulonimbus":o>70?"DayCumulus Formations":o>55?"DayCumulusCongestus":o>40?"DayCumulusCloudStreets":o>25?"DayPartialCloudy":o>10?"DayPartialClean":"DayClear";if(n===3||o>85)return"NightOvercast";if(o>60)return"NightCloudy";if(o>30)return"NightPartialCloudy";if(o>10)return"NightPartialClean";const m=d.getDate();return m>=13&&m<=17?"NightFullMoonClear":o<5?"NightMoonClear":"NightClear"}let R=null,L=!1;function ot(e){if(e===R||L)return;const t=H(e);ne(e);const n=document.getElementById("bg-current"),r=document.getElementById("bg-next");if(!n||!r)return;L=!0;const i=new Image;i.onload=()=>{r.src=t,r.style.opacity="1",n.style.opacity="0",setTimeout(()=>{n.src=t,n.style.opacity="1",r.style.opacity="0",R=e,L=!1},2e3)},i.onerror=()=>{L=!1,console.warn(`[BG] Failed to load: ${e}`)},i.src=t}function at(){const e=document.getElementById("bg-current");if(e){const t=H("DayClear");e.src=t,R="DayClear"}rt()}function st(e,t){var l,c,u;const n=document.getElementById("hero-section");if(!n||!(t!=null&&t.current))return;const r=t.current,i=t.daily,a=((l=i==null?void 0:i.sunrise)==null?void 0:l[0])||"",o=((c=i==null?void 0:i.sunset)==null?void 0:c[0])||"",s=r.is_day===1;n.innerHTML=`
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
      <!-- Left: City & Temp -->
      <div class="space-y-4 flex-1 min-w-0">
        <div class="flex items-center gap-3 flex-wrap">
          <h2 class="text-3xl lg:text-5xl font-bold tracking-tight truncate">${e.name}</h2>
          <span class="text-2xl">${ee(e.country)}</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase
            ${s?"bg-amber-500/20 text-amber-300 border border-amber-400/20":"bg-indigo-500/20 text-indigo-300 border border-indigo-400/20"}">
            ${s?"Daytime":"Nighttime"}
          </span>
        </div>

        <p class="text-sm text-white/40 font-medium">${je(e.tz||"UTC")}</p>

        <div class="flex items-end gap-4">
          <span class="text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-br from-white via-white/90 to-white/60 bg-clip-text text-transparent leading-none">
            ${Math.round(r.temperature_2m)}°
          </span>
          <div class="pb-2 space-y-1">
            <p class="text-lg font-semibold text-white/90">${F(r.weather_code)}</p>
            <p class="text-sm text-white/50">
              ${g("thermometer",14,"inline-block align-middle mr-1")}
              Feels like ${He(r.apparent_temperature)}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-6 text-sm text-white/50 flex-wrap">
          <span class="flex items-center gap-1.5">
            ${g("droplets",14)} ${r.relative_humidity_2m}%
          </span>
          <span class="flex items-center gap-1.5">
            ${g("wind",14)} ${Math.round(r.wind_speed_10m)} km/h ${X(r.wind_direction_10m)}
          </span>
          <span class="flex items-center gap-1.5">
            ${g("gauge",14)} ${((u=r.pressure_msl)==null?void 0:u.toFixed(0))||"--"} hPa
          </span>
          <span class="flex items-center gap-1.5">
            ${g("cloud",14)} ${r.cloud_cover}%
          </span>
        </div>
      </div>

      <!-- Right: Sun Info + Live Clock -->
      <div class="flex flex-col items-end gap-4">
        <div class="text-right">
          <div class="text-5xl font-mono font-bold text-white/90 tracking-tight" id="hero-clock">
            ${q(new Date,e.tz||"UTC")}
          </div>
          <p class="text-xs text-white/30 mt-1 font-medium">${e.tz||"UTC"}</p>
        </div>

        <div class="flex gap-4 text-sm">
          <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-400/10">
            ${g("sunrise",16,"text-amber-400")}
            <span class="text-amber-300 font-medium">${a?A(a):"--:--"}</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-400/10">
            ${g("sunset",16,"text-blue-400")}
            <span class="text-blue-300 font-medium">${o?A(o):"--:--"}</span>
          </div>
        </div>
      </div>
    </div>
  `}function lt(e){var i,a,o,s;const t=document.getElementById("hourly-container");if(!t||!(e!=null&&e.time))return;let n="";const r=Math.min(24,e.time.length);for(let l=0;l<r;l++){const u=new Date(e.time[l]).toLocaleTimeString("en-US",{hour:"2-digit",hour12:!1}),p=Math.round(((i=e.temperature_2m)==null?void 0:i[l])??0),d=((a=e.weather_code)==null?void 0:a[l])??0,h=((o=e.is_day)==null?void 0:o[l])===1,m=((s=e.precipitation_probability)==null?void 0:s[l])??0,k=J(d,h);n+=`
      <div class="flex-shrink-0 flex flex-col items-center gap-2 py-3 px-3 rounded-xl
        bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] transition-all duration-300
        min-w-[72px] cursor-default group">
        <span class="text-xs text-white/40 font-medium">${u}</span>
        <div class="w-7 h-7 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
          ${g(k,22)}
        </div>
        <span class="text-sm font-bold">${p}°</span>
        ${m>0?`<span class="text-[10px] text-cyan-400/70">${m}%</span>`:""}
      </div>
    `}t.innerHTML=n}function ct(e,t,n){var p,d,h;const r=document.getElementById("metrics-grid");if(!r||!e)return;const i=((p=t==null?void 0:t.uv_index)==null?void 0:p[0])??0,a=We(i),o=(d=t==null?void 0:t.visibility)==null?void 0:d[0],s=(h=t==null?void 0:t.dew_point_2m)==null?void 0:h[0],l=e.pressure_msl,c=Ye(l),u=[{label:"Wind Speed",value:`${Math.round(e.wind_speed_10m)}`,unit:"km/h",sub:`Gusts ${Math.round(e.wind_gusts_10m||0)} km/h · ${X(e.wind_direction_10m)}`,iconName:"wind",color:"cyan"},{label:"Humidity",value:`${e.relative_humidity_2m}`,unit:"%",sub:s!=null?`Dew point ${Math.round(s)}°`:"",iconName:"droplets",color:"blue"},{label:"UV Index",value:`${Math.round(i)}`,unit:"",sub:a.label,iconName:"sun",color:"amber",badge:{text:a.label,bg:a.bg}},{label:"Pressure",value:`${(l==null?void 0:l.toFixed(0))||"--"}`,unit:"hPa",sub:`${c.label} pressure`,iconName:"gauge",color:"purple"},{label:"Visibility",value:Ve(o),unit:"",sub:o>1e4?"Crystal clear":o>5e3?"Good":"Reduced",iconName:"eye",color:"emerald"},{label:"Cloud Cover",value:`${e.cloud_cover}`,unit:"%",sub:e.cloud_cover>80?"Overcast":e.cloud_cover>50?"Mostly cloudy":e.cloud_cover>20?"Partly cloudy":"Clear skies",iconName:"cloud",color:"slate"},{label:"Precipitation",value:`${(e.precipitation||0).toFixed(1)}`,unit:"mm",sub:e.rain>0?"Rain":e.snowfall>0?"Snow":"None",iconName:"cloud-rain",color:"sky"},{label:"Feels Like",value:`${Math.round(e.apparent_temperature)}`,unit:"°",sub:e.apparent_temperature<e.temperature_2m?"Feels cooler":e.apparent_temperature>e.temperature_2m?"Feels warmer":"Accurate",iconName:"thermometer",color:"rose"}];r.innerHTML=u.map(m=>`
    <div class="group relative overflow-hidden rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.07]
      p-4 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-8 h-8 rounded-lg bg-${m.color}-500/10 flex items-center justify-center text-${m.color}-400">
          ${g(m.iconName,16)}
        </div>
        <span class="text-xs font-semibold text-white/40 uppercase tracking-wider">${m.label}</span>
      </div>
      <div class="flex items-baseline gap-1">
        <span class="text-2xl font-bold text-white">${m.value}</span>
        <span class="text-sm text-white/40">${m.unit}</span>
      </div>
      ${m.sub?`<p class="text-xs text-white/30 mt-1.5">${m.sub}</p>`:""}
      <div class="absolute inset-0 bg-gradient-to-t from-${m.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  `).join("")}function dt(e){var i,a,o,s;const t=document.getElementById("daily-forecast");if(!t||!(e!=null&&e.time))return;let n="";const r=Math.min(7,e.time.length);for(let l=0;l<r;l++){const c=((i=e.weather_code)==null?void 0:i[l])??0,u=Math.round(((a=e.temperature_2m_max)==null?void 0:a[l])??0),p=Math.round(((o=e.temperature_2m_min)==null?void 0:o[l])??0),d=((s=e.precipitation_probability_max)==null?void 0:s[l])??0,h=J(c,!0),m=Oe(e.time[l]);n+=`
      <div class="flex items-center justify-between py-3 px-4 rounded-xl
        bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/[0.06]
        transition-all duration-300 group">

        <div class="flex items-center gap-3 min-w-[130px]">
          <div class="w-8 h-8 flex items-center justify-center text-white/60 group-hover:text-white transition-colors">
            ${g(h,22)}
          </div>
          <div>
            <p class="text-sm font-semibold ${l===0?"text-cyan-300":"text-white/90"}">${m}</p>
            <p class="text-xs text-white/30">${F(c)}</p>
          </div>
        </div>

        ${d>0?`
          <div class="flex items-center gap-1 text-xs text-cyan-400/60">
            ${g("droplets",12)} ${d}%
          </div>
        `:"<div></div>"}

        <div class="flex items-center gap-3 min-w-[100px] justify-end">
          <span class="text-sm font-bold text-white">${u}°</span>
          <div class="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r from-blue-400 to-amber-400"
              style="width: ${Math.max(10,(u-p)/30*100)}%; margin-left: ${Math.max(0,(p+10)/50*100)}%">
            </div>
          </div>
          <span class="text-sm text-white/40">${p}°</span>
        </div>
      </div>
    `}t.innerHTML=n}function ut(e){const t=document.getElementById("sun-container");if(!t||!(e!=null&&e.sunrise))return;const n=e.sunrise[0],r=e.sunset[0];if(!n||!r)return;const a=Ke(n,r,new Date),o=a>=0&&a<=1,s=A(n),l=A(r),c=new Date(r)-new Date(n),u=Math.floor(c/36e5),p=Math.floor(c%36e5/6e4);t.innerHTML=`
    <div class="relative">
      <!-- Sun Arc SVG -->
      <svg viewBox="0 0 200 110" class="w-full max-w-[280px] mx-auto" xmlns="http://www.w3.org/2000/svg">
        <!-- Arc track -->
        <path d="M 20 95 Q 100 5 180 95" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" stroke-linecap="round"/>
        <!-- Daylight portion -->
        ${o?`
          <path d="M 20 95 Q 100 5 180 95" fill="none" stroke="url(#sunGrad)" stroke-width="2.5" stroke-linecap="round"
            stroke-dasharray="${a*240}" stroke-dashoffset="0"/>
          <!-- Sun dot -->
          <circle cx="${20+a*160}" cy="${95-Math.sin(a*Math.PI)*80}" r="6" fill="#fbbf24"
            filter="url(#sunGlow)"/>
        `:`
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
            ${g("sunrise",14)}
            <span class="text-sm font-semibold">${s}</span>
          </div>
          <p class="text-[10px] text-white/30">Sunrise</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-white/40">${u}h ${p}m daylight</p>
        </div>
        <div class="text-center">
          <div class="flex items-center gap-1 text-orange-400">
            ${g("sunset",14)}
            <span class="text-sm font-semibold">${l}</span>
          </div>
          <p class="text-[10px] text-white/30">Sunset</p>
        </div>
      </div>
    </div>
  `}function pt(e){const t=document.getElementById("aqi-container");if(!t)return;if(!(e!=null&&e.current)){t.innerHTML=`
      <div class="text-center py-4">
        <p class="text-white/30 text-sm">Air quality data unavailable</p>
        <p class="text-white/20 text-xs mt-1">Service may be temporarily offline</p>
      </div>
    `;return}const n=e.current.us_aqi??0,r=Ge(n),i=[{name:"PM2.5",val:e.current.pm2_5,unit:"μg/m³"},{name:"PM10",val:e.current.pm10,unit:"μg/m³"},{name:"O₃",val:e.current.ozone,unit:"μg/m³"},{name:"NO₂",val:e.current.nitrogen_dioxide,unit:"μg/m³"},{name:"SO₂",val:e.current.sulphur_dioxide,unit:"μg/m³"},{name:"CO",val:e.current.carbon_monoxide,unit:"μg/m³"}].filter(a=>a.val!=null);t.innerHTML=`
    <div class="flex items-center gap-4 mb-4">
      <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
        style="background: ${r.color}22; color: ${r.color}; border: 1px solid ${r.color}33;">
        ${n}
      </div>
      <div>
        <p class="font-semibold text-white/90">${r.label}</p>
        <p class="text-xs text-white/40">US AQI Index</p>
      </div>
    </div>

    <!-- AQI Bar -->
    <div class="w-full h-2 rounded-full bg-white/5 overflow-hidden mb-4">
      <div class="h-full rounded-full transition-all duration-1000"
        style="width: ${Math.min(100,n/300*100)}%;
        background: linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444, #a855f7);">
      </div>
    </div>

    <!-- Pollutants -->
    <div class="grid grid-cols-3 gap-2">
      ${i.map(a=>{var o;return`
        <div class="text-center py-2 px-1 rounded-lg bg-white/[0.03] border border-white/5">
          <p class="text-[10px] text-white/30 uppercase">${a.name}</p>
          <p class="text-sm font-semibold text-white/80">${(o=a.val)==null?void 0:o.toFixed(1)}</p>
        </div>
      `}).join("")}
    </div>
  `}function O(){const e=document.getElementById("city-list");if(!e)return;const t=b.cities,n=b.selectedIndex;e.innerHTML=t.map((r,i)=>{const a=b.getWeatherData(r),o=a==null?void 0:a.current,s=i===n;return`
      <div class="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300
        ${s?"bg-white/[0.1] border border-cyan-400/20 shadow-lg shadow-cyan-500/5":"bg-white/[0.03] border border-transparent hover:bg-white/[0.06] hover:border-white/[0.06]"}"
        data-city-index="${i}">

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="text-sm">${ee(r.country)}</span>
            <p class="text-sm font-semibold truncate ${s?"text-cyan-300":"text-white/80"}">${r.name}</p>
          </div>
          ${o?`
            <p class="text-xs text-white/30 mt-0.5">${F(o.weather_code)}</p>
          `:""}
        </div>

        ${o?`
          <span class="text-lg font-bold ${s?"text-white":"text-white/70"}">${Math.round(o.temperature_2m)}°</span>
        `:`
          <div class="w-8 h-5 rounded bg-white/5 animate-pulse"></div>
        `}

        ${t.length>1?`
          <button class="opacity-0 group-hover:opacity-100 hover:!opacity-100 p-1 rounded-lg hover:bg-red-500/20 transition-all text-white/20 hover:text-red-400 remove-city"
            data-remove-index="${i}" title="Remove city">
            ${g("x",12)}
          </button>
        `:""}
      </div>
    `}).join(""),e.querySelectorAll("[data-city-index]").forEach(r=>{r.addEventListener("click",i=>{i.target.closest(".remove-city")||b.selectCity(parseInt(r.dataset.cityIndex))})}),e.querySelectorAll(".remove-city").forEach(r=>{r.addEventListener("click",i=>{i.stopPropagation(),b.removeCity(parseInt(r.dataset.removeIndex))})})}function mt(){const e=document.getElementById("hero-section");e&&(e.innerHTML=`
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
    `);const t=document.getElementById("hourly-container");t&&(t.innerHTML=Array(8).fill("").map(()=>`
      <div class="flex-shrink-0 flex flex-col items-center gap-2 py-3 px-4 rounded-xl bg-white/[0.03] min-w-[72px] animate-pulse">
        <div class="h-3 w-8 bg-white/5 rounded"></div>
        <div class="h-7 w-7 bg-white/5 rounded-full"></div>
        <div class="h-4 w-6 bg-white/5 rounded"></div>
      </div>
    `).join(""));const n=document.getElementById("metrics-grid");n&&(n.innerHTML=Array(8).fill("").map(()=>`
      <div class="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-4 animate-pulse">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-8 h-8 rounded-lg bg-white/5"></div>
          <div class="h-3 w-16 bg-white/5 rounded"></div>
        </div>
        <div class="h-7 w-14 bg-white/5 rounded mb-1"></div>
        <div class="h-3 w-20 bg-white/5 rounded"></div>
      </div>
    `).join(""));const r=document.getElementById("daily-forecast");r&&(r.innerHTML=Array(7).fill("").map(()=>`
      <div class="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] animate-pulse">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-white/5 rounded-full"></div>
          <div class="space-y-1"><div class="h-4 w-20 bg-white/5 rounded"></div><div class="h-3 w-16 bg-white/5 rounded"></div></div>
        </div>
        <div class="h-4 w-24 bg-white/5 rounded"></div>
      </div>
    `).join(""))}let z=null;function ht(e){z&&cancelAnimationFrame(z);const t=()=>{const n=document.getElementById("hero-clock");n&&(n.textContent=q(new Date,e||"UTC")),z=requestAnimationFrame(t)};t()}function ft(){const e=document.getElementById("loading-overlay");e&&(e.style.opacity="0",setTimeout(()=>e.remove(),600))}B.register(...oe);let x=null,v=null,C=null;const w={family:"'Space Grotesk', 'Inter', sans-serif",size:11},E="rgba(255,255,255,0.06)",S="rgba(255,255,255,0.4)";function gt(e){var c,u,p;const t=document.getElementById("temp-chart");if(!t||!e)return;const n=t.getContext("2d");new Date().getHours();const i=[],a=[],o=[];for(let d=0;d<24&&d<(((c=e.time)==null?void 0:c.length)||0);d++){const h=new Date(e.time[d]);i.push(h.toLocaleTimeString("en-US",{hour:"2-digit",hour12:!1})),a.push((u=e.temperature_2m)==null?void 0:u[d]),o.push((p=e.apparent_temperature)==null?void 0:p[d])}if(x){x.data.labels=i,x.data.datasets[0].data=a,x.data.datasets[1].data=o,x.update("none");return}const s=n.createLinearGradient(0,0,0,t.height);s.addColorStop(0,"rgba(56, 189, 248, 0.3)"),s.addColorStop(1,"rgba(56, 189, 248, 0.0)");const l=n.createLinearGradient(0,0,0,t.height);l.addColorStop(0,"rgba(168, 85, 247, 0.2)"),l.addColorStop(1,"rgba(168, 85, 247, 0.0)"),x=new B(n,{type:"line",data:{labels:i,datasets:[{label:"Temperature",data:a,borderColor:"#38bdf8",backgroundColor:s,fill:!0,tension:.4,pointRadius:0,pointHoverRadius:6,pointHoverBackgroundColor:"#38bdf8",pointHoverBorderColor:"#fff",pointHoverBorderWidth:2,borderWidth:2.5},{label:"Feels Like",data:o,borderColor:"#a855f7",backgroundColor:l,fill:!0,tension:.4,pointRadius:0,pointHoverRadius:5,borderWidth:1.5,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,animation:{duration:1e3,easing:"easeOutQuart"},interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!0,position:"top",align:"end",labels:{color:S,font:w,boxWidth:12,padding:16}},tooltip:{backgroundColor:"rgba(15, 23, 42, 0.9)",borderColor:"rgba(255, 255, 255, 0.1)",borderWidth:1,titleFont:w,bodyFont:w,padding:12,cornerRadius:12,callbacks:{label:d=>{var h;return`${d.dataset.label}: ${(h=d.parsed.y)==null?void 0:h.toFixed(1)}°C`}}}},scales:{x:{ticks:{color:S,font:w,maxRotation:0,maxTicksLimit:8},grid:{color:E,drawBorder:!1}},y:{ticks:{color:S,font:w,callback:d=>`${d}°`},grid:{color:E,drawBorder:!1}}}}})}function bt(e){var o,s,l;const t=document.getElementById("precip-chart");if(!t||!e)return;const n=t.getContext("2d"),r=[],i=[],a=[];for(let c=0;c<24&&c<(((o=e.time)==null?void 0:o.length)||0);c++){const u=new Date(e.time[c]);r.push(u.toLocaleTimeString("en-US",{hour:"2-digit",hour12:!1})),i.push(((s=e.precipitation)==null?void 0:s[c])||0),a.push(((l=e.precipitation_probability)==null?void 0:l[c])||0)}if(v){v.data.labels=r,v.data.datasets[0].data=i,v.data.datasets[1].data=a,v.update("none");return}v=new B(n,{type:"bar",data:{labels:r,datasets:[{label:"Precipitation (mm)",data:i,backgroundColor:"rgba(56, 189, 248, 0.6)",borderColor:"rgba(56, 189, 248, 0.9)",borderWidth:1,borderRadius:4,barPercentage:.6,yAxisID:"y"},{label:"Probability (%)",data:a,type:"line",borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!0,tension:.4,pointRadius:0,borderWidth:2,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,animation:{duration:1e3,easing:"easeOutQuart"},interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!0,position:"top",align:"end",labels:{color:S,font:w,boxWidth:12,padding:16}},tooltip:{backgroundColor:"rgba(15, 23, 42, 0.9)",borderColor:"rgba(255, 255, 255, 0.1)",borderWidth:1,titleFont:w,bodyFont:w,padding:12,cornerRadius:12}},scales:{x:{ticks:{color:S,font:w,maxRotation:0,maxTicksLimit:8},grid:{color:E,drawBorder:!1}},y:{position:"left",ticks:{color:S,font:w,callback:c=>`${c}mm`},grid:{color:E,drawBorder:!1}},y1:{position:"right",min:0,max:100,ticks:{color:"rgba(245, 158, 11, 0.5)",font:w,callback:c=>`${c}%`},grid:{display:!1}}}}})}function wt(e){const t=document.getElementById("wind-chart");if(!t||!e)return;const n=Math.round(e.wind_speed_10m||0),r=Math.round(e.wind_gusts_10m||n),i=e.wind_direction_10m||0,o=["N","NE","E","SE","S","SW","W","NW"][Math.round(i/45)%8];if(C){C.updateSeries([n]);return}const s=Math.max(100,r+20);C=new ae(t,{chart:{type:"radialBar",height:"100%",sparkline:{enabled:!1},background:"transparent",animations:{enabled:!0,easing:"easeinout",speed:1200,dynamicAnimation:{enabled:!0,speed:600}}},series:[Math.round(n/s*100)],plotOptions:{radialBar:{startAngle:-135,endAngle:135,hollow:{size:"60%",background:"transparent"},track:{background:"rgba(255,255,255,0.05)",strokeWidth:"100%"},dataLabels:{name:{show:!0,fontSize:"12px",fontFamily:"'Space Grotesk', sans-serif",color:"rgba(255,255,255,0.5)",offsetY:-10},value:{show:!0,fontSize:"28px",fontFamily:"'Space Grotesk', sans-serif",fontWeight:700,color:"#ffffff",offsetY:5,formatter:()=>`${n}`}}}},labels:[`${o} · km/h`],fill:{type:"gradient",gradient:{shade:"dark",type:"horizontal",colorStops:[{offset:0,color:"#22d3ee",opacity:1},{offset:50,color:"#3b82f6",opacity:1},{offset:100,color:"#8b5cf6",opacity:1}]}},stroke:{lineCap:"round"},grid:{padding:{top:-10,bottom:-15}},subtitle:{text:`Gusts: ${r} km/h`,align:"center",offsetY:180,style:{fontSize:"11px",fontFamily:"'Space Grotesk', sans-serif",color:"rgba(255,255,255,0.4)"}}}),C.render()}function xt(){x&&(x.destroy(),x=null),v&&(v.destroy(),v=null),C&&(C.destroy(),C=null)}var vt=se();const y=le(vt);let f=null,$=null,M=[],I=0,P=null,_=null;const yt="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",_t='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',re=y.divIcon({html:`<div style="
    width: 20px; height: 20px;
    background: radial-gradient(circle, #22d3ee 0%, #3b82f6 100%);
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.8);
    box-shadow: 0 0 20px rgba(34,211,238,0.6), 0 0 40px rgba(34,211,238,0.3);
    animation: mapPulse 2s infinite;
  "></div>`,className:"custom-marker",iconSize:[20,20],iconAnchor:[10,10]});function Ct(e=-23.55,t=-46.64){const n=document.getElementById("weather-map");n&&(f&&(f.remove(),f=null),f=y.map(n,{center:[e,t],zoom:8,zoomControl:!1,attributionControl:!1}),y.tileLayer(yt,{attribution:_t,maxZoom:18,subdomains:"abcd"}).addTo(f),y.control.zoom({position:"bottomright"}).addTo(f),y.control.attribution({position:"bottomleft",prefix:""}).addTo(f),$=y.marker([e,t],{icon:re}).addTo(f),$t(),setTimeout(()=>f.invalidateSize(),300))}function St(e,t,n){if(!f){Ct(e,t);return}f.flyTo([e,t],8,{duration:1.5,easeLinearity:.25}),$?$.setLatLng([e,t]):$=y.marker([e,t],{icon:re}).addTo(f),n&&$.bindPopup(`
      <div style="
        background: rgba(15,23,42,0.95);
        color: white;
        padding: 8px 14px;
        border-radius: 10px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 13px;
        border: 1px solid rgba(255,255,255,0.1);
        backdrop-filter: blur(10px);
      ">
        <strong>${n}</strong>
      </div>
    `,{className:"skylog-popup",closeButton:!1}),setTimeout(()=>f.invalidateSize(),300)}async function $t(){var e;if(f)try{if(_=await nt(),!((e=_==null?void 0:_.radar)!=null&&e.past))return;M.forEach(n=>f.removeLayer(n)),M=[],[..._.radar.past,..._.radar.nowcast||[]].forEach((n,r)=>{const i=y.tileLayer(`${_.host}${n.path}/256/{z}/{x}/{y}/4/1_1.png`,{opacity:0,zIndex:300+r});i.addTo(f),M.push(i)}),Mt()}catch(t){console.warn("[MAP] Radar load failed:",t)}}function Mt(){P&&clearInterval(P),I=0,P=setInterval(()=>{M.forEach((e,t)=>{e.setOpacity(t===I?.5:0)}),I=(I+1)%M.length},800)}function j(){Z({icons:{Search:Ie,CloudRainWind:ye,Thermometer:Ne,Wind:ze,Droplets:Se,Gauge:Me,Eye:$e,Sun:Ee,Cloud:Ce,CloudLightning:ve,CloudRain:_e,Snowflake:Ae,Clock:xe,Calendar:fe,LineChart:be,BarChart3:ge,Map:ke,Sunrise:Te,Sunset:De,X:Pe,ChevronRight:we,Menu:Le}})}async function kt(){console.log("[SKYLOG] Initializing Intelligence Hub..."),Lt(),at(),O(),await ie(b.selectedCity),ft()}async function ie(e){if(e){b.setLoading(!0),mt();try{const[t,n]=await Promise.all([Xe(e.lat,e.lon,e.tz),et(e.lat,e.lon)]);if(t){b.setWeatherData(e,t),b.setAirQuality(e,n);const r=it(t);ot(r),st(e,t),lt(t.hourly),dt(t.daily),ct(t.current,t.hourly,t.daily),ut(t.daily),pt(n),O(),xt(),gt(t.hourly),bt(t.hourly),wt(t.current),St(e.lat,e.lon,e.name),ht(e.tz),j()}}catch(t){console.error("[SKYLOG] Load error:",t)}finally{b.setLoading(!1)}}}function Lt(){b.on("cityChanged",n=>{ie(n)}),b.on("citiesUpdated",()=>{O()});const e=document.getElementById("city-search"),t=document.getElementById("search-results");if(e&&t){const n=Qe(async r=>{if(!r){t.classList.add("hidden");return}const i=await tt(r);i.length>0?(t.innerHTML=i.map((a,o)=>`
          <div class="search-item p-3 cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-between group" data-idx="${o}">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate">${a.name}</p>
              <p class="text-[10px] text-white/30 truncate">${a.display}</p>
            </div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-white/20 group-hover:text-cyan-400 transition-colors"></i>
          </div>
        `).join(""),t.classList.remove("hidden"),j(),t.querySelectorAll(".search-item").forEach(a=>{a.addEventListener("click",()=>{const o=i[a.dataset.idx];b.addCity(o),e.value="",t.classList.add("hidden")})})):(t.innerHTML='<p class="p-4 text-xs text-center text-white/20">No cities found</p>',t.classList.remove("hidden"))},400);e.addEventListener("input",r=>n(r.target.value)),document.addEventListener("click",r=>{!e.contains(r.target)&&!t.contains(r.target)&&t.classList.add("hidden")})}}window.addEventListener("unhandledrejection",e=>{console.warn("[SKYLOG] Async error:",e.reason)});window.addEventListener("DOMContentLoaded",()=>{j(),kt()});
