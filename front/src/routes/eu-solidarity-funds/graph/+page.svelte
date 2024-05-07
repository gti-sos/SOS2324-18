<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</svelte:head>

<style>
    @import '/style.css';
</style>

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

            
            // Llamar a la función de transformación de datos
            transformData();

            // Crear las gráficas después de transformar los datos
            crearGraficaScatter();
            crearGraficaColumnRange();

            crearGraficaDisasterType();
            
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

    function crearGraficaDisasterType() {
        // Datos para la gráfica
        const datos = {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
            datasets: [{
                label: 'Productos Vendidos',
                data: [12, 19, 3, 5, 2], // Cantidad de productos vendidos por día
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', // Color de fondo de las barras
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // Color del borde de las barras
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Configuración de la gráfica
        const config = {
            type: 'bar',
            data: datos,
            options: {
                scales: {
                    y: {
                        beginAtZero: true // Empezar en el eje Y desde cero
                    }
                }
            }
        };

        // Crear la instancia de la gráfica
        var myChart = new Chart(
            document.getElementById('graficaDisasterType'),
            config
        );
    }
    

    onMount(() => {
        obtenerDatos();
    });

</script>

<h1>GRÁFICAS HIGHCHARTS</h1>

<h2>Scatter Chart</h2>
<div id="graficaScatter" style="width: 100%; height: 400px;"></div>

<h2>Column Range Chart</h2>
<div id="graficaColumnRange" style="width: 100%; height: 400px;"></div>

<h1>GRÁFICAS CHART.JS</h1>

<h2>Disaster Type Chart</h2>
<canvas id="graficaDisasterType" style="width: 100%; height: 400px;"></canvas>
