<svelte:head> 
    <script src="https://code.highcharts.com/highcharts.js"></script>
</svelte:head>

<style>
    @import '/style.css';
</style>

<script>  

import {onMount} from "svelte";
import {dev} from "$app/environment";
import { Button,Container} from '@sveltestrap/sveltestrap';

import { datosExtra } from "../eu-solidarity-funds/datosExtra"

//Datos MMM
async function createDataExtra() {
    // Filtra tus datos por los países presentes en la lista de países de tus compañeros
    let filteredData = datosExtra.filter((item) => paises.includes(item.applicant_country.toLowerCase()));

    // Crea la serie de datos para tu gráfica
    let extraData = {
        name: 'Total Direct Damage Accepted', // Nombre de tu serie
        type: 'spline', // Tipo de gráfica
        yAxis: 1, // Asigna el eje Y secundario
        data: filteredData.map((item) => parseFloat(item.total_direct_damage_accepted)), // Extrae los valores de total_direct_damage_accepted
        tooltip: {
            valueSuffix: '€' // Sufijo para los valores en el tooltip
        }
    };

    return extraData;
}



//CBR's vars
let chart;
let errorMSG;
let countries=[];
let container=[];
let name;
let showGraph=false;
let CBR_API="/api/v2/regional-politicies-acceptance";
let countriesName=[];
let field;
let fieldData;

//JGV's vars
let ser=[];
let cat=new Set();
let Allfoods=[];
let JGV_API = "/api/v2/foods-prices-inflation";


let paises = ["españa", "alemania", "francia", "portugal", "italia", "reino unido", "grecia", "turquia", "suiza", "belgica"]


if(dev){
        CBR_API="http://localhost:10000"+CBR_API;
        JGV_API="http://localhost:10000"+JGV_API;
    }

onMount(async ()=>{

    await getCountries();
    await getAllFoods();
    
   
    
      
    
});

//CBR's functions
async function getCountries(){
    try{
        let response=await fetch(CBR_API,{
            method:"GET"
        });
        let data=await response.json();
        countries=data;              
    }catch(e){
        errorMSG="Error en el servidor";
}}




async function createDataCBR(){
    

    let data=[];
    paises.forEach((country)=>{
        for(let i=0;i<countries.length;i++){
            if(country===countries[i].eu_country){
                data.push(parseFloat(countries[i][field]));
                
            }
            
        }
    });
   
    fieldData= {
            name: 'Votos',
            type: 'bar',
            color: Highcharts.getOptions().colors[2],
            data: []
        }
    fieldData.data=data;
} 


async function asignValue(){

    let element=document.getElementById("nameField");
    field=element.value;
    await createDataCBR();
    switch(field){
        case "yes":
            field="Porcentaje de personas que votaron si"
            break;
        case "no":
            field="Porcentaje de personas que votaron no"
            break;
        case "n_a":
            field="Porcentaje de personas que votaron no aplicable"
            break;
    }
    await graphCommon();
}


//JGV 
async function getAllFoods(){
        let response = await fetch(JGV_API+"?pageSize=10000", {
            method: "GET"
        });

        let data = await response.json();
        Allfoods = data;
        creaLineas();  
        console.log(data);
    }

async function creaLineas(){
        let inflation= {
            name: 'Inflacion',
            data: [0,0,0,0,0,0,0,0,0,0]
        }
        cat=new Set(paises);
        for(let i=0; i<Allfoods.length; i++){
            if(paises.includes(Allfoods[i].country)){
                //cat.add(Allfoods[i].country);
                let id = Array.from(cat).indexOf(Allfoods[i].country);
                console.log(id);
                inflation.data[id]+=Allfoods[i].inflation;
            }
        }
        ser=inflation; open
        cat=[...cat];
        console.log(inflation.data);
    }


async function graphCommon(){
    let extraSeries = await createDataExtra();

    Highcharts.chart('container', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Correlación entre votaciones,inflación en precios y fondos de solaridad',
        align: 'left'
    },
    subtitle: {
        text: 'Source: https://sos2324-18.appspot.com',
        align: 'left'
    },
    xAxis: [{
        categories: cat,
        crosshair: true
    }],
    yAxis: [{ // CBR yAxis
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
        title: {
            text: `${field}`,
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
        opposite: true

    }, { // JGV yAxis
        gridLineWidth: 0,
        title: {
            text: 'Inflacion',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} ',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }



        

    }, { // Tertiary yAxis
        gridLineWidth: 0,
        title: {
            text: 'Daño total directo aceptado',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        labels: {
            format: '{value} mb',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [fieldData, ser, extraSeries],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    floating: false,
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    x: 0,
                    y: 0
                },
                yAxis: [{
                    labels: {
                        align: 'right',
                        x: 0,
                        y: -6
                    },
                    showLastLabel: false
                }, {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -6
                    },
                    showLastLabel: false
                }, {
                    visible: false
                }]
            }
        }]
    }
});
}
</script>






{#if countries!=undefined || countries.length>0}
<h1>Elige el pais que representar</h1>
<select id="nameField" class="form-select form-select-lg" style="width: 30%;">    
    <option value="yes">Porcentaje del si</option>
    <option value="no">Porcentaje del no</option>
    <option value="n_a">Porcentaje del no aplica</option>
    
</select>
{/if}
<Button on:click={asignValue}>Seleccionar</Button>



<Container xxl>
    <div id="container" style="width:90%; height:600px;">
    </div>
</Container>
