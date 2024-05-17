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
			'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
		};

		try {
			const response = await fetch('https://exercisedb.p.rapidapi.com/exercises', {
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

		// Agrupar datos por músculo objetivo (target)
		const muscleTargetCount = data.reduce((acc, exercise) => {
			const { target } = exercise;
			if (!acc[target]) {
				acc[target] = 0;
			}
			acc[target]++;
			return acc;
		}, {});

		const muscles = Object.keys(muscleTargetCount);
		const counts = muscles.map(muscle => muscleTargetCount[muscle]);

		function getRandomColor() {
			const letters = '0123456789ABCDEF';
			let color = '#';
			for (let i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}

		if (chart) {
			chart.destroy();
		}

		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: muscles,
				datasets: [{
					label: 'Número de Ejercicios',
					data: counts,
					backgroundColor: muscles.map(() => getRandomColor())
				}]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: false,
					},
					title: {
						display: true,
						text: 'Número de Ejercicios por Músculo Objetivo'
					}
				},
				scales: {
					x: {
						beginAtZero: true,
					},
					y: {
						beginAtZero: true
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
