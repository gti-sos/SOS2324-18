<script>
    // Importar las funciones necesarias desde Svelte y otras librerías
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { Button, Table } from "@sveltestrap/sveltestrap";
    import { dev } from "$app/environment";

    // Declarar variables para el estado del formulario y mensajes
    let exists = false; // Indica si el fondo existe o no
    let cci_number = $page.params.cci_number; // Obtiene el número CCI de los parámetros de la página
    let oldFund = {}; // Almacenará los datos del fondo existente
    let newFund = { "cci_number": cci_number }; // Almacenará los datos del fondo editado
    let message = ""; // Mensaje para informar al usuario sobre el resultado de la operación

    // Definir la URL de la API, usando la URL de producción o local dependiendo del entorno
    let API = "/api/v1/eu-solidarity-funds";
    if (dev) {
        API = "http://localhost:10000" + API;
    }

    // Función que se ejecuta cuando se monta el componente
    onMount(() => {
        getFund(cci_number); // Llama a la función para obtener los datos del fondo
    });

    // Función para obtener los datos del fondo de la API
    async function getFund(cci_number) {
        try {
            let response = await fetch(API + "/" + cci_number, {
                method: "GET"
            });
            let code = response.status;
            if (code == 200) {
                let fund = await response.json();
                oldFund = fund; // Almacena los datos del fondo existente
                exists = true; // Indica que el fondo existe
            } else if (code == 404) {
                exists = false; // Indica que el fondo no existe
                message = "No existe un fondo que tenga ese número CCI"; // Muestra un mensaje de error
            } else {
                throw new Error("Error en el servidor");
            }
        } catch (error) {
            message = error.message; // Muestra un mensaje de error si hay un problema con la solicitud
        }
    }

    // Función para actualizar los datos del fondo en la API
    async function updateFund() {
        try {
            let response = await fetch(API + "/" +  cci_number, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFund) // Envía los nuevos datos del fondo como JSON
            });

            let code = response.status;
            if (code == 200) {
                message = "Fondo editado con éxito"; // Muestra un mensaje de éxito si la operación se realiza correctamente
            } else if (code == 400) {
                message = "No debe haber campos vacíos"; // Muestra un mensaje de error si hay campos vacíos en los datos del fondo
            } else {
                throw new Error("Error en el servidor");
            }
        } catch (error) {
            message = error.message; // Muestra un mensaje de error si hay un problema con la solicitud
        }
    }

    // Función para volver a la página anterior
    function back() {
        window.location.href = "/eu-solidarity-funds/"; // Redirige a la página de fondos de solidaridad de la UE
    }
</script>
  
<h2>Edita el fondo</h2>
  
{#if exists == true}
<Table>
    <thead>
        <tr>
            <!-- Encabezados de la tabla -->
            <th>Año de Ocurrencia</th>
            <th>Número CCI</th>
            <th>País Solicitante</th>
            <th>Nombre del Desastre</th>
            <th>Tipo de Desastre</th>
            <th>Estado</th>
            <th>Fecha del Primer Daño</th>
            <th>Fecha de la primera aplicacion</th>
            <th>Tiempo desde el desastre hasta</th>
            <th>Principales regiones vecinas</th>
            <th>Daño total directo aceptado</th>
            <th>Daño publico por millones de euros</th>
            <th>Daño total publico</th>
            <th>Coste de emergencia eligible</th>
            <th>Coste total de daño eligible</th>
            <th>Pagado</th>
            <th>Pago anticipado realizado después de 2015</th>
            <th>Cantidad de ayuda potencial</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <!-- Campos de entrada para editar los datos del fondo -->
            <td><input bind:value={newFund.year_of_occurance} placeholder="{oldFund.year_of_occurance}"></td>
            <td>{oldFund.cci_number}</td>
            <td><input bind:value={newFund.applicant_country} placeholder="{oldFund.applicant_country}"></td>
            <td><input bind:value={newFund.name_of_disaster} placeholder="{oldFund.name_of_disaster}"></td>
            <td><input bind:value={newFund.disaster_type} placeholder="{oldFund.disaster_type}"></td>
            <td><input bind:value={newFund.status} placeholder="{oldFund.status}"></td>
            <td><input bind:value={newFund.first_damage_date} placeholder="{oldFund.first_damage_date}"></td>
            <td><input bind:value={newFund.date_of_initial_application} placeholder="{oldFund.date_of_initial_application}"></td>
            <td><input bind:value={newFund.time_from_disaster_to} placeholder="{oldFund.time_from_disaster_to}"></td>
            <td><input bind:value={newFund.major_regional_neighbouring} placeholder="{oldFund.major_regional_neighbouring}"></td>
            <td><input bind:value={newFund.total_direct_damage_accepted} placeholder="{oldFund.total_direct_damage_accepted}"></td>
            <td><input bind:value={newFund.public_damage_eur_million} placeholder="{oldFund.public_damage_eur_million}"></td>
            <td><input bind:value={newFund.public_total_damage} placeholder="{oldFund.public_total_damage}"></td>
            <td><input bind:value={newFund.cost_of_eligible_emergency} placeholder="{oldFund.cost_of_eligible_emergency}"></td>
            <td><input bind:value={newFund.eligible_cost_total_damage} placeholder="{oldFund.eligible_cost_total_damage}"></td>
            <td><input bind:value={newFund.paid} placeholder="{oldFund.paid}"></td>
            <td><input bind:value={newFund.advanced_payment_post_from_twenty_fifteen} placeholder="{oldFund.advanced_payment_post_from_twenty_fifteen}"></td>
            <td><input bind:value={newFund.potential_aid_amount_eur_m_} placeholder="{oldFund.potential_aid_amount_eur_m_}"></td>
        </tr>
    </tbody>
</Table>
<Button on:click={updateFund} color="primary">Enviar</Button>
<Button on:click={back} color="warning">Volver</Button>
  
{/if}

{#if message!=""}
<!-- Mensaje de éxito o error -->
<div>{message}</div>
<Button on:click={back} color="warning">Volver</Button>
{/if}
