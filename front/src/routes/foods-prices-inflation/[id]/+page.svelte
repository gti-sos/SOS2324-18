<style>
    @import '/style.css';
</style>

<script>
    import { page } from '$app/stores';
    import { dev } from "$app/environment";
    import { Button } from '@sveltestrap/sveltestrap';
    import { Table } from '@sveltestrap/sveltestrap';
    import { Alert } from '@sveltestrap/sveltestrap';
    import {onMount} from "svelte";

    let ident = $page.params.id;
    let errorMsg="";
    let aceptadoMsg="";
    let vacio=-1;
    let newF = {
            "id": 47942,
            "open": 2.74,
            "high": 2.78,
            "low": 2.7,
            "close": 2.75,
            "inflation": -0.28,
            "country": "Yemen",
            "iso3": "YEM",
            "date": "2023-06-01"
        };
    let API = "/api/v2/foods-prices-inflation";

    if(dev)
        API = "http://localhost:10000"+API;

    onMount(() =>{
        getFoods();
    });

    async function parsea(obj){
        obj.id=parseInt(obj.id);
        obj.open=parseFloat(obj.open);
        obj.high=parseFloat(obj.high);
        obj.low=parseFloat(obj.low);
        obj.close=parseFloat(obj.close);
        obj.inflation=parseFloat(obj.inflation);
        obj.country;
        obj.iso3;
        obj.date;
    }

    async function getFoods(){
        vacio=-1;
        let response = await fetch(API+"/"+ident, {
            method: "GET"
        });
        let status = await response.status;
        if(status==404)
            vacio=1;
        else{
            vacio=0;
            let data = await response.json();
            console.log(data);
            newF = data;
        }
    }

    async function putFoods(){
        errorMsg="";
        aceptadoMsg="";
        parsea(newF);
        console.log(ident);
        try{
            let response = await fetch(API+"/"+ident, {
                method: "PUT",
                headers:{
                        "Content-Type": "application/json"
                },
                body: JSON.stringify(newF,null,2)
            });
            //ident=newF.id;
            let status = await response.status;
            console.log(`Creation response status ${status}`);
            if(status==200){
                getFoods();
                aceptadoMsg = `SE HA ACTUALIZADO EL OBJETO CON EL ID ${newF.id}`;
                window.location.href = "/foods-prices-inflation";
            }else
                errorMsg = `EL OBJETO CON EL ID ${newF.id} NO EXISTE`;    
        } catch (e) {
            errorMsg= "Code: "+e;  
        }
    }
</script>

{#if vacio == 0}
<h3>Detalles del id {ident}</h3>

<Table bordered>
    <thead>
        <tr>
            <th>ID</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Inflation</th>
            <th>Country</th>
            <th>ISO3</th>
            <th>Date</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>{newF.id}</td>
            <td><input bind:value={newF.open}></td>
            <td><input bind:value={newF.high}></td>
            <td><input bind:value={newF.low}></td>
            <td><input bind:value={newF.close}></td>
            <td><input bind:value={newF.inflation}></td>
            <td><input bind:value={newF.country}></td>
            <td><input bind:value={newF.iso3}></td>
            <td><input bind:value={newF.date}></td>
        </tr>
    </tbody>
</Table>
<Button on:click="{putFoods}" color="success">Actualizar</Button><br>
{/if}
{#if vacio==1}
<Alert color="info">ERROR: NO SE HA ENCONTRADO EL ID {ident}</Alert>
{/if}


{#if errorMsg != ""}
<Alert color="info" dismissible>
    ERROR: {errorMsg}
</Alert>
{/if}

{#if aceptadoMsg != ""}
<Alert color="info" dismissible>
    {aceptadoMsg}
</Alert>
{/if}