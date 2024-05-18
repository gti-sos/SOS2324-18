<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</svelte:head>

<script>
	import { onMount } from 'svelte';
    //import { key } from '../keys/keys'

	let data = [];
	let chart;

	onMount(async () => {
		const headers = {
			'X-RapidAPI-Key': '08d9a62d80msh7da0bb85bf5e2ecp1d71c2jsn93c6e60de419',
			'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
		};

		try {
			const response = await fetch('http://localhost:10000/api/v1/eu-solidarity-funds/proxy', {
				headers
			});
			const responseData = await response.json();
			data = responseData
			createChart();
		} catch (error) {
			console.error(error);
		}
	});

	function createChart() {
		const ctx = document.getElementById('container').getContext('2d');

		const titles = data.map(anime => anime.title_en || anime.title_ov);
		const scores = data.map(anime => anime.statistics?.score);

		chart = new Chart(ctx, {
			type: 'scatter',
			data: {
				labels: titles,
				datasets: [{
					label: 'Puntuación',
					data: scores,
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Puntuación'
						}
					},
					x: {
						title: {
							display: true,
							text: 'Anime'
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
