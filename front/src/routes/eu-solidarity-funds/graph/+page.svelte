<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</svelte:head>

<script>
    import { onMount } from "svelte";
    import { dev } from '$app/environment';

    let datosIniciales = [];
    let scatterData = [];
    let columnRangeData = [];

    let API = "/api/v1/eu-solidarity-funds";

    if (dev) {
        API = "http://localhost:10000" + API;
    }

    async function obtenerDatos() {
        try {
            const response = await fetch(API);
            const data = await response.json();
            datosIniciales = data;
            transformData();
            crearGraficas();
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    function transformData() {

        datosIniciales.forEach((item) => {
            scatterData.push({
                name: item.applicant_country,
                y: parseFloat(item.cost_of_eligible_emergency.replace(",", ""))
            });

            columnRangeData.push({
                name: item.applicant_country,
                high: parseFloat(item.total_direct_damage_accepted.replace(",", "")),
                low: 0
            });

        });
    }
    
    function crearGraficas() {
        crearGraficaDisasterType();
        crearGraficaScatter();
        crearGraficaColumnRange();
    }

    function crearGraficaDisasterType() {

        let disasterCounts = {};

        datosIniciales.forEach((item) => {
            const tipoDesastre = item.disaster_type;
                if (tipoDesastre in disasterCounts) {
                    disasterCounts[tipoDesastre] += 1;
                } else {
                    disasterCounts[tipoDesastre] = 1;
                }
        })

        const ctx = document.getElementById("graficaDisasterType").getContext("2d");
    
        const labels = Object.keys(disasterCounts);
        const values = Object.values(disasterCounts);

        // Crear la gráfica
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cantidad de desastres',
                    data: values,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)', // Color de las barras
                    borderColor: 'rgba(54, 162, 235, 1)', // Borde de las barras
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: true,
                responsive: false,
                scales: {
                    y: {
                        beginAtZero: true // Comenzar el eje y en cero
                    }
                }
            }
        });
    }

    function crearGraficaScatter() {
        Highcharts.chart("graficaScatter", {
            chart: {
                type: "scatter"
            },
            title: {
                text: "Coste de emergencia por País"
            },
            xAxis: {
                type: "category",
                title: {
                    text: "País"
                }
            },
            yAxis: {
                title: {
                    text: "Coste de emergencia"
                }
            },
            series: [{
                name: "Coste de emergencia",
                data: scatterData
            }]
        });
    }

    function crearGraficaColumnRange() {
        Highcharts.chart("graficaColumnRange", {
            chart: {
                type: "columnrange"
            },
            title: {
                text: "Daño total aceptado por país"
            },
            xAxis: {
                type: "category",
                title: {
                    text: "País"
                },
            },
            yAxis: {
                title: {
                    text: "Daño total aceptado"
                }
            },
            series: [{
                name: "Daño total aceptado",
                data: columnRangeData
            }]
        });
    }

    onMount(() => {
        obtenerDatos();
    });

</script>

<h1>GRÁFICAS CHART.JS</h1>

<h2>Disaster Type Chart</h2>
<canvas id="graficaDisasterType" style="width: 100%; height: 400px;"></canvas>

<h1>GRÁFICAS HIGHCHARTS</h1>

<h2>Scatter Chart</h2>
<div id="graficaScatter" style="width: 100%; height: 400px; background-color: white;"></div>

<h2>Column Range Chart</h2>
<div id="graficaColumnRange" style="width: 100%; height: 400px;"></div>
