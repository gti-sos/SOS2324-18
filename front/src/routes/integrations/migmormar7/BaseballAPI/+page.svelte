<svelte:head>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/highcharts-more.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</svelte:head>

<script>
	import { onMount } from 'svelte';

	let data = [];

	onMount(async () => {
		const headers = {
			'X-RapidAPI-Key': '08d9a62d80msh7da0bb85bf5e2ecp1d71c2jsn93c6e60de419',
			'X-RapidAPI-Host': 'baseballapi.p.rapidapi.com'
		};

		try {
			const response = await fetch('https://baseballapi.p.rapidapi.com/api/baseball/search/mlb', {
				headers
			});
			const responseData = await response.json();

			data = responseData.results.map((result) => ({
				name: result.entity.name,
				low: 0, 
				high: result.score 
			}));

			Highcharts.chart('container', {
				chart: {
					type: 'columnrange'
				},
				title: {
					text: 'Puntuación de entidades'
				},
				xAxis: {
					categories: data.map((item) => item.name)
				},
				yAxis: {
					title: {
						text: 'Puntuación'
					}
				},
				plotOptions: {
					columnrange: {
						dataLabels: {
							enabled: true,
							formatter: function () {
								return this.y.toFixed(2);
							}
						}
					}
				},
				series: [
					{
						name: 'Puntuación',
						data: data.map((item) => [item.low, item.high])
					}
				]
			});
		} catch (error) {
			console.error(error);
		}
	});
</script>

<div id="container"></div>

<style>
	#container {
		height: 400px;
		margin: 0 auto;
	}
</style>
