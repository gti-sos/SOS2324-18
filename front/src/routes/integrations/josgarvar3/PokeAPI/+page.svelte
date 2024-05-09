<script>
	import { onMount } from 'svelte';

	let pokes = [];

	onMount(async () => {
		const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=50&offset=50', {
			method: "GET"
		});
		const data = await response.json();
		// Procesa los datos según el formato que necesite Highcharts
		pokes = data.results;
        console.log(pokes);
	});
</script>