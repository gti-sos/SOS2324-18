<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</svelte:head>

<script>
	import { onMount } from 'svelte';

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
			type: 'scatter', 
			data: {
				datasets: muscles.map((muscle, index) => ({
					label: muscle,
					data: [{
						x: index, 
						y: counts[index], 
					}],
					backgroundColor: getRandomColor(),
					pointRadius: 10, 
				}))
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: true,
					},
					title: {
						display: true,
						text: 'Número de Ejercicios por Músculo Objetivo'
					}
				},
				scales: {
					x: {
						type: 'linear', 
						position: 'bottom', 
						ticks: {
							stepSize: 1, 
							callback: (value, index) => muscles[index] 
						}
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
