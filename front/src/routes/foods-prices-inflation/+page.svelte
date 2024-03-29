<script>
    import {onMount} from "svelte";
    import { dev } from "$app/environment";
    import { Button } from '@sveltestrap/sveltestrap';
    import { Table } from '@sveltestrap/sveltestrap';
    import { Alert } from '@sveltestrap/sveltestrap';

    let API = "/api/v1/foods-prices-inflation";

    if(dev)
        API = "http://localhost:10000"+API;

    let foods = [];
    let Allfoods = [];
    let errorMsg = "";
    let aceptadoMsg = "";
    let page = 1;
    let pageSize = 5;
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
        page=1;
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
        let response = await fetch(API+"?page="+page+"&pageSize="+pageSize, {
            method: "GET"
        });

        let data = await response.json();
        getAllFoods();
        foods = data;
        console.log(data);
    }

    async function getAllFoods(){
        let response = await fetch(API+"?pageSize=10000", {
            method: "GET"
        });

        let data = await response.json();
        Allfoods = data;
        console.log(data);
    }

    async function deleteFoods(id){
        errorMsg="";
        aceptadoMsg = "";
        page=1;
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

    async function deleteAllFoods(){
        errorMsg="";
        aceptadoMsg = "";
        page=1;
        try{
            let response = await fetch(API, {
                method: "DELETE"
            });

            let status = await response.status;
            if(status==200){
                getFoods();
                aceptadoMsg = `SE HAN ELIMINADO TODOS LOS OBJETOS`;
            }else
                errorMsg = "NO SE HA PODIDO ELIMINAR";
        } catch (e) {
            errorMsg= "Code: "+e;  
        }
    }

    async function createFoods(){
        errorMsg="";
        aceptadoMsg = "";
        page=1;
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
    async function suma1(){
        page++;
        getFoods();
    }

    async function resta1(){
        page--;
        getFoods();
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

<h3>LISTA <Button on:click="{loadInitialDataFoods}" color="success">Cargar Datos</Button></h3>
<!--ul>
    {#each foods as food}
        <li><a href="/foods-prices-inflation/{food.id}">{food.id}</a> - {food.open} - {food.high} - {food.low} - {food.close} - {food.inflation} - {food.country} - 
            {food.iso3} - {food.date}
            <button on:click="{deleteFoods(food.id)}">Borrar</button>
        </li>
    {/each}
</ul-->


<Table striped>
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
            <th></th>
        </tr>
    </thead>

    <tbody>
        {#each foods as food}
        <tr>
            <td>{food.id}</td>
            <td>{food.open}</td>
            <td>{food.high}</td>
            <td>{food.low}</td>
            <td>{food.close}</td>
            <td>{food.inflation}</td>
            <td>{food.country}</td>
            <td>{food.iso3}</td>
            <td>{food.date}</td>
            <td><Button on:click="{deleteFoods(food.id)}" color="warning">Borrar</Button></td>
        </tr>
        {/each}
    </tbody>
</Table>

<!--PASAR DE PAGINAS-->
<p>
{#if page > 1}
<Button on:click="{resta1}" color="info">&lt;---</Button>
{/if}

{#if page < Allfoods.length/pageSize}
<Button on:click="{suma1}" color="info">---&gt;</Button>
{/if}
</p>

{#if foods.length != 0}
<p><Button on:click="{deleteAllFoods}" color="danger">Borrar Todo</Button></p>
{/if}

<h3>AGREGAR DATO</h3>
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
</Table>

<Button on:click="{createFoods}" color="success">Crear</Button><br>

{#if errorMsg != ""}
{#await errores(errorMsg)}.{/await}
<Alert color="info" dismissible>
    ERROR: {errorMsg}
</Alert>
{/if}

{#if aceptadoMsg != ""}
<Alert color="info" dismissible>
    {aceptadoMsg}
</Alert>
{/if}

<!--style>
    table {
        border: #b2b2b2 1px solid;
        width: 70%;
    }
    td, th {
        border: black 1px solid;
    }
</style-->
