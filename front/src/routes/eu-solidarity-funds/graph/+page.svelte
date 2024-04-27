<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<style>
    @import '/style.css';
</style>

<script>
    import { onMount } from "svelte";
    import { dev } from '$app/environment';

    let datosIniciales = [];

    let API = "/api/v1/eu-solidarity-funds";

    if (dev) {
        API = "http://localhost:10000" + API;
    }

    async function obtenerDatos() {
        try {
            const response = await fetch(API);
            const data = await response.json();
            datosIniciales = data;

            // Llamar a las funciones de transformación y creación de gráficos
            transformData();
            crearGraficaScatter();
            crearGraficaColumnRange();
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    let scatterData = [];
    let columnRangeData = [];

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

<h2>Scatter Chart</h2>
<div id="graficaScatter" style="width: 100%; height: 400px;"></div>

<h2>Column Range Chart</h2>
<div id="graficaColumnRange" style="width: 100%; height: 400px;"></div>
