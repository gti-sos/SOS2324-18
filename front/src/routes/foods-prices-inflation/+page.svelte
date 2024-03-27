<script>
    import {onMount} from "svelte";
    import { dev } from "$app/environment";

    let API = "/api/v1/foods-prices-inflation";

    if(dev)
        API = "http://localhost:10000"+API;

    let foods = [];
    let errorMsg = "";
    let aceptadoMsg = "";
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

    onMount(() =>{
        getFoods();
    });

    async function loadInitialDataFoods(){
        errorMsg="";
        aceptadoMsg = "";
        try {
            let response = await fetch(API+"/loadInitialData", {
                method: "GET"
            });

            let status = await response.status;
            if(status==201){
                getFoods();
                aceptadoMsg = "DATOS CARGADOS CON EXITO";
            }else
                errorMsg = "YA HAY DATOS CARGADOS";    
        } catch (e) {
            errorMsg= "Code: "+e;  
        }
    }

    async function getFoods(){
        let response = await fetch(API, {
            method: "GET"
        });

        let data = await response.json();
        foods = data;
        console.log(data);
    }

    async function deleteFoods(id){
        errorMsg="";
        aceptadoMsg = "";
        try{
            let response = await fetch(API+"/"+id, {
                method: "DELETE"
            });

            let status = await response.status;
            if(status==200){
                getFoods();
                aceptadoMsg = `SE HA ELIMINADO EL OBJETO CON EL ID ${id}`;
            }else
                errorMsg = "NO SE HA PODIDO ELIMINAR";
        } catch (e) {
            errorMsg= "Code: "+e;  
        }
    }

    async function createFoods(){
        errorMsg="";
        aceptadoMsg = "";
        try {
            let response = await fetch(API, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newF,null,2)
            });

            let status = await response.status;
            console.log(`Creation response status ${status}`);
            if(status==201){
                getFoods();
                aceptadoMsg = `SE HA CREADO EL OBJETO CON EL ID ${newF.id}`;
            }else
                errorMsg = `EL OBJETO CON EL ID ${newF.id} YA EXISTE O NO SE HA PODIDO CREAR`;    
        } catch (e) {
            errorMsg= "Code: "+e;  
        }
        
    }

    async function errores(e){
        e = e.substring(6,9);
        switch(e){
            case "400":
                errorMsg = "Peticion Incorrecta";
                break;
            case "404":
                errorMsg = "No ha sido encontrado";
                break;
            case "405":
                errorMsg = "Esta peticion esta prohibida";
                break;
            case "409":
                errorMsg = "Conflicto";
                break;
        }
    }

    async function aceptado(e){
        switch(e+""){
            case "200":
                aceptadoMsg = "Peticion aceptada";
                break;
            case "201":
                aceptadoMsg = "Creado con exito";
                break;
        }
    }

</script>

<h3>LISTA <button on:click="{loadInitialDataFoods}">Cargar Datos</button></h3>
<ul>
    {#each foods as food}
        <li><a href="/foods-prices-inflation/{food.id}">{food.id}</a> - {food.open} - {food.high} - {food.low} - {food.close} - {food.inflation} - {food.country} - 
            {food.iso3} - {food.date}
            <button on:click="{deleteFoods(food.id)}">Borrar</button></li>
    {/each}
</ul>

<table>
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
            <td><input bind:value={newF.id}></td>
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
</table>

<button on:click="{createFoods}">Crear</button><br>

{#if errorMsg != ""}
{#await errores(errorMsg)}.{/await}
ERROR: {errorMsg}
{/if}

{#if aceptadoMsg != ""}
{aceptadoMsg}
{/if}