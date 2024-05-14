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

    let ser=[];
    let cat=new Set();
    let Allfoods=[];
	let covid = [];
    let API = "/api/v2/foods-prices-inflation";
    
    if(dev)
        API = "http://localhost:10000"+API;

	async function graficas(){
		await getAllFoods();
		await getCovid();

		creaLineas(); 
        graficaColumn(); 
        graficaArea();
        graficaECharts();
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

    async function creaLineas(){
        let inflation= {
            name: '',
            data: []
        }

        let cov= {
            name: '',
            data: []
        }

        for(let i=0; i<Allfoods.length; i++){
            cat.add(Allfoods[i].date.slice(0, 4));
            inflation.name="Inflacion";
            inflation.data.push(Allfoods[i].inflation*100);
        }

		for(let i=0; i<covid.length; i++){
            cat.add((covid[i].date+"").slice(0, 4));
            cov.name="Covid";
            cov.data.push(covid[i].hospitalizedIncrease);
        }
        
        ser.push(inflation);
        ser.push(cov);
		
		console.log(cov)
        cat=[...cat];
        console.log(cat);
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
                    '<a href= "'+ API +'"' +
                    'target="_blank">foods-prices-inflation.com</a>'
            },
            xAxis: {
                categories: cat
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
            series: ser
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
                categories: cat
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
            series: ser
        });
    }

    var chartDom;
    var myChart;
    async function graficaECharts(){
        chartDom = document.getElementById('grafica');
        myChart = echarts.init(chartDom, "dark");
        const option = {
            title: {
                text: 'ECharts - Ejemplo Simple'
            },
            tooltip: {},
            xAxis: {
                data: cat
            },
            yAxis: {},
            series: [
                {
                name: 'Open',
                type: 'line', // Tipo de gráfico (barras)
                data: ser[0].data
                }
            ]
        };
        myChart.setOption(option);
    }

    onMount(() =>{
		graficas();
    });
</script>

<Container id="containerArea" style="width:100%; height:400px;"></Container>
<br>
<Container id="containerC" style="width:100%; height:400px;"></Container>
<Container id="grafica" style="width:100%; height:400px;"></Container>