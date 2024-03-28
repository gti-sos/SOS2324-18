<script>

import { onMount } from "svelte";
import {page} from "$app/stores";
import { Table } from "@sveltestrap/sveltestrap";
import {dev} from "$app/environment";

let eu_country=$page.params.eu_country;
let year=$page.params.year;
let oldCountry={};
let newCountry={"eu_country":eu_country,"year":year};
let errorMSG="";


let API="/api/v1/regional-politicies-acceptance";
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
        oldCountry=data[0];
    }}catch(e){
        errorMSG=""+e;
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
        window.location.href="/regional-politicies-acceptance/";
    }else{
        errorMSG="code:"+status;
    }}

</script>

<h2>Edit the country</h2>

{#if oldCountry!=undefined}
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
<button on:click="{updateCountry(newCountry.eu_country,newCountry.year)}">Enviar</button>
{/if}

{#if errorMSG!=""}
Error:{errorMSG}    
{/if}