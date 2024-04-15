<svelte:head> 
    <script src="https://code.highcharts.com/highcharts.js"></script>
</svelte:head>

<script>  

import {onMount} from "svelte";
import {dev} from "$app/environment";
import { Button,Container} from '@sveltestrap/sveltestrap';


//CBR's vars
let chart;
let errorMSG;
let countries=[];
let container=[];
let name;
let showGraph=false;
let API="/api/v2/regional-politicies-acceptance";
let countriesName=[];


//MMM's vars
let ser=[];
let cat=new Set();
let Allfoods=[];
let API = "/api/v2/foods-prices-inflation";


if(dev){
        API="http://localhost:10000"+API;
    }

onMount(async ()=>{


    await getCountries();
    await createData();
    await getAllFoods();
    
    
});

//CBR's functions
async function getCountries(){
    try{
        let response=await fetch(API,{
            method:"GET"
        });
        let data=await response.json();
        countries=data;
        
              
    }catch(e){
        errorMSG="Error en el servidor";
}}




async function createData(){
    countries.filter((country)=>country.eu_country==name).map(
        (country)=>{
            container.push(["Respondieron si",parseInt(country.answer_yes)]);
            container.push(["Respondieron no",parseInt(country.answer_no)]);
            container.push(["Indecisos",parseInt(country.answer_n_a)]);
        });
    
} 


async function asignValue(){
    let element=document.getElementById("nameValue");
    name=element.value;
    createData();
    console.log(container);
    representGraph();
    container=[];
}


function collectCountryRepresented(){
    name=document.getElementById("nameValue");
    console.log(name);
    countries.map((country)=>{
        console.log(name==country.eu_country);
        if(name==country.eu_country){
            showGraph=true;
        }   
    });

    console.log(showGraph)
    if(showGraph==true){
        representGraph();
    }

    
}

function representGraph(){

    chart = Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: `Votaciones de ${name}`,
        align: 'center',
        verticalAlign: 'middle',
        y: 60,
        style: {
            fontSize: '1.1em'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -80,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Porcentaje de votos',
        innerSize: '50%',
        data: container
        
    }]
});}




//MMM 
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

</script>






{#if countries!=undefined}
<h1>Elige el pais que representar</h1>
<select id="nameValue" class="form-select form-select-lg" style="width: 30%;">    
    {#each countries as country}    
        <option value={country.eu_country}>{country.eu_country}</option>
    {/each}
</select>
{/if}
<Button on:click={asignValue}>Seleccionar</Button>




<div id="container" style="width:90%; height:600px;"></div>
<Container id="containerC" style="width:100%; height:400px;"></Container>