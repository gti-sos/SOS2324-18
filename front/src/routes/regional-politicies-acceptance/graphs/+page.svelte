<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://cdn.zingchart.com/zingchart.min.js"></script>



</svelte:head>




<script>  

import {onMount} from "svelte";
import {dev} from "$app/environment";
import { Button,Container,Accordion, AccordionItem,Alert} from '@sveltestrap/sveltestrap';
	

let ordenPaises = []; 
let resultado = [];
let chart;
let errorMSG;
let countries=[];
let container=[];
let name;
let field;
let API="/api/v2/regional-politicies-acceptance";



    
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




async function createDataCircle(){
    countries.filter((country)=>country.eu_country==name).map(
        (country)=>{
            container.push(["Respondieron si",parseInt(country.answer_yes)]);
            container.push(["Respondieron no",parseInt(country.answer_no)]);
            container.push(["Indecisos",parseInt(country.answer_n_a)]);
        });
    
} 


async function asignValueCircle(){
    let element=document.getElementById("nameValue");
    name=element.value;
    createDataCircle();
    await representGraphCircle();
    container=[];
}

async function asignValueBar(){
    const datosTransformados = {};
    field=document.getElementById("fieldToRepresent").value;

    console.log(field);
    countries.forEach(pais => {
        const nombrePais = pais.eu_country;
        const año = pais.year;
        const answerYes = parseInt(pais[field]);

        if (!datosTransformados[año]) {
            datosTransformados[año] = {};
        }

        // Si el país no ha sido agregado al orden de países, lo agregamos
        if (!ordenPaises.includes(nombrePais)) {
            ordenPaises.push(nombrePais);
        }

        datosTransformados[año][nombrePais] = answerYes;
    });

    // Ajustamos el orden de los datos según el orden de aparición de los países
    Object.keys(datosTransformados).forEach(año => {
        const datosOrdenados = [];
        ordenPaises.forEach(pais => {
            datosOrdenados.push(datosTransformados[año][pais] || 0); // Rellenamos con 0 si no existe el país
        });
        datosTransformados[año] = datosOrdenados;
    });

    
    Object.keys(datosTransformados).forEach(año => {
        resultado.push({ name: año, data: datosTransformados[año] });
    });

    
    console.log(resultado);
    console.log(ordenPaises);
    representGraphBar();
    resultado=[];
    ordenPaises=[];
    
}

function representGraphCircle(){

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

function representGraphBar(){
    

    Highcharts.chart('containerBar', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Evolución por años de los votos, de aceptación de politicas europeas',
        align: 'left'
    },
    subtitle: {
        text: 'Source: <a ' +
            'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
            'target="_blank">Wikipedia.org</a>',
        align: 'left'
    },
    xAxis: {
        categories: ordenPaises,
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Personas',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    tooltip: {
        valueSuffix: ' votos'
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: resultado
});

}



async function barZinChart(){

    
    let data=new Map();
    countries.forEach((country)=>{ 
        if(!data.has(country.year)){
            data.set(country.year,[parseInt(country.answer_yes),parseInt(country.answer_no),parseInt(country.answer_n_a)]);
        }else{
            
            let newList=data.get(country.year);
            newList=[newList[0]+parseInt(country.answer_yes),newList[1]+parseInt(country.answer_no),newList[2]+parseInt(country.answer_n_a)];
            data.set(country.year,newList);
        }
        }
    );
    console.log(data)
    let orderData=Array.from(data).sort()
    let labels=[]
    let yes=[]
    let nos=[]
    let n_as=[]
    orderData.forEach(elem=>{
        if(!labels.includes(elem[0])){
            labels.push(elem[0])
        }
        yes.push(elem[1][0])
        nos.push(elem[1][1])
        n_as.push(elem[1][2])
    })

 
    let finalData=[
        {
            values:yes,
            text:'Si'
        },
        {
            values:nos,
            text:'No'
        },
        {
            values:n_as,
            text:'No sabe'
        }
    ]
    console.log(finalData)

    let myConfig = {
  type: 'bar',
  title: {
    text: 'Votación de la aceptación de políticas europeas',
    fontSize: 24,
  },
  legend: {
    draggable: true,
  },
  scaleX: {
    // Set scale label
    label: { text: 'votos' },
    // Convert text on scale indices
    labels: labels
  },
  scaleY: {
    // Scale label with unicode character
    label: { text: 'votos' }
  },
  plot: {
    // Animation docs here:
    // https://www.zingchart.com/docs/tutorials/styling/animation#effect
    animation: {
      effect: 'ANIMATION_EXPAND_BOTTOM',
      method: 'ANIMATION_STRONG_EASE_OUT',
      sequence: 'ANIMATION_BY_NODE',
      speed: 275,
    }
  },
  series: finalData
};

zingchart.render({  id: 'myChart',  data: myConfig,
});
}

</script>






{#if countries!=undefined && countries.length>0}



<Container>
    <Accordion theme="auto">
        <Accordion theme="auto">
            <AccordionItem>
                <h4 class="m-0" slot="header">Elige el tipo de grafica</h4>
                <Accordion theme="auto">
                    <AccordionItem>
                        <h4 class="m-0" slot="header">Grafica semicirculo(Highcharts)</h4>
                        <h1>Elige el pais que representar</h1>
                            <select id="nameValue" class="form-select form-select-lg" style="width: 30%;">
                                {#each countries as country}    
                                    <option value={country.eu_country}>{country.eu_country}</option>
                                {/each}
                            </select>
                        <Button on:click={asignValueCircle}>Seleccionar</Button>
                        <div id="container" style="width:90%; height:600px;"></div>
                    </AccordionItem>
                    <AccordionItem>
                        <h4 class="m-0" slot="header">Grafica de barras(Highcharts)</h4>
                        <h2>Selecciona el campo que representar</h2>
                        <select id="fieldToRepresent" class="form-select form-select-lg" style="width: 30%;">
                            <option value="answer_yes">si</option>
                            <option value="answer_no">no</option>
                            <option value="answer_n_a">no aplicable</option>
                        </select>
                        <Button on:click={asignValueBar}>Generar</Button>
                        <div id="containerBar" style="width:90%; height:600px;"></div>
                    </AccordionItem>
                    <AccordionItem>
                        <h4 class="m-0" slot="header">Grafica barras (Zingchart)</h4>
                        <Button on:click={barZinChart}>Generar</Button>
                        <div id="myChart" style="width:90%; height:600px;"></div>
                    </AccordionItem>
                </Accordion>
            </AccordionItem>
        </Accordion>    
    </Accordion>
</Container>
{/if}


{#if countries==undefined || countries.length==0}
<Container xxl> 
    <Alert color="info" dismissible>
        <h3>No hay ningún pais aún, por favor cargue al menos 1 pais</h3>
    </Alert>
</Container>
{/if}









