<svelte:head> 
    <script src="https://code.highcharts.com/highcharts.js"></script>
</svelte:head>

<script>  

import {onMount} from "svelte";
import {dev} from "$app/environment";
import { Button} from '@sveltestrap/sveltestrap';

let chart;
let errorMSG;
let countries=[];
let container=[];
let name;
let showGraph=false;
let API="/api/v2/regional-politicies-acceptance";
let countriesName=[];


if(dev){
        API="http://localhost:10000"+API;
    }

onMount(async ()=>{


    await getCountries();
    await createData();
    
    
});


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