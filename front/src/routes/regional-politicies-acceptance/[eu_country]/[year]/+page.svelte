<script>

import { onMount } from "svelte";
import {page} from "$app/stores";
import { Button,Table } from "@sveltestrap/sveltestrap";
import {dev} from "$app/environment";



let exists=false;
let eu_country=$page.params.eu_country;
let year=$page.params.year;
let oldCountry={};
let newCountry={"eu_country":eu_country,"year":year};
let errorMSG="";


let API="/api/v2/regional-politicies-acceptance";
if(dev){
    API="http://localhost:10000"+API;
}

onMount(()=>{
    getCountry(eu_country,year);
});


//OLD COUNTRY
async function getCountry(eu_country,year){    
    try{
    let response=await fetch(API+"/"+eu_country+"/"+year,{
        method:"GET"
    });
    let status=response.status;
    if(status==200){
        let data=await response.json();
        oldCountry=data;
        exists=true;
        console.log("hola");
        console.log(oldCountry);
        
    }
    if(status==404){
        exists=false;
        errorMSG="No existe un pais que tenga ese nombre o año"
        }
    }catch(e){
        errorMSG="Error servidor";
    }
}


//UPDATE
async function updateCountry(eu_country,year){
    
    let response=await fetch(API+"/"+eu_country+"/"+year,{
        method: "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newCountry)
    });

    
    let status=await response.status;
    if(status==201){

        errorMSG="Pais editado con exito";
        
    }if(status==400){
        errorMSG="Rellene los campos vacios";
    }

    


}


function closePopUp(){
    errorMSG="";
}

function back(){
    window.location.href="/regional-politicies-acceptance/";
}

</script>




<style>
    
    #popup-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
  }
    
    
    
    #popup{
        width: 80%; /* Utilizando porcentaje para hacerlo responsive */
        max-width: 300px; /* Estableciendo un ancho máximo */
        background-color: rgba(0, 0, 0, 0.8); /* Fondo semitransparente */
        color: white;
        border-radius: 10px;
        padding: 20px
    }
       
</style>





<h2>Edita el pais</h2>

{#if exists == true}
<Table>
    <thead>
        <tr>
            <td>Nombre pais</td>
            <td>Personas que votaron si</td>
            <td>Porcentaje de personas que votaron si</td>
            <td>Personas que votaron no</td>
            <td>Porcentaje de personas que votaron no</td>
            <td>Personas que votaron no aplicable</td>
            <td>Porcentaje de personas que votaron no aplicable</td>
            <td>Numero total de personas</td>
            <td>Año de la votación</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{oldCountry.eu_country}</td>
            <td><input bind:value={newCountry.answer_yes} placeholder="{oldCountry.answer_yes}"></td>
            <td><input bind:value={newCountry.yes} placeholder="{oldCountry.yes}"></td>
            <td><input bind:value={newCountry.answer_no} placeholder="{oldCountry.answer_no}"></td>
            <td><input bind:value={newCountry.no} placeholder="{oldCountry.no}"></td>
            <td><input bind:value={newCountry.answer_n_a} placeholder="{oldCountry.answer_n_a}"></td>
            <td><input bind:value={newCountry.n_a} placeholder="{oldCountry.n_a}"></td>
            <td><input bind:value={newCountry.total} placeholder="{oldCountry.total}"></td>
            <td>{oldCountry.year}</td>
        </tr>
    </tbody>
</Table>
<Button on:click="{updateCountry(newCountry.eu_country,newCountry.year)}" color="primary">Enviar</Button>
<Button on:click={back} color="warning">Volver</Button>

{/if}


{#if errorMSG!=""}



<div id="popup-container">
    <div id="popup">
        <Button id="close" on:click={closePopUp} color="danger">X</Button>
        <h3>{errorMSG}</h3>
    </div>
    
</div>

<Button on:click={back} color="warning">Volver</Button>

{/if}

