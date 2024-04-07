<script>
    import { Accordion, AccordionHeader, AccordionItem, Alert, Container } from '@sveltestrap/sveltestrap';
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import {dev} from "$app/environment";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import { Table } from '@sveltestrap/sveltestrap';
    import { Pagination,PaginationItem,PaginationLink } from '@sveltestrap/sveltestrap';
    import {Card,CardBody,CardFooter,CardHeader,CardSubtitle,CardText,CardTitle} from '@sveltestrap/sveltestrap';
    
    
        
    let API="/api/v2/regional-politicies-acceptance";
    if(dev){
        API="http://localhost:10000"+API;
    }
    
    
    let countries=[];
    let errorMSG="";
    let newCountry={};
    let searchedCountry={}
    let initialYear;
    let lastYear;
    
    let pages=[];
    let showedCountries=[];
    let offset;
    let actualPage=0;
    let closed=undefined;
    
    onMount(async ()=>{
        
        
        await getCountries();
        await showedCountr(offset);
        
        
    });
    
    
    
    //LOAD INITIAL DATA
    async function loadInitialData(){
        
        if(countries.length>=1){
            errorMSG="Ya existen datos previos";
            await refreshPage(actualPage);
            window.scroll(0,0);
        }else{
            try{
                let response=await fetch(API+"/loadInitialdata",{
                    method:"GET"
                })
                let data=response.status;
                if(data==409){
                    errorMSG="Ya se han cargado previamente los datos";
                    await refreshPage(actualPage);
                    window.scroll(0,0);
                }
                if(data==201){
                    errorMSG="Se han cargado los datos correctamente";
                    await refreshPage(actualPage);
                    window.scroll(0,0);
                    
                }
                
            }catch(e){
            errorMSG=e;
            refreshPage(actualPage);
            window.scroll(0,0);
            }
        }
    }
    
    //GET ALL COUNTRIES
    async function getCountries(){
        try{
            let response=await fetch(API,{
                method:"GET"
            });
            let data=await response.json();
            if(data.length==0){
                countries=data;
            }if(pages.length>=0){//cambiar dinamicamente
                pages=[];
                for(let i=0;i<=parseInt(data.length/10);i++){
                    pages.push(i);
                }
                pages=pages;
            }else{
                countries=data;
                
            }
            
        }catch(e){
            errorMSG="Error en el servidor";
        }
        }
    
    //CREATE A COUNTRY
    async function createCountry(){
            
        try{
    
            newCountry.total=parseInt(newCountry.answer_yes)+parseInt(newCountry.answer_no)+parseInt(newCountry.answer_n_a);
            newCountry.yes=(newCountry.answer_yes/newCountry.total).toFixed(2);
            newCountry.no=(newCountry.answer_no/newCountry.total).toFixed(2);
            newCountry.n_a=(newCountry.answer_n_a/newCountry.total).toFixed(2);
    
            let response= await fetch(API,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newCountry)
            });
    
    
            let status= response.status;
            if(status==201){
                errorMSG="Pais creado con exito";
                await refreshPage(actualPage);
                window.scroll(0,0);
            }if(status==400){
                errorMSG="Debe rellenar todos los campos";
                await refreshPage(actualPage);
                window.scroll(0,0);
            }
            if(status==409){
                errorMSG="Ya existe un pais con ese nombre y año";
                await refreshPage(actualPage);
                window.scroll(0,0);
            }
        }catch(e){
            errorMSG=e;
            await refreshPage(actualPage);
            window.scroll(0,0);
        }
    
        
        
    }
    
    //DELETE A COUNTRY
    async function deleteCountry(eu_country,year){
        try{
            let response=await fetch(API+"/"+eu_country+"/"+year,{
                method:"DELETE"
            });
            switch(response.status){
                case 200:
                    errorMSG="Pais borrado con exito";
                    refreshPage(actualPage);
                    window.scroll(0,0);
                    break;
                case 404:
                    errorMSG="El pais que ha intentado borrar no existe";
                    refreshPage(actualPage);
                    window.scroll(0,0);
                    break;
            }
        }catch(e){
            errorMSG="Error en el servidor";
        }
    }
    
    
    //DELETE ALL COUNTRIES
    async function deleteCountries(){
        
        try{
            let response=await fetch(API,{
                        method:"DELETE"
                    });
                    switch(response.status){
                        case 200:
                            errorMSG="Paises borrados con exito";
                            await refreshPage(actualPage);
                            window.scroll(0,0);
                            break;
                        case 404:
                            errorMSG="El pais que ha intentado borrar no existe";
                            await refreshPage(actualPage);
                            window.scroll(0,0);
                            break;
                        case 400:
                            errorMSG="No existen paises que puedan ser borrados";
                            await refreshPage(actualPage);
                            window.scroll(0,0);
                            break;
                    }
                }catch(e){
                    errorMSG="Error en el servidor";
                    await refreshPage(actualPage);
                    window.scroll(0,0);
            }
        }
    
    
    
    
    
    async function showedCountr(page){
    
    let response=await fetch(API+"?offset="+actualPage*10+"&&limit="+10,{
        method:"GET",
        headers:{
                "Content-Type":"application/json"
            }
    });
    switch(response.status){
        case 200:
            showedCountries=await response.json();
            break;
        case 404:
            errorMSG="No hay ningun pais creado";
            break;
    }
    }
    
    async function refreshPage(page){
        actualPage=page;
        await getCountries();
        await showedCountr(page);
    }
    
    
    
    
    
    
    async function searchWithYears(){
        if(initialYear==undefined || lastYear==undefined){
            errorMSG="Ninguno de los dos años puede ser nulo";
            window.scroll(0,0);
        }
        if(initialYear>lastYear){
            errorMSG="El año de inicio no puede ser superior al de fin";
            window.scroll(0,0);
        }
        else{
            let response=await fetch(API+"?from="+initialYear+"&&to="+lastYear,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
            });
            let data=await response.json();
            switch(response.status){
                case 404:
                    errorMSG="No se ha encontrado ningún pais que cumpla con el intervalo de años dado";
                    window.scroll(0,0);
                    break;
                case 200:
                    if(data.length==0){
                        errorMSG="No se ha encontrado ningún pais que cumpla con el intervalo de años dado";
                    }else{
                    errorMSG="Paises encontrados con exito";
                    showedCountries=data;
                    window.scroll(0,0);
                    break;}
            }
        }
    }
    
    
    
    async function searchWithFields(){
        let url="";
        for(let [key,value] of Object.entries(searchedCountry)){
            if(value!=undefined && value!=""){
                if(["answer_yes","answer_no","answer_n_a"].includes(key)){
                    value=parseInt(value);
                }
                if(["yes","no","n_a"].includes(key)){
                    value=parseFloat(value);
                }
                url+=key+"="+value+"&&";
            }
        }
       
    
        console.log(API);
        let response=await fetch(API+"?"+url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
        }});
        
        let data=await response.json();
        switch(response.status){
            case 404:
                errorMSG="No se ha encontrado ningun pais que cumpla con los filtros";
                window.scroll(0,0);
                break;
            case 200:
                if(data.length==0){
                    errorMSG="No se ha encontrado ningun pais que cumpla los filtros";
                }else{
                    errorMSG="Se han encontrado paises que cumplen los filtros";
                    showedCountries=data;
                    window.scroll(0,0);
                    break;
                }
        }
    
    
    }
    
    
    
    
    </script>
    
    
    <style>
        
        .pagination{
            justify-content: center;
        }
       
    </style>
    
    
    
    
    <Container xxl>
    
    
    
        {#if errorMSG!=""}
            <Alert id="alert" color="info" dismissible>
                {errorMSG}
            </Alert>
        {/if}
    
    
    
        <Accordion theme="auto" id="accordion1">
            <Accordion theme="auto" id="accordion1-1">
                <AccordionItem>
                    <h4 class="m-0" slot="header">Filtrar paises <Button on:click="{refreshPage}" color="danger">Eliminar filtros</Button></h4>
                  <Accordion theme="auto" id="accordion2">
                    <AccordionItem id="accordion1-2">
                        <h4 class="m-0" slot="header">Por rango de años</h4>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Año inicio</th>
                                    <th>Año fin</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td><input bind:value={initialYear} id="initialYear"></td>
                                <td><input bind:value={lastYear} id="lastYear"></td>
                            </tbody>
                        </Table>
                        <Button color="primary" on:click={searchWithYears} id="searchYears">Busca paises</Button>
                    </AccordionItem>
    
    
                    <!--General Filter-->
                    <AccordionItem  id="accordion1-3">
                        <h4 class="m-0" slot="header">Por cualquier campo</h4>
                        <Table >
                            <thead>
                                <tr>
                                    <th>Nombre pais</th>
                                    <th>Personas que votaron si</th>
                                    <th>Porcentaje de personas que votaron si</th>
                                    <th>Personas que votaron no</th>
                                    <th>Porcentaje de personas que votaron no</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input bind:value={searchedCountry.eu_country} id="nameInput"></td>
                                        <td><input bind:value={searchedCountry.answer_yes}></td>
                                        <td><input bind:value={searchedCountry.yes}></td>
                                        <td><input bind:value={searchedCountry.answer_no}></td>
                                        <td><input bind:value={searchedCountry.no}></td>
                                    </tr>
                                </tbody>
                                <thead>
                                    <tr>
                                        <th>Personas que votaron no aplicable</th>
                                        <th>Porcentaje de personas que votaron no aplicable</th>
                                        <th>Numero total de personas</th>
                                        <th>Año de la votación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input bind:value={searchedCountry.answer_n_a}></td>
                                        <td><input bind:value={searchedCountry.n_a}></td>
                                        <td><input bind:value={searchedCountry.total}></td>
                                        <td><input bind:value={searchedCountry.year}></td> 
                                    </tr>
                                </tbody>
                            
            
                            <tr>
                                
                            </tr>
                            <Button color="primary" on:click={searchWithFields} id="searchWithFields">Busca paises</Button>
                        </Table>
                    </AccordionItem>
                  </Accordion>
                </AccordionItem>
              </Accordion>
        </Accordion>
    
        <br>
    
        <Card theme="auto">
            <CardHeader>
                <CardTitle><h3>Lista de paises
                    <Button on:click="{loadInitialData}" color="success" id="loadAllCountries">Cargar Datos</Button>
                    <Button on:click="{deleteCountries}" color="warning" id="deleteAllCountries">Borrar todos los paises</Button></h3></CardTitle>
            </CardHeader>
            <CardBody>
                <Table striped>
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
                    {#each showedCountries as country}
                    <tr class="countryItem">
                        <td>{country.eu_country}</td>
                        <td>{country.answer_yes}</td>
                        <td>{country.yes}</td>
                        <td>{country.answer_no}</td>
                        <td>{country.no}</td>
                        <td>{country.answer_n_a}</td>
                        <td>{country.n_a}</td>
                        <td>{country.total}</td>
                        <td>{country.year}</td>
                        <td>
                            <Button color="primary" class="edit" href="/regional-politicies-acceptance/{country.eu_country}/{country.year}">Editar</Button>
                            <Button color="danger" class="delete" on:click="{deleteCountry(country.eu_country,country.year)}">Borrar</Button>
                        </td>
                    </tr>
                    {/each}
                    </tbody>
                </Table>
            </CardBody>
            <CardFooter>
                <!--Pasar PAG-->
               
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><button class="page-link" on:click={refreshPage(pages[0])}>&ll;</button></li>
                        <li class="page-item"><button class="page-link" on:click={refreshPage(actualPage-1)}>&lt;</button></li>
                        
                        {#each pages as pag}    
                            <li class="page-item"><button class="page-link" on:click={refreshPage(pag)*10}>{pag+1}</button></li>                    
                        {/each}
    
                        <li class="page-item"><button class="page-link" on:click={refreshPage(actualPage+1)}>&gt;</button></li>
                        <li class="page-item"><button class="page-link" on:click={refreshPage(pages[(pages.length-1)])}>&gg;</button></li>
                        
                    </ul>
                </nav>
               
            
                
            </CardFooter>
            
            <CardFooter>
                {#if countries.length > 0}
                    <Button on:click="{deleteCountries}" color="danger">Borrar Todo</Button>
                {/if}
            </CardFooter>
        </Card>
    
        <br>
    
    
        <Accordion theme="auto">
            <AccordionItem active>
              <h4 class="m-0" slot="header">Crea un pais</h4>
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
                    <td><input bind:value={newCountry.eu_country} id="name"></td>
                    <td><input bind:value={newCountry.answer_yes} id="yes"></td>
                    <td><input bind:value={newCountry.answer_no} id="no"></td>
                    <td><input bind:value={newCountry.answer_n_a} id="n_a"></td>
                    <td><input bind:value={newCountry.year} id="year"></td>
                </tr>
            </tbody>
            </Table>
    
            <Button on:click="{createCountry}" color="success" id="createCountry">Crea</Button>
            </AccordionItem>
        </Accordion>
    </Container>
    <br>
    