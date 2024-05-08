<svelte:head>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/highcharts-more.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
	import { onMount } from 'svelte';

	let chartData = [];

	onMount(async () => {
		const response = await fetch('https://exercisedb.p.rapidapi.com/exercises', {
			headers: {
				'X-RapidAPI-Key': 'e095bfb021mshd6002ed8a3f0b26p11b444jsndb5599987a57'
			}
		});
		const data = await response.json();
		// Procesa los datos según el formato que necesite Highcharts
		chartData = processData(data);
		renderChart();
	});

	function processData(data) {
		const bodyParts = {};
		data.forEach((exercise) => {
			const bodyPart = exercise.bodyPart;
			if (!bodyParts[bodyPart]) {
				bodyParts[bodyPart] = 0;
			}
			bodyParts[bodyPart]++;
		});
		return Object.entries(bodyParts).map(([bodyPart, count]) => ({
			bodyPart,
			count
		}));
	}

	function renderChart() {
		Highcharts.chart('chart-container', {
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Cantidad de Ejercicios por Parte del Cuerpo'
			},
			xAxis: {
				categories: exerciseData.map((exercise) => exercise.bodyPart),
				title: {
					text: 'Parte del Cuerpo'
				}
			},
			yAxis: {
				title: {
					text: 'Cantidad de Ejercicios'
				}
			},
			series: [
				{
					name: 'Cantidad de Ejercicios',
					data: exerciseData.map((exercise) => exercise.count)
				}
			]
		});
	}
</script>

<div id="chart-container"></div>

<style>
	#chart-container {
		width: 100%;
		height: 400px;
	}
</style>
