<script>
import { Container } from '@sveltestrap/sveltestrap';
import { onMount } from "svelte";
import { get } from "svelte/store";
import {dev} from "$app/environment";
import { Button, Col, Row } from '@sveltestrap/sveltestrap';
import { Table } from '@sveltestrap/sveltestrap';
	


let API="/api/v2/regional-politicies-acceptance";
if(dev){
    API="http://localhost:10000"+API;
}
let countries=[];
let errorMSG="";
let newCountry={};

onMount(()=>{
    getCountries();
})


async function loadInitialData(){
    
    if(countries.length>=1){
        errorMSG="Ya existen datos previos";
    }else{
        try{
            let response=fetch(API+"/loadInitialdata",{
                method:"GET"
            })
            let data=(await response).status
            if(data==409){
                errorMSG="Ya se han cargado previamente los datos";
            }
            if(data==201){
                errorMSG="Se han cargado los datos correctamente"
            }
            
        }catch(e){
        errorMSG=e;
    }
}
}


async function getCountries(){
    try{
        let response=await fetch(API,{
            method:"GET"
        });
        let data=await response.json()
        if(data.length==0){
            errorMSG="";
            countries=data;
        }else{
            countries=data;
            errorMSG="Paises cargados";
        }
    }catch(e){
        errorMSG="Error en el servidor";
    }
    }


async function createCountry(){
        
        try{

        let response= await fetch(API,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newCountry)
        });


        let status=await response.status;
        if(status==201){
            errorMSG="Pais creado con exito";
        }if(status==400){
            errorMSG="Debe rellenar todos los campos";
        }
        if(status==409){
            errorMSG="Ya existe un pais con ese nombre y año";
        }
    }catch(e){
       errorMSG=e;
    }

    
    
}


async function deleteCountry(eu_country,year){
    try{
        let response=await fetch(API+"/"+eu_country+"/"+year,{
            method:"DELETE"
        });
        errorMSG="Pais borrado con exito";
    }catch(e){
        errorMSG="Error en el servidor";
    }
}

async function deleteCountries(){
    try{
        let response=fetch(API,{
            method:"DELETE"
        });
        errorMSG="Paises borrados con exito";
    }catch(e){
        errorMSG="Error en el servidor";
    }
}

function closePopUp(){
    
    errorMSG="";
    
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




<h1>Bienvenido a las votaciones</h1>
<Button on:click="{loadInitialData}" color="success">Crea datos de prueba</Button>
<Button on:click="{getCountries}" id="Refresh"color="primary">Recarga</Button>
<Button on:click="{deleteCountries}" color="warning">Borrar todos los paises</Button>
{#if errorMSG!=""}

    <div id="popup-container">
        <div id="popup">
            <Button id="close" on:click={closePopUp} color="danger">X</Button>
            <h3>{errorMSG}</h3>
        </div>
        
    </div>
{/if}
<Container>
<Table bordered>
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
            <td>ACCIONES</td>
        </tr>
    </thead>
    <tbody>
    {#each countries as country}
    <tr>
        <td>{country.eu_country}</td>
        <td>{country.yes}</td>
        <td>{country.answer_yes}</td>
        <td>{country.answer_no}</td>
        <td>{country.no}</td>
        <td>{country.answer_n_a}</td>
        <td>{country.n_a}</td>
        <td>{country.total}</td>
        <td>{country.year}</td>
        <td>
            <Button color="primary" href="/regional-politicies-acceptance/{country.eu_country}/{country.year}">Editar</Button>
            <Button color="danger" on:click="{deleteCountry(country.eu_country,country.year)}">Borrar</Button>
        </td>
    </tr>
    {/each}
    </tbody>
</Table>
</Container>


<h2>Crea un pais</h2>
<Table bordered>
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
            <td><input bind:value={newCountry.eu_country}></td>
            <td><input bind:value={newCountry.answer_yes}></td>
            <td><input bind:value={newCountry.yes}></td>
            <td><input bind:value={newCountry.answer_no}></td>
            <td><input bind:value={newCountry.no}></td>
            <td><input bind:value={newCountry.answer_n_a}></td>
            <td><input bind:value={newCountry.n_a}></td>
            <td><input bind:value={newCountry.total}></td>
            <td><input bind:value={newCountry.year}></td>
        </tr>
    </tbody>
</Table>

<Button on:click="{createCountry}" color="success">Crea</Button>