import{C as O,r as _e,u as Se}from"./charts-C_ASVdvE.js";import{r as $e,g as Me}from"./maps-zdHhRoWp.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=r(i);fetch(i.href,a)}})();/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=([e,t,r])=>{const n=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(i=>{n.setAttribute(i,String(t[i]))}),r!=null&&r.length&&r.forEach(i=>{const a=pe(i);n.appendChild(a)}),n},ke=(e,t={})=>{const n={...ue,...t};return pe(["svg",n,e])};/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=(...e)=>e.filter((t,r,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===r).join(" ").trim();/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,n)=>n?n.toUpperCase():r.toLowerCase());/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=e=>{const t=Ie(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=e=>Array.from(e.attributes).reduce((t,r)=>(t[r.name]=r.value,t),{}),G=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",Q=(e,{nameAttr:t,icons:r,attrs:n})=>{var m;const i=e.getAttribute(t);if(i==null)return;const a=Ee(i),o=r[a];if(!o)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const s=Te(e),l=Le(s)?{}:{"aria-hidden":"true"},c={...ue,"data-lucide":i,...l,...n,...s},u=G(s),p=G(n),d=Ae("lucide",`lucide-${i}`,...u,...p);d&&Object.assign(c,{class:d});const h=ke(o,c);return(m=e.parentNode)==null?void 0:m.replaceChild(h,e)};/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"m19 9-5 5-4-4-3 3"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=[["path",{d:"m9 18 6-6-6-6"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=[["path",{d:"M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"}],["path",{d:"m13 12-3 5h4l-3 5"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"m9.2 22 3-7"}],["path",{d:"m9 13-3 7"}],["path",{d:"m17 13-3 7"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"M16 14v6"}],["path",{d:"M8 14v6"}],["path",{d:"M12 16v6"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge=[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"}],["path",{d:"M15 5.764v15"}],["path",{d:"M9 3.236v15"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qe=[["path",{d:"M4 5h16"}],["path",{d:"M4 12h16"}],["path",{d:"M4 19h16"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=[["path",{d:"m10 20-1.25-2.5L6 18"}],["path",{d:"M10 4 8.75 6.5 6 6"}],["path",{d:"m14 20 1.25-2.5L18 18"}],["path",{d:"m14 4 1.25 2.5L18 6"}],["path",{d:"m17 21-3-6h-4"}],["path",{d:"m17 3-3 6 1.5 3"}],["path",{d:"M2 12h6.5L10 9"}],["path",{d:"m20 10-1.5 2 1.5 2"}],["path",{d:"M22 12h-6.5L14 15"}],["path",{d:"m4 10 1.5 2L4 14"}],["path",{d:"m7 21 3-6-1.5-3"}],["path",{d:"m7 3 3 6h4"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=[["path",{d:"M12 10V2"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m16 6-4 4-4-4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];/**
 * @license lucide v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=({icons:e={},nameAttr:t="data-lucide",attrs:r={},root:n=document,inTemplates:i}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof n>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(n.querySelectorAll(`[${t}]`)).forEach(o=>Q(o,{nameAttr:t,icons:e,attrs:r})),i&&Array.from(n.querySelectorAll("template")).forEach(s=>me({icons:e,nameAttr:t,attrs:r,root:s.content,inTemplates:i})),t==="data-lucide"){const o=n.querySelectorAll("[icon-name]");o.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(o).forEach(s=>Q(s,{nameAttr:"icon-name",icons:e,attrs:r})))}},tt="https://raw.githubusercontent.com/Pedroxious/skylog/main/conditions/",nt="https://raw.githubusercontent.com/Pedroxious/skylog/main/cards/",rt=[{name:"São Paulo",country:"BR",lat:-23.5505,lon:-46.6333,tz:"America/Sao_Paulo"},{name:"Rio de Janeiro",country:"BR",lat:-22.9068,lon:-43.1729,tz:"America/Sao_Paulo"},{name:"Buenos Aires",country:"AR",lat:-34.6037,lon:-58.3816,tz:"America/Argentina/Buenos_Aires"},{name:"Mexico City",country:"MX",lat:19.4326,lon:-99.1332,tz:"America/Mexico_City"},{name:"Havana",country:"CU",lat:23.1136,lon:-82.3666,tz:"America/Havana"},{name:"Miami",country:"US",lat:25.7617,lon:-80.1918,tz:"America/New_York"},{name:"New York",country:"US",lat:40.7128,lon:-74.006,tz:"America/New_York"},{name:"London",country:"GB",lat:51.5074,lon:-.1278,tz:"Europe/London"},{name:"Paris",country:"FR",lat:48.8566,lon:2.3522,tz:"Europe/Paris"},{name:"Moscow",country:"RU",lat:55.7558,lon:37.6173,tz:"Europe/Moscow"},{name:"Bangkok",country:"TH",lat:13.7563,lon:100.5018,tz:"Asia/Bangkok"},{name:"Tokyo",country:"JP",lat:35.6762,lon:139.6503,tz:"Asia/Tokyo"},{name:"Dubai",country:"AE",lat:25.2048,lon:55.2708,tz:"Asia/Dubai"},{name:"Cairo",country:"EG",lat:30.0444,lon:31.2357,tz:"Africa/Cairo"},{name:"Sydney",country:"AU",lat:-33.8688,lon:151.2093,tz:"Australia/Sydney"}],it={0:"Clear Sky",1:"Mainly Clear",2:"Partly Cloudy",3:"Overcast",45:"Fog",48:"Rime Fog",51:"Light Drizzle",53:"Moderate Drizzle",55:"Dense Drizzle",56:"Freezing Drizzle",57:"Heavy Freezing Drizzle",61:"Slight Rain",63:"Moderate Rain",65:"Heavy Rain",66:"Freezing Rain",67:"Heavy Freezing Rain",71:"Light Snow",73:"Moderate Snow",75:"Heavy Snow",77:"Snow Grains",80:"Light Showers",81:"Moderate Showers",82:"Violent Showers",85:"Light Snow Showers",86:"Heavy Snow Showers",95:"Thunderstorm",96:"Thunderstorm with Hail",99:"Severe Thunderstorm"};function W(e){return it[e]||"Unknown"}function he(e,t){return[0,1].includes(e)?t?"sun":"moon":e===2?t?"cloud-sun":"cloud-moon":e===3?"cloud":[45,48].includes(e)?"cloud-fog":[51,53,55,56,57].includes(e)?"cloud-drizzle":[61,63,80,81].includes(e)?"cloud-rain":[65,66,67,82].includes(e)?"cloud-rain-wind":[71,73,75,77,85,86].includes(e)?"snowflake":[95,96,99].includes(e)?"cloud-lightning":"cloud"}function at(e,t="C"){return e==null?"--":`${Math.round(e)}°${t==="F"?"F":""}`}function fe(e,t){return new Intl.DateTimeFormat("en-US",{timeZone:t,hour:"2-digit",minute:"2-digit",hour12:!1}).format(e)}function T(e){return new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}function ot(e){const t=new Date(e),r=new Date;if(t.toDateString()===r.toDateString())return"Today";const n=new Date(r);return n.setDate(n.getDate()+1),t.toDateString()===n.toDateString()?"Tomorrow":t.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function st(e){return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(new Date)}const lt=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];function ge(e){if(e==null)return"--";const t=Math.round(e/22.5)%16;return lt[t]}function ct(e){return e<=2?{label:"Low",color:"#22c55e",bg:"bg-green-500"}:e<=5?{label:"Moderate",color:"#eab308",bg:"bg-yellow-500"}:e<=7?{label:"High",color:"#f97316",bg:"bg-orange-500"}:e<=10?{label:"Very High",color:"#ef4444",bg:"bg-red-500"}:{label:"Extreme",color:"#a855f7",bg:"bg-purple-500"}}function dt(e){return e<=50?{label:"Good",color:"#22c55e",emoji:"🟢"}:e<=100?{label:"Moderate",color:"#eab308",emoji:"🟡"}:e<=150?{label:"Unhealthy (Sensitive)",color:"#f97316",emoji:"🟠"}:e<=200?{label:"Unhealthy",color:"#ef4444",emoji:"🔴"}:e<=300?{label:"Very Unhealthy",color:"#a855f7",emoji:"🟣"}:{label:"Hazardous",color:"#7f1d1d",emoji:"⚫"}}function ut(e,t=300){let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>e(...n),t)}}function pt(e){return e==null?"--":e>=1e4?`${(e/1e3).toFixed(0)} km`:e>=1e3?`${(e/1e3).toFixed(1)} km`:`${e} m`}function mt(e){return e>1020?{label:"High",icon:"arrow-up"}:e<1e3?{label:"Low",icon:"arrow-down"}:{label:"Normal",icon:"minus"}}function be(e){if(!e||e.length!==2)return"🌍";const t=[...e.toUpperCase()].map(r=>127462+r.charCodeAt(0)-65);return String.fromCodePoint(...t)}function ht(e,t,r){const n=new Date(e).getTime(),i=new Date(t).getTime(),a=r.getTime();return a<n||a>i?-1:(a-n)/(i-n)}function ft(e,t,r){const n=e.getTime(),i=new Date(t).getTime(),a=new Date(r).getTime(),o=1800*1e3,s=5400*1e3;return Math.abs(n-i)<o?"sunrise":n>i&&n<i+s?"morning":Math.abs(n-a)<o?"sunset":n>a-o&&n<a+o?"dusk":n>i&&n<a?"day":"night"}function b(e,t=18,r=""){return`<i data-lucide="${e}" class="${r}" style="width:${t}px;height:${t}px;"></i>`}const Y="skylog_cities",R="skylog_selected";class gt{constructor(){this._listeners={},this.cities=this._loadCities(),this.selectedIndex=this._loadSelected(),this.weatherData={},this.airQualityData={},this.loading=!0,this.searchResults=[],this.searchOpen=!1}on(t,r){return this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(r),()=>{this._listeners[t]=this._listeners[t].filter(n=>n!==r)}}emit(t,r){(this._listeners[t]||[]).forEach(n=>n(r))}get selectedCity(){return this.cities[this.selectedIndex]||this.cities[0]}selectCity(t){t<0||t>=this.cities.length||(this.selectedIndex=t,localStorage.setItem(R,t),this.emit("cityChanged",this.selectedCity))}addCity(t){const r=this.cities.find(i=>Math.abs(i.lat-t.lat)<.01&&Math.abs(i.lon-t.lon)<.01);if(r){const i=this.cities.indexOf(r);this.selectCity(i);return}this.cities.push(t),this._saveCities();const n=this.cities.length-1;this.selectCity(n),this.emit("citiesUpdated",this.cities)}removeCity(t){this.cities.length<=1||(this.cities.splice(t,1),this._saveCities(),this.selectedIndex>=this.cities.length&&(this.selectedIndex=this.cities.length-1),localStorage.setItem(R,this.selectedIndex),this.emit("citiesUpdated",this.cities),this.emit("cityChanged",this.selectedCity))}setWeatherData(t,r){const n=`${t.lat}:${t.lon}`;this.weatherData[n]=r,this.emit("weatherUpdated",{city:t,data:r})}getWeatherData(t){return t&&this.weatherData[`${t.lat}:${t.lon}`]||null}setAirQuality(t,r){const n=`${t.lat}:${t.lon}`;this.airQualityData[n]=r,this.emit("aqiUpdated",{city:t,data:r})}getAirQuality(t){return t&&this.airQualityData[`${t.lat}:${t.lon}`]||null}setLoading(t){this.loading=t,this.emit("loadingChanged",t)}_loadCities(){try{const t=localStorage.getItem(Y);if(t){const r=JSON.parse(t);if(Array.isArray(r)&&r.length>0)return r}}catch{}return[...rt]}_saveCities(){localStorage.setItem(Y,JSON.stringify(this.cities))}_loadSelected(){try{const t=parseInt(localStorage.getItem(R),10);if(!isNaN(t)&&t>=0)return t}catch{}return 0}}const f=new gt,we=new Map,bt=300*1e3;function z(e){const t=we.get(e);return t&&Date.now()-t.ts<bt?t.data:null}function P(e,t){we.set(e,{data:t,ts:Date.now()})}async function xe(e,t,r){const n=`weather:${e}:${t}`,i=z(n);if(i)return i;const a=new URLSearchParams({latitude:e,longitude:t,timezone:r||"auto",current:["temperature_2m","relative_humidity_2m","apparent_temperature","is_day","precipitation","rain","showers","snowfall","weather_code","cloud_cover","pressure_msl","surface_pressure","wind_speed_10m","wind_direction_10m","wind_gusts_10m"].join(","),hourly:["temperature_2m","relative_humidity_2m","dew_point_2m","apparent_temperature","precipitation_probability","precipitation","weather_code","cloud_cover","visibility","wind_speed_10m","wind_direction_10m","uv_index","is_day"].join(","),daily:["weather_code","temperature_2m_max","temperature_2m_min","apparent_temperature_max","apparent_temperature_min","sunrise","sunset","uv_index_max","precipitation_sum","precipitation_probability_max","wind_speed_10m_max","wind_gusts_10m_max"].join(","),forecast_days:7});try{const o=await fetch(`https://api.open-meteo.com/v1/forecast?${a}`);if(!o.ok)throw new Error(`Weather API: ${o.status}`);const s=await o.json();return P(n,s),s}catch(o){return console.error("[API] Weather fetch failed:",o),null}}async function ve(e,t){const r=`aqi:${e}:${t}`,n=z(r);if(n)return n;const i=new URLSearchParams({latitude:e,longitude:t,current:["us_aqi","pm10","pm2_5","carbon_monoxide","nitrogen_dioxide","sulphur_dioxide","ozone"].join(",")});try{const a=await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${i}`);if(!a.ok)throw new Error(`AQI API: ${a.status}`);const o=await a.json();return P(r,o),o}catch(a){return console.error("[API] Air quality fetch failed:",a),null}}async function wt(e){if(!e||e.length<2)return[];const t=`search:${e.toLowerCase()}`,r=z(t);if(r)return r;try{const n=new URLSearchParams({q:e,format:"json",limit:8,addressdetails:1,"accept-language":"en"}),i=await fetch(`https://nominatim.openstreetmap.org/search?${n}`,{headers:{"User-Agent":"SkylogWeatherDashboard/2.0"}});if(!i.ok)throw new Error(`Search API: ${i.status}`);const o=(await i.json()).filter(s=>s.type==="city"||s.type==="town"||s.type==="village"||s.type==="administrative"||s.class==="place"||s.class==="boundary").map(s=>{var l,c,u,p,d;return{name:((l=s.address)==null?void 0:l.city)||((c=s.address)==null?void 0:c.town)||((u=s.address)==null?void 0:u.village)||s.display_name.split(",")[0],country:((d=(p=s.address)==null?void 0:p.country_code)==null?void 0:d.toUpperCase())||"",lat:parseFloat(s.lat),lon:parseFloat(s.lon),display:s.display_name,tz:"auto"}});return P(t,o),o}catch(n){return console.error("[API] City search failed:",n),[]}}async function xt(){const e="radar:timestamps",t=z(e);if(t)return t;try{const r=await fetch("https://api.rainviewer.com/public/weather-maps.json");if(!r.ok)throw new Error(`Radar API: ${r.status}`);const n=await r.json();return P(e,n),n}catch(r){return console.error("[API] Radar timestamps failed:",r),null}}const V=new Set;function j(e){return`${tt}${encodeURIComponent(e)}.webp`}function vt(e){if(V.has(e))return;V.add(e);const t=new Image;t.src=j(e)}function yt(){["DayClear","NightClear","DayPartialCloudy","NightCloudy","DayRain","NightRain","Morning","Sunset","Sunrise"].forEach(vt)}function K(e){var A,U;if(!(e!=null&&e.current))return"DayClear";const t=e.current,r=t.weather_code,n=t.temperature_2m,i=t.wind_speed_10m,a=t.wind_gusts_10m||i,o=t.cloud_cover??0,s=t.precipitation??0,l=t.is_day===1,c=e.daily,u=((A=c==null?void 0:c.sunrise)==null?void 0:A[0])||null,p=((U=c==null?void 0:c.sunset)==null?void 0:U[0])||null,d=new Date,h=u&&p?ft(d,u,p):l?"day":"night";if(r===99||r===96)return s>5?"RainHail":"Storm";if(r===95)return"Storm";if([75,86].includes(r))return i>50?"Blizzard":"LightSnowfall";if([71,73,77,85].includes(r))return"LightSnowfall";if([65,66,67,82].includes(r)||[61,63,80,81].includes(r))return l?"DayRain":"NightRain";if([51,53,55,56,57].includes(r))return"drizzle";if([45,48].includes(r))return l?"DayFog":"Mist";if(a>70||i>60)return"Gusty";if(i>40)return"Windy";if(n>38&&o<30)return"Heatwave";if(n<-5||n<0&&s===0)return"frost";if(n>35&&o<20&&s===0)return"Arid";if(h==="sunrise")return"Sunrise";if(h==="morning")return"Morning";if(h==="sunset")return"Sunset";if(h==="dusk")return o>30?"DuskPartlyCloudy":"Sunset";if(l||h==="day")return r===3||o>85?"DayCumulonimbus":o>70?"DayCumulus Formations":o>55?"DayCumulusCongestus":o>40?"DayCumulusCloudStreets":o>25?"DayPartialCloudy":o>10?"DayPartialClean":"DayClear";if(r===3||o>85)return"NightOvercast";if(o>60)return"NightCloudy";if(o>30)return"NightPartialCloudy";if(o>10)return"NightPartialClean";const m=d.getDate();return m>=13&&m<=17?"NightFullMoonClear":o<5?"NightMoonClear":"NightClear"}let F=null,I=null,y=null;function Z(e){if(e===F)return;const t=j(e),r=document.getElementById("bg-current"),n=document.getElementById("bg-next");if(!r||!n)return;y&&(y.onload=null,y.onerror=null),I&&clearTimeout(I);const i=new Image;y=i,i.onload=()=>{y===i&&(n.src=t,n.style.opacity="1",r.style.opacity="0",I=setTimeout(()=>{r.src=t,r.style.opacity="1",n.style.opacity="0",n.src="",F=e,I=null,y=null},750))},i.onerror=()=>{y===i&&(y=null,console.warn(`[BG] Failed to load: ${e}`))},i.src=t}function Ct(){const e=document.getElementById("bg-current");if(e){const t=j("DayClear");e.src=t,F="DayClear"}yt()}function q(e,t){var l,c,u;const r=document.getElementById("hero-section");if(!r||!(t!=null&&t.current))return;const n=t.current,i=t.daily,a=((l=i==null?void 0:i.sunrise)==null?void 0:l[0])||"",o=((c=i==null?void 0:i.sunset)==null?void 0:c[0])||"",s=n.is_day===1;r.innerHTML=`
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
      <!-- Left: City & Temp -->
      <div class="space-y-4 flex-1 min-w-0">
        <div class="flex items-center gap-3 flex-wrap">
          <h2 class="text-3xl lg:text-5xl font-bold tracking-tight truncate">${e.name}</h2>
          <span class="text-2xl">${be(e.country)}</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase
            ${s?"bg-amber-500/20 text-amber-300 border border-amber-400/20":"bg-indigo-500/20 text-indigo-300 border border-indigo-400/20"}">
            ${s?"Daytime":"Nighttime"}
          </span>
        </div>

        <p class="text-sm text-white/40 font-medium">${st(e.tz||"UTC")}</p>

        <div class="flex items-end gap-4">
          <span class="text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-br from-white via-white/90 to-white/60 bg-clip-text text-transparent leading-none">
            ${Math.round(n.temperature_2m)}°
          </span>
          <div class="pb-2 space-y-1">
            <p class="text-lg font-semibold text-white/90">${W(n.weather_code)}</p>
            <p class="text-sm text-white/50">
              ${b("thermometer",14,"inline-block align-middle mr-1")}
              Feels like ${at(n.apparent_temperature)}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-6 text-sm text-white/50 flex-wrap">
          <span class="flex items-center gap-1.5">
            ${b("droplets",14)} ${n.relative_humidity_2m}%
          </span>
          <span class="flex items-center gap-1.5">
            ${b("wind",14)} ${Math.round(n.wind_speed_10m)} km/h ${ge(n.wind_direction_10m)}
          </span>
          <span class="flex items-center gap-1.5">
            ${b("gauge",14)} ${((u=n.pressure_msl)==null?void 0:u.toFixed(0))||"--"} hPa
          </span>
          <span class="flex items-center gap-1.5">
            ${b("cloud",14)} ${n.cloud_cover}%
          </span>
        </div>
      </div>

      <!-- Right: Sun Info + Live Clock -->
      <div class="flex flex-col items-end gap-4">
        <div class="text-right">
          <div class="text-5xl font-mono font-bold text-white/90 tracking-tight" id="hero-clock">
            ${fe(new Date,e.tz||"UTC")}
          </div>
          <p class="text-xs text-white/30 mt-1 font-medium">${e.tz||"UTC"}</p>
        </div>

        <div class="flex gap-4 text-sm">
          <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-400/10">
            ${b("sunrise",16,"text-amber-400")}
            <span class="text-amber-300 font-medium">${a?T(a):"--:--"}</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-400/10">
            ${b("sunset",16,"text-blue-400")}
            <span class="text-blue-300 font-medium">${o?T(o):"--:--"}</span>
          </div>
        </div>
      </div>
    </div>
  `}function J(e){var i,a,o,s;const t=document.getElementById("hourly-container");if(!t||!(e!=null&&e.time))return;let r="";const n=Math.min(24,e.time.length);for(let l=0;l<n;l++){const u=new Date(e.time[l]).toLocaleTimeString("en-US",{hour:"2-digit",hour12:!1}),p=Math.round(((i=e.temperature_2m)==null?void 0:i[l])??0),d=((a=e.weather_code)==null?void 0:a[l])??0,h=((o=e.is_day)==null?void 0:o[l])===1,m=((s=e.precipitation_probability)==null?void 0:s[l])??0,A=he(d,h);r+=`
      <div class="flex-shrink-0 flex flex-col items-center gap-2 py-3 px-3 rounded-xl
        bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] transition-all duration-300
        min-w-[72px] cursor-default group">
        <span class="text-xs text-white/40 font-medium">${u}</span>
        <div class="w-7 h-7 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
          ${b(A,22)}
        </div>
        <span class="text-sm font-bold">${p}°</span>
        ${m>0?`<span class="text-[10px] text-cyan-400/70">${m}%</span>`:""}
      </div>
    `}t.innerHTML=r}function X(e,t,r){var p,d,h;const n=document.getElementById("metrics-grid");if(!n||!e)return;const i=((p=t==null?void 0:t.uv_index)==null?void 0:p[0])??0,a=ct(i),o=(d=t==null?void 0:t.visibility)==null?void 0:d[0],s=(h=t==null?void 0:t.dew_point_2m)==null?void 0:h[0],l=e.pressure_msl,c=mt(l),u=[{label:"Wind Speed",value:`${Math.round(e.wind_speed_10m)}`,unit:"km/h",sub:`Gusts ${Math.round(e.wind_gusts_10m||0)} km/h · ${ge(e.wind_direction_10m)}`,iconName:"wind",color:"cyan"},{label:"Humidity",value:`${e.relative_humidity_2m}`,unit:"%",sub:s!=null?`Dew point ${Math.round(s)}°`:"",iconName:"droplets",color:"blue"},{label:"UV Index",value:`${Math.round(i)}`,unit:"",sub:a.label,iconName:"sun",color:"amber",badge:{text:a.label,bg:a.bg}},{label:"Pressure",value:`${(l==null?void 0:l.toFixed(0))||"--"}`,unit:"hPa",sub:`${c.label} pressure`,iconName:"gauge",color:"purple"},{label:"Visibility",value:pt(o),unit:"",sub:o>1e4?"Crystal clear":o>5e3?"Good":"Reduced",iconName:"eye",color:"emerald"},{label:"Cloud Cover",value:`${e.cloud_cover}`,unit:"%",sub:e.cloud_cover>80?"Overcast":e.cloud_cover>50?"Mostly cloudy":e.cloud_cover>20?"Partly cloudy":"Clear skies",iconName:"cloud",color:"slate"},{label:"Precipitation",value:`${(e.precipitation||0).toFixed(1)}`,unit:"mm",sub:e.rain>0?"Rain":e.snowfall>0?"Snow":"None",iconName:"cloud-rain",color:"sky"},{label:"Feels Like",value:`${Math.round(e.apparent_temperature)}`,unit:"°",sub:e.apparent_temperature<e.temperature_2m?"Feels cooler":e.apparent_temperature>e.temperature_2m?"Feels warmer":"Accurate",iconName:"thermometer",color:"rose"}];n.innerHTML=u.map(m=>`
    <div class="group relative overflow-hidden rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.07]
      p-4 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-8 h-8 rounded-lg bg-${m.color}-500/10 flex items-center justify-center text-${m.color}-400">
          ${b(m.iconName,16)}
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
  `).join("")}function ee(e){var i,a,o,s;const t=document.getElementById("daily-forecast");if(!t||!(e!=null&&e.time))return;let r="";const n=Math.min(7,e.time.length);for(let l=0;l<n;l++){const c=((i=e.weather_code)==null?void 0:i[l])??0,u=Math.round(((a=e.temperature_2m_max)==null?void 0:a[l])??0),p=Math.round(((o=e.temperature_2m_min)==null?void 0:o[l])??0),d=((s=e.precipitation_probability_max)==null?void 0:s[l])??0,h=he(c,!0),m=ot(e.time[l]);r+=`
      <div class="flex items-center justify-between py-3 px-4 rounded-xl
        bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/[0.06]
        transition-all duration-300 group">

        <div class="flex items-center gap-3 min-w-[130px]">
          <div class="w-8 h-8 flex items-center justify-center text-white/60 group-hover:text-white transition-colors">
            ${b(h,22)}
          </div>
          <div>
            <p class="text-sm font-semibold ${l===0?"text-cyan-300":"text-white/90"}">${m}</p>
            <p class="text-xs text-white/30">${W(c)}</p>
          </div>
        </div>

        ${d>0?`
          <div class="flex items-center gap-1 text-xs text-cyan-400/60">
            ${b("droplets",12)} ${d}%
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
    `}t.innerHTML=r}function te(e){const t=document.getElementById("sun-container");if(!t||!(e!=null&&e.sunrise))return;const r=e.sunrise[0],n=e.sunset[0];if(!r||!n)return;const a=ht(r,n,new Date),o=a>=0&&a<=1,s=T(r),l=T(n),c=new Date(n)-new Date(r),u=Math.floor(c/36e5),p=Math.floor(c%36e5/6e4);t.innerHTML=`
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
            ${b("sunrise",14)}
            <span class="text-sm font-semibold">${s}</span>
          </div>
          <p class="text-[10px] text-white/30">Sunrise</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-white/40">${u}h ${p}m daylight</p>
        </div>
        <div class="text-center">
          <div class="flex items-center gap-1 text-orange-400">
            ${b("sunset",14)}
            <span class="text-sm font-semibold">${l}</span>
          </div>
          <p class="text-[10px] text-white/30">Sunset</p>
        </div>
      </div>
    </div>
  `}function ne(e){const t=document.getElementById("aqi-container");if(!t)return;if(!(e!=null&&e.current)){t.innerHTML=`
      <div class="text-center py-4">
        <p class="text-white/30 text-sm">Air quality data unavailable</p>
        <p class="text-white/20 text-xs mt-1">Service may be temporarily offline</p>
      </div>
    `;return}const r=e.current.us_aqi??0,n=dt(r),i=[{name:"PM2.5",val:e.current.pm2_5,unit:"μg/m³"},{name:"PM10",val:e.current.pm10,unit:"μg/m³"},{name:"O₃",val:e.current.ozone,unit:"μg/m³"},{name:"NO₂",val:e.current.nitrogen_dioxide,unit:"μg/m³"},{name:"SO₂",val:e.current.sulphur_dioxide,unit:"μg/m³"},{name:"CO",val:e.current.carbon_monoxide,unit:"μg/m³"}].filter(a=>a.val!=null);t.innerHTML=`
    <div class="flex items-center gap-4 mb-4">
      <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
        style="background: ${n.color}22; color: ${n.color}; border: 1px solid ${n.color}33;">
        ${r}
      </div>
      <div>
        <p class="font-semibold text-white/90">${n.label}</p>
        <p class="text-xs text-white/40">US AQI Index</p>
      </div>
    </div>

    <!-- AQI Bar -->
    <div class="w-full h-2 rounded-full bg-white/5 overflow-hidden mb-4">
      <div class="h-full rounded-full transition-all duration-1000"
        style="width: ${Math.min(100,r/300*100)}%;
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
  `}function L(){const e=document.getElementById("city-list");if(!e)return;const t=f.cities,r=f.selectedIndex;e.innerHTML=t.map((n,i)=>{const a=f.getWeatherData(n),o=a==null?void 0:a.current,s=i===r;return`
      <div class="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300
        ${s?"bg-white/[0.1] border border-cyan-400/20 shadow-lg shadow-cyan-500/5":"bg-white/[0.03] border border-transparent hover:bg-white/[0.06] hover:border-white/[0.06]"}"
        data-city-index="${i}">

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="text-sm">${be(n.country)}</span>
            <p class="text-sm font-semibold truncate ${s?"text-cyan-300":"text-white/80"}">${n.name}</p>
          </div>
          ${o?`
            <p class="text-xs text-white/30 mt-0.5">${W(o.weather_code)}</p>
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
            ${b("x",12)}
          </button>
        `:""}
      </div>
    `}).join(""),e.querySelectorAll("[data-city-index]").forEach(n=>{n.addEventListener("click",i=>{i.target.closest(".remove-city")||f.selectCity(parseInt(n.dataset.cityIndex))})}),e.querySelectorAll(".remove-city").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation(),f.removeCity(parseInt(n.dataset.removeIndex))})})}function _t(){const e=document.getElementById("hero-section");e&&(e.innerHTML=`
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
    `).join(""));const r=document.getElementById("metrics-grid");r&&(r.innerHTML=Array(8).fill("").map(()=>`
      <div class="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-4 animate-pulse">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-8 h-8 rounded-lg bg-white/5"></div>
          <div class="h-3 w-16 bg-white/5 rounded"></div>
        </div>
        <div class="h-7 w-14 bg-white/5 rounded mb-1"></div>
        <div class="h-3 w-20 bg-white/5 rounded"></div>
      </div>
    `).join(""));const n=document.getElementById("daily-forecast");n&&(n.innerHTML=Array(7).fill("").map(()=>`
      <div class="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] animate-pulse">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-white/5 rounded-full"></div>
          <div class="space-y-1"><div class="h-4 w-20 bg-white/5 rounded"></div><div class="h-3 w-16 bg-white/5 rounded"></div></div>
        </div>
        <div class="h-4 w-24 bg-white/5 rounded"></div>
      </div>
    `).join(""))}let B=null;function re(e){B&&cancelAnimationFrame(B);const t=()=>{const r=document.getElementById("hero-clock");r&&(r.textContent=fe(new Date,e||"UTC")),B=requestAnimationFrame(t)};t()}function St(){const e=document.getElementById("loading-overlay");e&&(e.style.opacity="0",setTimeout(()=>e.remove(),600))}function ie(e){const t=document.getElementById("weather-card-container");if(!t||!e)return;const r=e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ /g,"_"),n=`${nt}${r}.svg`;t.innerHTML=`
    <div class="flex flex-col items-center justify-center w-full h-full p-2 animate-fade-in-up">
      <img src="${n}"
        class="w-full max-w-[480px] h-auto rounded-2xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-all duration-300"
        alt="Animated Weather Card for ${e.name}" />
    </div>
  `}O.register(..._e);let x=null,v=null,S=null;const w={family:"'Space Grotesk', 'Inter', sans-serif",size:11},D="rgba(255,255,255,0.06)",$="rgba(255,255,255,0.4)";function ae(e){var c,u,p;const t=document.getElementById("temp-chart");if(!t||!e)return;const r=t.getContext("2d");new Date().getHours();const i=[],a=[],o=[];for(let d=0;d<24&&d<(((c=e.time)==null?void 0:c.length)||0);d++){const h=new Date(e.time[d]);i.push(h.toLocaleTimeString("en-US",{hour:"2-digit",hour12:!1})),a.push((u=e.temperature_2m)==null?void 0:u[d]),o.push((p=e.apparent_temperature)==null?void 0:p[d])}if(x){x.data.labels=i,x.data.datasets[0].data=a,x.data.datasets[1].data=o,x.update("none");return}const s=r.createLinearGradient(0,0,0,t.height);s.addColorStop(0,"rgba(56, 189, 248, 0.3)"),s.addColorStop(1,"rgba(56, 189, 248, 0.0)");const l=r.createLinearGradient(0,0,0,t.height);l.addColorStop(0,"rgba(168, 85, 247, 0.2)"),l.addColorStop(1,"rgba(168, 85, 247, 0.0)"),x=new O(r,{type:"line",data:{labels:i,datasets:[{label:"Temperature",data:a,borderColor:"#38bdf8",backgroundColor:s,fill:!0,tension:.4,pointRadius:0,pointHoverRadius:6,pointHoverBackgroundColor:"#38bdf8",pointHoverBorderColor:"#fff",pointHoverBorderWidth:2,borderWidth:2.5},{label:"Feels Like",data:o,borderColor:"#a855f7",backgroundColor:l,fill:!0,tension:.4,pointRadius:0,pointHoverRadius:5,borderWidth:1.5,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,animation:{duration:1e3,easing:"easeOutQuart"},interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!0,position:"top",align:"end",labels:{color:$,font:w,boxWidth:12,padding:16}},tooltip:{backgroundColor:"rgba(15, 23, 42, 0.9)",borderColor:"rgba(255, 255, 255, 0.1)",borderWidth:1,titleFont:w,bodyFont:w,padding:12,cornerRadius:12,callbacks:{label:d=>{var h;return`${d.dataset.label}: ${(h=d.parsed.y)==null?void 0:h.toFixed(1)}°C`}}}},scales:{x:{ticks:{color:$,font:w,maxRotation:0,maxTicksLimit:8},grid:{color:D,drawBorder:!1}},y:{ticks:{color:$,font:w,callback:d=>`${d}°`},grid:{color:D,drawBorder:!1}}}}})}function oe(e){var o,s,l;const t=document.getElementById("precip-chart");if(!t||!e)return;const r=t.getContext("2d"),n=[],i=[],a=[];for(let c=0;c<24&&c<(((o=e.time)==null?void 0:o.length)||0);c++){const u=new Date(e.time[c]);n.push(u.toLocaleTimeString("en-US",{hour:"2-digit",hour12:!1})),i.push(((s=e.precipitation)==null?void 0:s[c])||0),a.push(((l=e.precipitation_probability)==null?void 0:l[c])||0)}if(v){v.data.labels=n,v.data.datasets[0].data=i,v.data.datasets[1].data=a,v.update("none");return}v=new O(r,{type:"bar",data:{labels:n,datasets:[{label:"Precipitation (mm)",data:i,backgroundColor:"rgba(56, 189, 248, 0.6)",borderColor:"rgba(56, 189, 248, 0.9)",borderWidth:1,borderRadius:4,barPercentage:.6,yAxisID:"y"},{label:"Probability (%)",data:a,type:"line",borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!0,tension:.4,pointRadius:0,borderWidth:2,yAxisID:"y1"}]},options:{responsive:!0,maintainAspectRatio:!1,animation:{duration:1e3,easing:"easeOutQuart"},interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!0,position:"top",align:"end",labels:{color:$,font:w,boxWidth:12,padding:16}},tooltip:{backgroundColor:"rgba(15, 23, 42, 0.9)",borderColor:"rgba(255, 255, 255, 0.1)",borderWidth:1,titleFont:w,bodyFont:w,padding:12,cornerRadius:12}},scales:{x:{ticks:{color:$,font:w,maxRotation:0,maxTicksLimit:8},grid:{color:D,drawBorder:!1}},y:{position:"left",ticks:{color:$,font:w,callback:c=>`${c}mm`},grid:{color:D,drawBorder:!1}},y1:{position:"right",min:0,max:100,ticks:{color:"rgba(245, 158, 11, 0.5)",font:w,callback:c=>`${c}%`},grid:{display:!1}}}}})}function se(e){const t=document.getElementById("wind-chart");if(!t||!e)return;const r=Math.round(e.wind_speed_10m||0),n=Math.round(e.wind_gusts_10m||r),i=e.wind_direction_10m||0,o=["N","NE","E","SE","S","SW","W","NW"][Math.round(i/45)%8];if(S){S.updateSeries([r]);return}const s=Math.max(100,n+20);S=new Se(t,{chart:{type:"radialBar",height:"100%",sparkline:{enabled:!1},background:"transparent",animations:{enabled:!0,easing:"easeinout",speed:1200,dynamicAnimation:{enabled:!0,speed:600}}},series:[Math.round(r/s*100)],plotOptions:{radialBar:{startAngle:-135,endAngle:135,hollow:{size:"60%",background:"transparent"},track:{background:"rgba(255,255,255,0.05)",strokeWidth:"100%"},dataLabels:{name:{show:!0,fontSize:"12px",fontFamily:"'Space Grotesk', sans-serif",color:"rgba(255,255,255,0.5)",offsetY:-10},value:{show:!0,fontSize:"28px",fontFamily:"'Space Grotesk', sans-serif",fontWeight:700,color:"#ffffff",offsetY:5,formatter:()=>`${r}`}}}},labels:[`${o} · km/h`],fill:{type:"gradient",gradient:{shade:"dark",type:"horizontal",colorStops:[{offset:0,color:"#22d3ee",opacity:1},{offset:50,color:"#3b82f6",opacity:1},{offset:100,color:"#8b5cf6",opacity:1}]}},stroke:{lineCap:"round"},grid:{padding:{top:-10,bottom:-15}},subtitle:{text:`Gusts: ${n} km/h`,align:"center",offsetY:180,style:{fontSize:"11px",fontFamily:"'Space Grotesk', sans-serif",color:"rgba(255,255,255,0.4)"}}}),S.render()}function le(){x&&(x.destroy(),x=null),v&&(v.destroy(),v=null),S&&(S.destroy(),S=null)}var $t=$e();const C=Me($t);let g=null,M=null,k=[],E=0,H=null,_=null;const Mt="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",kt='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',ye=C.divIcon({html:`<div style="
    width: 20px; height: 20px;
    background: radial-gradient(circle, #22d3ee 0%, #3b82f6 100%);
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.8);
    box-shadow: 0 0 20px rgba(34,211,238,0.6), 0 0 40px rgba(34,211,238,0.3);
    animation: mapPulse 2s infinite;
  "></div>`,className:"custom-marker",iconSize:[20,20],iconAnchor:[10,10]});function Lt(e=-23.55,t=-46.64){const r=document.getElementById("weather-map");r&&(g&&(g.remove(),g=null),g=C.map(r,{center:[e,t],zoom:8,zoomControl:!1,attributionControl:!1}),C.tileLayer(Mt,{attribution:kt,maxZoom:18,subdomains:"abcd"}).addTo(g),C.control.zoom({position:"bottomright"}).addTo(g),C.control.attribution({position:"bottomleft",prefix:""}).addTo(g),M=C.marker([e,t],{icon:ye}).addTo(g),At(),setTimeout(()=>g.invalidateSize(),300))}function ce(e,t,r){if(!g){Lt(e,t);return}g.flyTo([e,t],8,{duration:1.5,easeLinearity:.25}),M?M.setLatLng([e,t]):M=C.marker([e,t],{icon:ye}).addTo(g),r&&M.bindPopup(`
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
        <strong>${r}</strong>
      </div>
    `,{className:"skylog-popup",closeButton:!1}),setTimeout(()=>g.invalidateSize(),300)}async function At(){var e;if(g)try{if(_=await xt(),!((e=_==null?void 0:_.radar)!=null&&e.past))return;k.forEach(r=>g.removeLayer(r)),k=[],[..._.radar.past,..._.radar.nowcast||[]].forEach((r,n)=>{const i=C.tileLayer(`${_.host}${r.path}/256/{z}/{x}/{y}/4/1_1.png`,{opacity:0,zIndex:300+n});i.addTo(g),k.push(i)}),It()}catch(t){console.warn("[MAP] Radar load failed:",t)}}function It(){H&&clearInterval(H),E=0,H=setInterval(()=>{k.forEach((e,t)=>{e.setOpacity(t===E?.5:0)}),E=(E+1)%k.length},800)}function N(){me({icons:{Search:Ye,CloudRainWind:He,Thermometer:Je,Wind:Xe,Droplets:We,Gauge:Ue,Eye:je,Sun:Ke,Cloud:Oe,CloudLightning:Be,CloudRain:Fe,Snowflake:Ve,Clock:Re,Calendar:De,LineChart:ze,BarChart3:Ne,Map:Ge,Sunrise:Ze,Sunset:qe,X:et,ChevronRight:Pe,Menu:Qe}})}async function Et(){console.log("[SKYLOG] Initializing Intelligence Hub..."),Dt(),Ct(),L(),await Ce(f.selectedCity),St(),Tt()}async function Tt(){console.log("[SKYLOG] Starting background sensor pre-fetch...");const t=f.cities.filter(r=>r!==f.selectedCity).map(async r=>{try{const[n,i]=await Promise.all([xe(r.lat,r.lon,r.tz),ve(r.lat,r.lon)]);n&&(f.setWeatherData(r,n),f.setAirQuality(r,i))}catch(n){console.error(`[SKYLOG] Pre-fetch failed for ${r.name}:`,n)}});await Promise.all(t),console.log("[SKYLOG] All sensors synced and cached!"),L()}function de(){document.querySelectorAll("main .glass-card, #hero-section, #metrics-grid > div").forEach(t=>{t.classList.remove("animate-fade-in-up"),t.offsetWidth,t.classList.add("animate-fade-in-up")})}async function Ce(e){if(!e)return;const t=f.getWeatherData(e),r=f.getAirQuality(e);if(t&&r){try{const n=K(t);Z(n),q(e,t),J(t.hourly),ee(t.daily),X(t.current,t.hourly,t.daily),te(t.daily),ne(r),ie(e),L(),le(),ae(t.hourly),oe(t.hourly),se(t.current),ce(e.lat,e.lon,e.name),re(e.tz),N(),de()}catch(n){console.error("[SKYLOG] Instant load error:",n)}return}f.setLoading(!0),_t();try{const[n,i]=await Promise.all([xe(e.lat,e.lon,e.tz),ve(e.lat,e.lon)]);if(n){f.setWeatherData(e,n),f.setAirQuality(e,i);const a=K(n);Z(a),q(e,n),J(n.hourly),ee(n.daily),X(n.current,n.hourly,n.daily),te(n.daily),ne(i),ie(e),L(),le(),ae(n.hourly),oe(n.hourly),se(n.current),ce(e.lat,e.lon,e.name),re(e.tz),N(),de()}}catch(n){console.error("[SKYLOG] Load error:",n)}finally{f.setLoading(!1)}}function Dt(){f.on("cityChanged",r=>{Ce(r)}),f.on("citiesUpdated",()=>{L()});const e=document.getElementById("city-search"),t=document.getElementById("search-results");if(e&&t){const r=ut(async n=>{if(!n){t.classList.add("hidden");return}const i=await wt(n);i.length>0?(t.innerHTML=i.map((a,o)=>`
          <div class="search-item p-3 cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-between group" data-idx="${o}">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate">${a.name}</p>
              <p class="text-[10px] text-white/30 truncate">${a.display}</p>
            </div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-white/20 group-hover:text-cyan-400 transition-colors"></i>
          </div>
        `).join(""),t.classList.remove("hidden"),N(),t.querySelectorAll(".search-item").forEach(a=>{a.addEventListener("click",()=>{const o=i[a.dataset.idx];f.addCity(o),e.value="",t.classList.add("hidden")})})):(t.innerHTML='<p class="p-4 text-xs text-center text-white/20">No cities found</p>',t.classList.remove("hidden"))},400);e.addEventListener("input",n=>r(n.target.value)),document.addEventListener("click",n=>{!e.contains(n.target)&&!t.contains(n.target)&&t.classList.add("hidden")})}}window.addEventListener("unhandledrejection",e=>{console.warn("[SKYLOG] Async error:",e.reason)});window.addEventListener("DOMContentLoaded",()=>{N(),Et()});
