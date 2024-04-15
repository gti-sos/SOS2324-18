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
        console.log(data);
    }

    async function creaLineas(){
        let open= {
            name: 'Open',
            data: []
        }

        for(let i=0; i<Allfoods.length; i++){
            cat.add(Allfoods[i].country);
            let id = Array.from(cat).indexOf(Allfoods[i].country);
            if(id == Array.from(cat).length-1){
                open.data.push(Allfoods[id].open);
            }else {
                open.data[id]+=Allfoods[id].open;
            }
        }
        
        ser.push(open);
        cat=[...cat];
        console.log(open.data);
    }

    async function graficaColumn(){
        const chart = Highcharts.chart('containerC', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Open / '
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
                    text: 'Open / '
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

    onMount(() =>{
        getAllFoods();
    });
</script>

<Container id="containerC" style="width:100%; height:400px;"></Container>