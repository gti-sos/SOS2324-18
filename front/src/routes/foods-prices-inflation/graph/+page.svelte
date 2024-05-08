<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
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
    let API = "/api/v2/foods-prices-inflation";
    
    if(dev)
        API = "http://localhost:10000"+API;

    async function getAllFoods(){
        let response = await fetch(API+"?pageSize=10000", {
            method: "GET"
        });

        let data = await response.json();
        Allfoods = data;
        creaLineas(); 
        graficaColumn(); 
        graficaArea();
        graficaECharts();
        console.log(data);
    }

    async function creaLineas(){
        let open= {
            name: '',
            data: []
        }

        let close= {
            name: '',
            data: []
        }

        for(let i=0; i<Allfoods.length; i++){
            cat.add(Allfoods[i].id);
            open.name="Open";
            open.data.push(Allfoods[i].open);
            close.name="Close";
            close.data.push(Allfoods[i].close);
        }
        
        ser.push(open);
        ser.push(close);
        cat=[...cat];
        console.log(cat);
    }

    async function graficaArea(){
        const chart = Highcharts.chart('containerArea', {
            chart: {
                type: 'area'
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
        getAllFoods();
    });
</script>

<Container id="containerArea" style="width:100%; height:400px;"></Container>
<br>
<Container id="containerC" style="width:100%; height:400px;"></Container>
<Container id="grafica" style="width:100%; height:400px;"></Container>