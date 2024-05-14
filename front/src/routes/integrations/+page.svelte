<svelte:head>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
    <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>


</svelte:head>




<script>  

import {onMount} from "svelte";
import {dev} from "$app/environment";
import { Button,Container,Accordion, AccordionItem,Alert, Card} from '@sveltestrap/sveltestrap';




	


let errorMSG;
let countries=[];
let mixedCountriesCovid19=[];
let API="/api/v2/regional-politicies-acceptance";


let covidStats=[]
    
if(dev){
        API="http://localhost:10000"+API;
        
    }

onMount(async ()=>{

    await getCountries();
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



async function createCovid19Integration(){


    const url = 'https://covid-193.p.rapidapi.com/statistics';
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': apiCovidCarbeario,
		    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
        covidStats=result.response
    } catch (error) {
	    console.error(error);
    }




    //Union of the covidApi and regional-politiciesApi

    covidStats.map(elem=>{
        mixedCountriesCovid19.push(elem.country.toLowerCase())
    })
   let graphLabels=[]
    countries.forEach(elem=>{
        if(mixedCountriesCovid19.includes(elem.eu_country)){
            graphLabels.push(elem.eu_country)
        }
    })
    
    
    let votes=countries.filter(elem=>graphLabels.includes(elem.eu_country)).map(elem=>{return{
        label:elem.eu_country,
        y:parseInt(elem.total)
        }
    })
    votes.sort((a,b)=>{
        if (a.label < b.label) {
            return -1;
        }
        if (a.label > b.label) {
            return 1;
        }
        return 0;
        });
    
    let deaths=covidStats.filter(elem=>graphLabels.includes(elem.country.toLowerCase())).map(elem=>{return{
        label:elem.country.toLowerCase(),
        y:parseInt(elem.deaths["1M_pop"])
    }})
    deaths.sort((a,b)=>{
        if (a.label < b.label) {
            return -1;
        }
        if (a.label > b.label) {
            return 1;
        }
        return 0;
    });
    
    //Create the grafic 

    var chart = new CanvasJS.Chart("chartContainer", {
                title: {
                    text: "Aceptación de politicas europeas y muertes por Covid-19"
                },
                axisY: {
                    title: "Votos"
                },
                axisY2: {
                    title: "Muertes por Covid-19"
                },
                data: [{
                    type: "column",
                    name: "Votos",
                    axisYType: "primary",
                    showInLegend:true,
                    dataPoints: votes
                },
                {
                    type: "column",
                    name: "Muertes por Covid-19",
                    axisYType: "secondary",
                    showInLegend:true,
                    dataPoints: deaths
                }]
            });
            chart.render();
}



async function createPopulationIntegration(){
    

    let apiCountriesData=[];
    let mixedCountriesPopulation=[];

try{

    let response=await fetch('https://restfulcountries.com/api/v1/countries', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiCountriesCarbeario}` // Reemplaza {TOKEN} con tu token real
    }})

    let data=await response.json()
    apiCountriesData=data.data

   
    }catch(error){
        console.error(error)
    }

   let countNames=countries.map(elem=>elem.eu_country)
    apiCountriesData.map((country)=>country.name.toLowerCase()).filter((country)=>countNames.includes(country)).forEach((country)=>{
        mixedCountriesPopulation.push(country)
    })
    
    let valuesPopulation=[]
    apiCountriesData.sort(elem=>elem.name).forEach((country)=>{
        if(mixedCountriesPopulation.includes(country.name.toLowerCase())){
            valuesPopulation.push([country.name.toLowerCase(),country.population.replace(/,/g, "")/1000000])
        }
    })


    let valuesVotes=[]
    countries.sort(elem=>elem.eu_country).forEach((country)=>{
        if(mixedCountriesPopulation.includes(country.eu_country)){
            valuesVotes.push([country.eu_country,parseInt(country.total)])
        }
    })
    

    valuesPopulation.sort((a,b)=>{
        if(a[0]<b[0]){
            return -1
        }
        if(b[0]<a[0]){
            return 1
        }
        return 0
    })
    valuesVotes.sort((a,b)=>{
        if(a[0]<b[0]){
            return -1
        }
        if(b[0]<a[0]){
            return 1
        }
        return 0
    })
    
    var myConfig = {
  type: 'mixed',
  title: {
    text: 'Gráfica Poblacion/Votos totales'
  },
  scaleX: {
    labels: mixedCountriesPopulation // Usamos el array ordenado aquí
  },
  scaleY: {
    label: {
      text: 'Población(Millones de personas)',
      fontSize: '10px'
    },
    guide: {
      visible: false
    }
  },
  scaleY2: {
    label: {
      text: 'Votos',
      fontSize: '10px'
    },
    guide: {
      visible: false
    }
  },
  series: [
    {
      type: 'area',
      values: valuesPopulation,
      scales: 'scale-x,scale-y' // Corregido a 'scale-y' (en lugar de 'scaleY')
    },
    {
      type: 'area',
      values: valuesVotes,
      scales: 'scale-x,scale-y-2' // Corregido a 'scale-y-2' (en lugar de 'scaleY2')
    }
  ]
};


zingchart.render({
  id: 'myChart',
  data: myConfig,
  height: '100%',
  width: '100%'
});
}



async function createCountriesIntegration(){
    
    
    let data
    let mixedData=[]
    const url = 'https://restcountries.com/v3.1/all';
    const options = {
	    method: 'GET'
    }

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
        data=result
    } catch (error) {
	    console.error(error);
    }
    
    let countryAreas=[];
    data.forEach((country)=>{
        countryAreas.push(country.name.common.toLowerCase())
    })

    countries.forEach(elem=>{
        if(countryAreas.includes(elem.eu_country)){
            mixedData.push(elem.eu_country)
        }
    })
  
    let countryData=[]
    let areaData=[]

    data.forEach(e=>{
        if(mixedData.includes(e.name.common.toLowerCase())){
            areaData.push([e.name.common.toLowerCase(),e.area])
        }
    })


    countries.forEach(e=>{
        if(mixedData.includes(e.eu_country)){
            countryData.push([e.eu_country,e.total])
        }
    })
    

    areaData.sort((a,b)=>{
        if(a[0]<b[0]){
            return -1
        }
        if(b[0]<a[0]){
            return 1
        }
        return 0
    })


    areaData=areaData.map(e=>{
        return {
            y:e[1],
            indexLabel:e[0]
        }
    })

    countryData.sort((a,b)=>{
        if(a[0]<b[0]){
            return -1
        }
        if(b[0]<a[0]){
            return 1
        }
        return 0
    })

    countryData=countryData.map(e=>{
        return {
            y:parseInt(e[1]),
            indexLabel:e[0]
        }
    })





    var chart = new CanvasJS.Chart("chartContainerAreas", {
                title: {
                    text: "Aceptación de politicas europeas y muertes por Covid-19"
                },
                axisY: {
                    title: "Votos"
                },
                axisY2: {
                    title: "Muertes por Covid-19"
                },
                data: [{
                    type: "area",
                    name: "Votos",
                    axisYType: "primary",
                    showInLegend:true,
                    dataPoints: countryData
                },
                {
                    type: "area",
                    name: "Areas(km2)",
                    axisYType: "secondary",
                    showInLegend:true,
                    dataPoints: areaData
                }]
            });
            chart.render();


}

    

async function createIntegration() {

    let pibCountries=[]



    let data=await fetch('http://localhost:10000/api/v2/regional-politicies-acceptance/proxy')
    .then(response => response.json())

    data[1].forEach(e=>{
        pibCountries.push([e.country.value.toLowerCase(),e.value])
    })
      


    let containerPib=[] 
    let datos=new Map()
    pibCountries.forEach(e=>{
        if(!datos.has(e[0])){
            datos.set(e[0],e[1])
        }else{
            let newValue=datos.get(e[0])+e[1]
            datos.set(e[0],newValue)
        }})

    datos.entries().forEach(e=>{
        containerPib.push(e)
    })
    

    let containerVotes=[]
    countries.forEach(e=>{
        if(datos.has(e.eu_country)){
            containerVotes.push([e.eu_country,parseInt(e.total)])
        }
    })




    containerPib.sort((a,b)=>{
        if(a[0]<b[0]){
            return -1
        }
        if(b[0]<a[0]){
            return 1
        }
        return 0
    })


    containerVotes.sort((a,b)=>{
        if(a[0]<b[0]){
            return -1
        }
        if(b[0]<a[0]){
            return 1
        }
        return 0
    })


    let labels=containerVotes.map(e=>e[0])

    
    let votes=containerVotes.map(e=>e[1])
    let pibs=containerPib.map(e=>e[1]/100000000000)
    console.log(containerPib)
    console.log(containerVotes)

    Highcharts.chart('containerVotes', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Relacion entre votos y pib de paises',
        align: 'left'
    },
    xAxis: {
        categories: labels,
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: [{
        title: {
            text: 'Unidades'
        }
    }],
    series: [{
        name: 'Pib(miles de millones)',
        data: pibs,
    }, {
        name: 'Votos',
        data: votes,
    }]
});





}


</script>



<Container>
<h1>Que usuario quiere elegir?</h1>
    <div class="container" style="display: grid; grid-template-columns: 33% 33% 33%">
        
        <div class="card">
            <div class="photo">
                <a href="http://localhost:5173/integrations/carbeario"><img src = "https://th.bing.com/th/id/OIP.cbVEYW64oNlc7QA8PK6ETAAAAA?rs=1&pid=ImgDetMain" alt="Imagen" style="max-width: 100%;max-height: 100%;display: block;"></a>
            </div>
            <Card><h3>Carlos</h3></Card>
        </div>
        </div>   

</Container>
