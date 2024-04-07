<script>

    import { onMount } from "svelte";
    import {page} from "$app/stores";
    import { Button,Table,Container,Alert } from "@sveltestrap/sveltestrap";
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
        
        newCountry.total=parseInt(newCountry.answer_yes)+parseInt(newCountry.answer_no)+parseInt(newCountry.answer_n_a);
        newCountry.yes=(newCountry.answer_yes/newCountry.total).toFixed(2);
        newCountry.no=(newCountry.answer_no/newCountry.total).toFixed(2);
        newCountry.n_a=(newCountry.answer_n_a/newCountry.total).toFixed(2);
    
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
    
    
    
    
    {#if exists == true}
    <Container xxl>
        
        {#if errorMSG!=""}
            <Alert color="info" dismissible>
                {errorMSG}
            </Alert>
        {/if}
        <h2>Edita el pais</h2>
        <Table>
            <thead>
                <tr>
                    <td>Nombre pais</td>
                    <td>Personas que votaron si</td>
                    <td>Personas que votaron no</td>
                    <td>Personas que votaron no aplicable</td>
                    <td>Año de la votación</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{oldCountry.eu_country}</td>
    
                    <td><input bind:value={newCountry.answer_yes} placeholder="{oldCountry.answer_yes}" id="yes"></td>
                    <td><input bind:value={newCountry.answer_no} placeholder="{oldCountry.answer_no}" id="no"></td>                
                    <td><input bind:value={newCountry.answer_n_a} placeholder="{oldCountry.answer_n_a}" id="n_a"></td>
    
                    <td>{oldCountry.year}</td>
                </tr>
            </tbody>
        </Table>
    <Button on:click="{updateCountry(newCountry.eu_country,newCountry.year)}" color="primary" id="send">Enviar</Button>
    <Button on:click={back} color="warning" id="back">Volver</Button>
    </Container>
    {/if}
    
    
    {#if exists!=true}
        {#if errorMSG!=""}
            <Container xxl>
                <Alert color="info" dismissible>
                    {errorMSG}
                </Alert>
                <Button on:click={back} color="warning">Volver</Button>
            </Container>
        {/if}
    {/if}
    
    