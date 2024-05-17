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
    let serRick=[];
    let catRick=new Set();
    let serRandom=[];
    let catRandom=new Set();
    let serUSA=[];
    let catUSA=new Set();

    let Allfoods=[];
	let covid = [];
    let rick = [];
    let random = [];
    let usa = [];

    let API = "/api/v2/foods-prices-inflation";
    
    if(dev)
        API = "http://localhost:10000"+API;

	async function graficas(){
		await getAllFoods();
		await getCovid();
        await getRick();
        await getRandom();
        await getUSA();

		await creaLineasCovid(); 
        await creaLineasRick();
        await creaLineasRandom();
        await creaLineasUSA();

        graficaColumnECharts();
        graficaColumn(); 
        graficaArea();
        graficaColumnECharts2();
	}

    async function getAllFoods(){
        try{
            let response = await fetch(API+"?pageSize=10000", {
                method: "GET"
            });

            let data = await response.json();
            Allfoods = data;
            
            console.log(data);
        } catch (e) {
            console.log("Code: "+e);  
        }
    }

	async function getCovid(){
        try{
            const response = await fetch('https://api.covidtracking.com/v1/us/daily.json', {
                method: "GET"
            });
            const data = await response.json();
            // Procesa los datos según el formato que necesite Highcharts
            for(let i=0; i < 30; i++){
                let n =  Math.floor(Math.random() * data.length);
                covid.push(data[n]);
            }
            console.log(covid);
        } catch (e) {
            console.log("Code: "+e);  
        }
	}

    async function getRick(){
        try{
            const response = await fetch('https://rickandmortyapi.com/api/episode', {
                method: "GET"
            });
            const data = await response.json();
            // Procesa los datos según el formato que necesite Highcharts
            rick = data.results;
            console.log(rick);
        } catch (e) {
            console.log("Code: "+e);  
        }
	}

    async function getRandom(){
        try{          
            for(let i=1; i <= 10; i++){
                const response = await fetch("https://randomuser.me/api/", {
                    method: "GET"
                });

                const data = await response.json();
                random.push(data.results[0]);  
            }

            // Procesa los datos según el formato que necesite Highcharts
            console.log(random);
        } catch (e) {
            console.log("Code: "+e);  
        }
	}

    async function getUSA(){
        try{//
            const response = await fetch('https://sos2324-18.appspot.com/api/v2/foods-prices-inflation/proxy', {
                method: "GET"
            });
            const data = await response.json();
            // Procesa los datos según el formato que necesite Highcharts
            usa = data.data;
            console.log(usa);
        } catch (e) {
            console.log("Code: "+e);  
        }
	}

    async function ordenar(años, mydata, data2){
        let ordenados=[...años];
        ordenados.sort((a, b) => a.localeCompare(b));
        let array=[ordenados, [], []];

        for(let i=0; i < ordenados.length; i++){
            for(let j=0; j < años.length; j++){
                if(ordenados[i]==años[j]){
                    array[1].push(mydata[j]);
                    array[2].push(data2[j]);
                }
            }
        }
        console.log(array);
        return array;
    }

    async function creaLineasCovid(){
        let inflation = {
            name: 'Inflation',
            data: []
        }

        let cov = {
            name: 'Covid',
            data: []
        }

        for(let i=0; i < Allfoods.length; i++){
            if([...catCovid].includes(Allfoods[i].date.slice(0, 4))){
                let ident = [...catCovid].indexOf(Allfoods[i].date.slice(0, 4));
                inflation.data[ident]+=Allfoods[i].inflation*500;
            }else{
                catCovid.add(Allfoods[i].date.slice(0, 4));
                inflation.data.push(Allfoods[i].inflation*500);
                cov.data.push(0);
            }  
        }

        for(let i=0; i < covid.length; i++){
            if([...catCovid].includes((covid[i].date+"").slice(0, 4))){
                let ident = [...catCovid].indexOf((covid[i].date+"").slice(0, 4));
                cov.data[ident]+=covid[i].hospitalizedIncrease;
            }else{
                catCovid.add((covid[i].date+"").slice(0, 4));
                cov.data.push(covid[i].hospitalizedIncrease);
                inflation.data.push(0);
            }  
        }

        let data=await ordenar([...catCovid], inflation.data, cov.data);
        inflation.data=data[1];
        serCovid.push(inflation);
        cov.data=data[2];
        serCovid.push(cov);
		console.log(serCovid);

        catCovid=data[0];
        console.log(catCovid);
    }

    async function creaLineasRick(){
        let inflation = {
            name: 'Inflation',
            data: []
        }

        let rym = {
            name: 'Rick',
            data: []
        }

        console.log("RICK");
        for(let i=0; i < Allfoods.length; i++){
            if([...catRick].includes(Allfoods[i].date.slice(0, 4))){ //Si la fecha ya esta en categorias
                let ident = [...catRick].indexOf(Allfoods[i].date.slice(0, 4)); //Obtienes el index de esa fecha en categorias
                inflation.data[ident]+=Allfoods[i].inflation; //Sumas a data la inflacion al objeto inflacion con index
            }else{
                catRick.add(Allfoods[i].date.slice(0, 4)); //Agregas la fecha
                inflation.data.push(Allfoods[i].inflation); //
                rym.data.push(0); //Creas un registro para el siguiente objeto
            }  
        }

        for(let i=0; i < rick.length; i++){
            if([...catRick].includes(rick[i].air_date.slice(-4))){
                let ident = [...catRick].indexOf(rick[i].air_date.slice(-4));
                rym.data[ident]+=1;
            }else{
                catRick.add(rick[i].air_date.slice(-4));
                rym.data.push(1);
                inflation.data.push(0);
            }  
        }
        //CAT, SER, OBJETO, LISTA
        let data=await ordenar([...catRick], inflation.data, rym.data); //Ordenas las categorias y datos de las serie
        inflation.data=data[1];
        serRick.push(inflation);
        rym.data=data[2];
        serRick.push(rym);
		console.log(serRick);

        catRick=data[0];
        console.log(catRick);
    }

    async function creaLineasRandom(){
        let inflation = {
            name: 'Inflation',
            type: 'bar',
            data: []
        }

        let rand = {
            name: 'Edad de persona',
            type: 'bar',
            data: []
        }
        console.log("RANDOM");
        for(let i=0; i < Allfoods.length; i++){
            if([...catRandom].includes(Allfoods[i].date.slice(0, 4))){ //Si la fecha ya esta en categorias
                let ident = [...catRandom].indexOf(Allfoods[i].date.slice(0, 4)); //Obtienes el index de esa fecha en categorias
                inflation.data[ident]+=Allfoods[i].inflation; //Sumas a data la inflacion al objeto inflacion con index
            }else{
                catRandom.add(Allfoods[i].date.slice(0, 4)); //Agregas la fecha
                inflation.data.push(Allfoods[i].inflation); //Agregas la inflacion a data
                rand.data.push(0); //Creas un registro para el siguiente objeto
            }  
        }

        for(let i=0; i < random.length; i++){
            if([...catRandom].includes(random[i].registered.date.slice(0, 4))){
                let ident = [...catRandom].indexOf(random[i].registered.date.slice(0, 4));
                rand.data[ident]+=random[i].dob.age;
            }else{
                catRandom.add(random[i].registered.date.slice(0, 4));
                rand.data.push(random[i].dob.age);
                inflation.data.push(0);
            }  
        }
        //CAT, SER, OBJETO, LISTA
        let data=await ordenar([...catRandom], inflation.data, rand.data); //Ordenas las categorias y datos de las serie
        inflation.data=data[1];
        serRandom.push(inflation);
        rand.data=data[2];
        serRandom.push(rand);
		console.log(serRandom);

        catRandom=data[0];
        console.log(catRandom);
    }

    async function creaLineasUSA(){
        let M = 10000000;
        let inflation = {
            name: 'Inflation',
            type: 'scatter',
            data: []
        }

        let us = {
            name: 'Poblacion',
            type: 'scatter',
            data: []
        }
        console.log("USA");
        for(let i=0; i < Allfoods.length; i++){
            if([...catUSA].includes(Allfoods[i].date.slice(0, 4))){ //Si la fecha ya esta en categorias
                let ident = [...catUSA].indexOf(Allfoods[i].date.slice(0, 4)); //Obtienes el index de esa fecha en categorias
                inflation.data[ident]+=Allfoods[i].inflation*M; //Sumas a data la inflacion al objeto inflacion con index
            }else{
                catUSA.add(Allfoods[i].date.slice(0, 4)); //Agregas la fecha
                inflation.data.push(Allfoods[i].inflation*M); //Agregas la inflacion a data
                us.data.push(0); //Creas un registro para el siguiente objeto
            }  
        }

        for(let i=0; i < usa.length; i++){
            if([...catUSA].includes(usa[i].Year)){
                let ident = [...catUSA].indexOf(usa[i].Year);
                us.data[ident]+=usa[i].Population;
            }else{
                catUSA.add(usa[i].Year);
                us.data.push(usa[i].Population);
                inflation.data.push(0);
            }  
        }
        //CAT, SER, OBJETO, LISTA
        let data=await ordenar([...catUSA], inflation.data, us.data); //Ordenas las categorias y datos de las serie
        inflation.data=data[1];
        serUSA.push(inflation);
        us.data=data[2];
        serUSA.push(us);
		console.log(serUSA);

        catUSA=data[0];
        console.log(catUSA);
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
                tickInterval: 1,
                categories: catRick
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
            series: serRick
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

    var chartDom;
    var myChart;
    async function graficaColumnECharts(){
        chartDom = document.getElementById('graficaColumnECharts');
        myChart = echarts.init(chartDom, "dark");
        const option = {
            title: {
                text: 'Inflacion - Fecha de registro de una persona'
            },
            tooltip: {},
            xAxis: {
                data: catRandom
            },
            yAxis: {},
            series: serRandom
        };
        myChart.setOption(option);
    }

    var chartDom2;
    var myChart2;
    async function graficaColumnECharts2(){
        chartDom2 = document.getElementById('graficaScatterECharts');
        myChart2 = echarts.init(chartDom2, "dark");
        const option = {
            title: {
                text: 'Inflacion x 10M - Poblacion USA'
            }, 
            tooltip: {},
            xAxis: {
                data: catUSA
            },
            yAxis: {},
            series: serUSA
        };
        myChart2.setOption(option);
    }
</script>

<Container id="containerArea" style="width:100%; height:400px;"></Container>
<br>
<Container id="containerC" style="width:100%; height:400px;"></Container>
<br>
<Container id="graficaColumnECharts" style="width:100%; height:400px;"></Container>
<br>
<Container id="graficaScatterECharts" style="width:100%; height:400px;"></Container>