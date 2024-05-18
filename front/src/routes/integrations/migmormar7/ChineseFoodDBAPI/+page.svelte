<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</svelte:head>

<script>
	import { onMount } from 'svelte';

	let chart;
	let meals = [];

	onMount(async () => {
		const headers = {
			'X-RapidAPI-Key': '08d9a62d80msh7da0bb85bf5e2ecp1d71c2jsn93c6e60de419',
			'X-RapidAPI-Host': 'chinese-food-db.p.rapidapi.com'
		};

		try {
			const response = await fetch('https://sos2324-18.appspot.com/api/v1/eu-solidarity-funds/proxy', {
				headers
			});
			const responseData = await response.json();
			meals = responseData
			createChart();
		} catch (error) {
			console.error(error);
		}
	});

	function createChart() {
		const ctx = document.getElementById('container').getContext('2d');

		const difficultyCounts = {};

		meals.forEach(meal => {
			const difficulty = meal.difficulty;
			difficultyCounts[difficulty] = (difficultyCounts[difficulty] || 0) + 1;
		});

		const labels = Object.keys(difficultyCounts);
		const counts = Object.values(difficultyCounts);

		if (chart) {
			chart.destroy();
		}

		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels,
				datasets: [{
					label: 'Número de Comidas',
					data: counts,
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1
				}]
			},
			options: {
				indexAxis: 'y',
				scales: {
					x: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Número de Comidas'
						}
					},
					y: {
						title: {
							display: true,
							text: 'Dificultad'
						}
					}
				}
			}
		});
	}
</script>

<div>
	<canvas id="container" width="400" height="400"></canvas>
</div>

<style>
	#container {
		height: 400px;
		margin: 0 auto;
	}
</style>
