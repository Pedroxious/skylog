/* ═══════════════════════════════════════════
   SKYLOG — Chart System
   Chart.js + ApexCharts Visualizations
   ═══════════════════════════════════════════ */

import Chart from 'chart.js/auto';
import ApexCharts from 'apexcharts';

let tempChart = null;
let precipChart = null;
let windChart = null;

/* ── Shared Chart.js defaults ── */
const CHART_FONT = { family: "'Space Grotesk', 'Inter', sans-serif", size: 11 };
const GRID_COLOR = 'rgba(255,255,255,0.06)';
const TICK_COLOR = 'rgba(255,255,255,0.4)';

/* ══════════════════════════════════
   TEMPERATURE LINE CHART (Chart.js)
   ══════════════════════════════════ */
export function renderTempChart(hourlyData) {
    const canvas = document.getElementById('temp-chart');
    if (!canvas || !hourlyData) return;
    const ctx = canvas.getContext('2d');

    // Get next 24 hours
    const now = new Date();
    const currentHour = now.getHours();
    const labels = [];
    const temps = [];
    const feelsLike = [];

    for (let i = 0; i < 24 && i < (hourlyData.time?.length || 0); i++) {
        const t = new Date(hourlyData.time[i]);
        labels.push(t.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }));
        temps.push(hourlyData.temperature_2m?.[i]);
        feelsLike.push(hourlyData.apparent_temperature?.[i]);
    }

    if (tempChart) {
        tempChart.data.labels = labels;
        tempChart.data.datasets[0].data = temps;
        tempChart.data.datasets[1].data = feelsLike;
        tempChart.update('none');
        return;
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

    const gradient2 = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient2.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
    gradient2.addColorStop(1, 'rgba(168, 85, 247, 0.0)');

    tempChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Temperature',
                    data: temps,
                    borderColor: '#38bdf8',
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#38bdf8',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    borderWidth: 2.5
                },
                {
                    label: 'Feels Like',
                    data: feelsLike,
                    borderColor: '#a855f7',
                    backgroundColor: gradient2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    borderWidth: 1.5,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000, easing: 'easeOutQuart' },
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: { color: TICK_COLOR, font: CHART_FONT, boxWidth: 12, padding: 16 }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    titleFont: CHART_FONT,
                    bodyFont: CHART_FONT,
                    padding: 12,
                    cornerRadius: 12,
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y?.toFixed(1)}°C`
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: TICK_COLOR, font: CHART_FONT, maxRotation: 0, maxTicksLimit: 8 },
                    grid: { color: GRID_COLOR, drawBorder: false }
                },
                y: {
                    ticks: { color: TICK_COLOR, font: CHART_FONT, callback: v => `${v}°` },
                    grid: { color: GRID_COLOR, drawBorder: false }
                }
            }
        }
    });
}

/* ══════════════════════════════════
   PRECIPITATION BAR CHART (Chart.js)
   ══════════════════════════════════ */
export function renderPrecipChart(hourlyData) {
    const canvas = document.getElementById('precip-chart');
    if (!canvas || !hourlyData) return;
    const ctx = canvas.getContext('2d');

    const labels = [];
    const precip = [];
    const prob = [];

    for (let i = 0; i < 24 && i < (hourlyData.time?.length || 0); i++) {
        const t = new Date(hourlyData.time[i]);
        labels.push(t.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }));
        precip.push(hourlyData.precipitation?.[i] || 0);
        prob.push(hourlyData.precipitation_probability?.[i] || 0);
    }

    if (precipChart) {
        precipChart.data.labels = labels;
        precipChart.data.datasets[0].data = precip;
        precipChart.data.datasets[1].data = prob;
        precipChart.update('none');
        return;
    }

    precipChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Precipitation (mm)',
                    data: precip,
                    backgroundColor: 'rgba(56, 189, 248, 0.6)',
                    borderColor: 'rgba(56, 189, 248, 0.9)',
                    borderWidth: 1,
                    borderRadius: 4,
                    barPercentage: 0.6,
                    yAxisID: 'y'
                },
                {
                    label: 'Probability (%)',
                    data: prob,
                    type: 'line',
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    borderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000, easing: 'easeOutQuart' },
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: { color: TICK_COLOR, font: CHART_FONT, boxWidth: 12, padding: 16 }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    titleFont: CHART_FONT,
                    bodyFont: CHART_FONT,
                    padding: 12,
                    cornerRadius: 12
                }
            },
            scales: {
                x: {
                    ticks: { color: TICK_COLOR, font: CHART_FONT, maxRotation: 0, maxTicksLimit: 8 },
                    grid: { color: GRID_COLOR, drawBorder: false }
                },
                y: {
                    position: 'left',
                    ticks: { color: TICK_COLOR, font: CHART_FONT, callback: v => `${v}mm` },
                    grid: { color: GRID_COLOR, drawBorder: false }
                },
                y1: {
                    position: 'right',
                    min: 0,
                    max: 100,
                    ticks: { color: 'rgba(245, 158, 11, 0.5)', font: CHART_FONT, callback: v => `${v}%` },
                    grid: { display: false }
                }
            }
        }
    });
}

/* ══════════════════════════════════
   WIND RADIAL GAUGE (ApexCharts)
   ══════════════════════════════════ */
export function renderWindChart(current) {
    const container = document.getElementById('wind-chart');
    if (!container || !current) return;

    const speed = Math.round(current.wind_speed_10m || 0);
    const gusts = Math.round(current.wind_gusts_10m || speed);
    const direction = current.wind_direction_10m || 0;

    const COMPASS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const compassDir = COMPASS[Math.round(direction / 45) % 8];

    if (windChart) {
        windChart.updateSeries([speed]);
        return;
    }

    const maxWind = Math.max(100, gusts + 20);

    windChart = new ApexCharts(container, {
        chart: {
            type: 'radialBar',
            height: '100%',
            sparkline: { enabled: false },
            background: 'transparent',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 1200,
                dynamicAnimation: { enabled: true, speed: 600 }
            }
        },
        series: [Math.round((speed / maxWind) * 100)],
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                hollow: { size: '60%', background: 'transparent' },
                track: {
                    background: 'rgba(255,255,255,0.05)',
                    strokeWidth: '100%'
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: '12px',
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: 'rgba(255,255,255,0.5)',
                        offsetY: -10
                    },
                    value: {
                        show: true,
                        fontSize: '28px',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        color: '#ffffff',
                        offsetY: 5,
                        formatter: () => `${speed}`
                    }
                }
            }
        },
        labels: [`${compassDir} · km/h`],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                colorStops: [
                    { offset: 0, color: '#22d3ee', opacity: 1 },
                    { offset: 50, color: '#3b82f6', opacity: 1 },
                    { offset: 100, color: '#8b5cf6', opacity: 1 }
                ]
            }
        },
        stroke: { lineCap: 'round' },
        grid: { padding: { top: -10, bottom: -15 } },
        subtitle: {
            text: `Gusts: ${gusts} km/h`,
            align: 'center',
            offsetY: 180,
            style: {
                fontSize: '11px',
                fontFamily: "'Space Grotesk', sans-serif",
                color: 'rgba(255,255,255,0.4)'
            }
        }
    });

    windChart.render();
}

/* ── Cleanup ── */
export function destroyCharts() {
    if (tempChart) { tempChart.destroy(); tempChart = null; }
    if (precipChart) { precipChart.destroy(); precipChart = null; }
    if (windChart) { windChart.destroy(); windChart = null; }
}
