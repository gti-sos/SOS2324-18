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
	//import { key } from '../keys/keys'

	let data = [];

	onMount(async () => {
		const headers = {
			//'X-RapidAPI-Key': 'key',
			'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
		};

		try {
			const response = await fetch('https://imdb-top-100-movies.p.rapidapi.com', {
				headers
			});
			const responseData = await response.json();

			data = responseData.map((movie) => ({
				x: movie.year,
				y: parseFloat(movie.rating),
				name: movie.title,
				imageUrl: movie.thumbnail,
				imdbLink: movie.imdb_link
			}));

			Highcharts.chart('container', {
				chart: {
					type: 'scatter',
					zoomType: 'xy'
				},
				title: {
					text: 'Top Movies Ratings vs. Year'
				},
				xAxis: {
					title: {
						enabled: true,
						text: 'Year'
					},
					startOnTick: true,
					endOnTick: true,
					showLastLabel: true
				},
				yAxis: {
					title: {
						text: 'Rating'
					}
				},
				tooltip: {
					formatter: function () {
						return `<b>${this.point.name}</b><br/>Year: ${this.x}<br/>Rating: ${this.y}<br/><a href="${this.point.options.imdbLink}" target="_blank">IMDb Link</a><br/><img src="${this.point.options.imageUrl}" alt="${this.point.name}" style="width: 50px; height: auto;">`;
					}
				},
				plotOptions: {
					scatter: {
						marker: {
							radius: 5,
							states: {
								hover: {
									enabled: true,
									lineColor: 'rgb(100,100,100)'
								}
							}
						},
						states: {
							hover: {
								marker: {
									enabled: false
								}
							}
						}
					}
				},
				series: [
					{
						name: 'Movies',
						color: 'rgba(223, 83, 83, .5)',
						data: data
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
