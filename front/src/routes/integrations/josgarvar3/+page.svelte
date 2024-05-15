<!--script>
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
</script-->

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
</svelte:head>

<style>
    @import '/style.css';
</style>

<script>
    import {
    Container
    } from '@sveltestrap/sveltestrap';
    import {onMount} from "svelte";
    import * as echarts from 'echarts';
    import { dev } from "$app/environment";

    let serCovid=[];
    let catCovid=new Set();
    let ser2=[];
    let cat2=new Set();
    let ser3=[];
    let cat3=new Set();
    let ser4=[];
    let cat4=new Set();
    let Allfoods=[];
	let covid = [];
    let API = "/api/v2/foods-prices-inflation";
    
    if(dev)
        API = "http://localhost:10000"+API;

	async function graficas(){
		await getAllFoods();
		await getCovid();

		creaLineasCovid(); 
        graficaColumn(); 
        graficaArea();
	}

    async function getAllFoods(){
        let response = await fetch(API+"?pageSize=10000", {
            method: "GET"
        });

        let data = await response.json();
        Allfoods = data;
        
        console.log(data);
    }

	async function getCovid(){
		const response = await fetch('https://api.covidtracking.com/v1/us/daily.json', {
			method: "GET"
		});
		const data = await response.json();
		// Procesa los datos según el formato que necesite Highcharts
		covid = data.slice(0, 30);
        console.log(covid);
	}

    async function creaLineasCovid(){
        let inflation= {
            name: '',
            data: []
        }

        let cov= {
            name: '',
            data: []
        }

        for(let i=0; i<Allfoods.length; i++){
            catCovid.add(Allfoods[i].date.slice(0, 4));
            inflation.name="Inflacion";
            inflation.data.push(Allfoods[i].inflation*100);
        }

		for(let i=0; i<covid.length; i++){
            catCovid.add((covid[i].date+"").slice(0, 4));
            cov.name="Covid";
            cov.data.push(covid[i].hospitalizedIncrease);
        }
        
        serCovid.push(inflation);
        serCovid.push(cov);
		
		console.log(cov)
        catCovid=[...catCovid];
        console.log(catCovid);
    }

    async function graficaArea(){
        const chart = Highcharts.chart('containerArea', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Inflacion - Hospitalizados por covid'
            },
            subtitle: {
                text: 'Source: ' +
                    '<a href= "'+ "https://api.covidtracking.com" +'"' +
                    'target="_blank">foods-prices-inflation.com</a>'
            },
            xAxis: {
                categories: catCovid
            },
            yAxis: {
                title: {
                    text: 'Inflacion / Hospitalizados por covid'
                }
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: serCovid
        });
    }

    async function graficaColumn(){
        const chart = Highcharts.chart('containerC', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Open - Close de la inflacion'
            },
            subtitle: {
                text: 'Source: ' +
                    '<a href= "'+ API +'"' +
                    'target="_blank">foods-prices-inflation.com</a>'
            },
            xAxis: {
                categories: catCovid
            },
            yAxis: {
                title: {
                    text: 'Open / Close'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: serCovid
        });
    }


    onMount(() =>{
		graficas();
    });
</script>

<Container id="containerArea" style="width:100%; height:400px;"></Container>
<br>
<Container id="containerC" style="width:100%; height:400px;"></Container>