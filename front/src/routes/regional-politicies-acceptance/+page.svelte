<script>
import { Container } from '@sveltestrap/sveltestrap';
import { onMount } from "svelte";
import { get } from "svelte/store";
import {dev} from "$app/environment";
import { Button, Col, Row } from '@sveltestrap/sveltestrap';
import { Table } from '@sveltestrap/sveltestrap';

let API="/api/v1/regional-politicies-acceptance";
if(dev){
    API="http://localhost:10000"+API;
}
let countries=[];
let errorMSG="";
let newCountry={};
let addNew;

onMount(()=>{

    getCountries();
})


    async function getCountries(){
        try{
            let response=await fetch(API,{
                method:"GET"
            });
            let data=await response.json();
            countries=data;
            console.log(data);
    }catch(e){
        errorMSG=""+e;
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
            getCountries();
        }else{
            errorMSG="code:"+status;
        }
    }catch(e){
       errorMSG=errorMSG+e;
    }
}


async function deleteCountry(eu_country,year){
    try{
        let response=await fetch(API+"/"+eu_country+"/"+year,{
            method:"DELETE"
        });
    }catch(e){
        errorMSG=""+e;
    }
}

async function deleteCountries(){
    try{
        let response=fetch(API,{
            method:"DELETE"
        });
    }catch(e){
        errorMSG=""+e;
    }
}








</script>
<h1>Welcome to the votations</h1>

<Button on:click="{getCountries}">Refresh</Button>
<Button on:click="{deleteCountries}" color="warning">Delete all countries</Button>
<Container>
<Table bordered>
    <thead>
        <tr>
            <td>Country name</td>
            <td>People that vote yes</td>
            <td>People's percent that vote yes</td>
            <td>People that vote no</td>
            <td>People's percent that vote no</td>
            <td>People that vote not applicable</td>
            <td>People's percent that vote not applicable</td>
            <td>Total number of people</td>
            <td>Year of the vote</td>
            <td>ACTIONS</td>
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
            <Button color="primary" href="/regional-politicies-acceptance/{country.eu_country}/{country.year}">Edit</Button>
            <Button color="danger" on:click="{deleteCountry(country.eu_country,country.year)}">Delete</Button>
        </td>
    </tr>
    {/each}
    </tbody>
</Table>
</Container>

<h2>Create a country</h2>
<Table bordered>
    <thead>
        <tr>
            <td>Country name</td>
            <td>People that vote yes</td>
            <td>People's percent that vote yes</td>
            <td>People that vote no</td>
            <td>People's percent that vote no</td>
            <td>People that vote not applicable</td>
            <td>People's percent that vote not applicable</td>
            <td>Total number of people</td>
            <td>Year of the vote</td>
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

<button on:click="{createCountry}">Create</button>

    
   

{#if errorMSG!=""}
Error:{errorMSG}    
{/if}





  
  