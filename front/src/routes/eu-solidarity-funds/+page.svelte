<script>
	// Importar los módulos necesarios
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { dev } from '$app/environment';
	import { Button, Container, Table } from '@sveltestrap/sveltestrap';

	// URL de la API
	let API = '/api/v1/eu-solidarity-funds';
	if (dev) {
		API = 'http://localhost:10000' + API;
	}

	// Arreglo para almacenar los datos de la API
	let funds = [];
	// Mensaje de error o éxito
	let message = '';

	let newFund = {};

	let currentPage = 1; // Variable para controlar la página actual

	onMount(() => {
		getFunds();
	});

	// Función para cargar los fondos de solidaridad
	async function loadFunds() {
		if (funds.length >= 1) {
			message = 'Ya existen datos';
		} else {
			try {
				// Realizar la petición GET a la API
				let response = await fetch(API + '/loadInitialData', {
					method: 'GET'
				});
				// Parsear la respuesta a JSON
				let code = response.status;
				// Mostrar mensaje de éxito
				if (code === 200) {
					// Recargar la página automáticamente
					getFunds()
					message = 'Fondos cargados correctamente';
				} else {
					// Recargar la página automáticamente
					getFunds()
					message = 'Error al cargar los fondos';
				}
			} catch (error) {
				// Mostrar mensaje de error
				message = 'Error al cargar los fondos';
			}
		}
	}

	// Función para ver todos los fondos de solidaridad
	async function getFunds() {
        try {
            // Realizar la petición GET a la API
            let response = await fetch(API + `?limit=10&offset=${(currentPage - 1) * 10}`, {
                method: 'GET'
            });
            // Parsear la respuesta a JSON
            let code = response.status;

            if (code === 200) {
                funds = await response.json();
            } else {
                message = 'Error al cargar los fondos';
            }
        } catch (error) {
            // Mostrar mensaje de error
            message = 'Error al cargar los fondos';
        }
    }

	// Función para crear un nuevo fondo de solidaridad
	async function createFund() {
		try {
			// Realizar la petición POST a la API
			let response = await fetch(API, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newFund) // Se asume que newFund contiene los datos del nuevo fondo
			});
			// Parsear la respuesta a JSON
			let code = response.status;
			// Mostrar mensaje de éxito
			if (code === 201) {
				// Recargar la página automáticamente
				getFunds()
				message = 'Fondo creado correctamente';
			} else {
				message = 'Error al crear el fondo, rellene todos los campos';
			}
		} catch (error) {
			// Mostrar mensaje de error
			message = 'Error al crear el fondo, rellene todos los campos';
		}
	}

	// Función para eliminar un fondo de solidaridad
	async function deleteFund(cci_number) {
		try {
			// Realizar la petición DELETE a la API
			let response = await fetch(API + '/' + cci_number, {
				method: 'DELETE'
			});	
			// Recargar la página automáticamente
			getFunds();
			// Mostrar mensaje de éxito
			message = 'Fondo eliminado correctamente';
		} catch (error) {
			// Mostrar mensaje de error
			message = 'Error al eliminar el fondo';
		}
	}

	// Función para eliminar todos los fondos de solidaridad
	async function deleteAllFunds() {
		try {
			// Realizar la petición DELETE a la API
			let response = await fetch(API, {
				method: 'DELETE'
			});
			// Recargar la página automáticamente
			getFunds()
			// Mostrar mensaje de éxito
			message = 'Todos los fondos eliminados correctamente';
			// Limpiar el arreglo de fondos después de eliminar todos
			funds = [];
		} catch (error) {
			// Mostrar mensaje de error
			message = 'Error al eliminar todos los fondos';
		}
	}

	// Variable para almacenar los parámetros de búsqueda
	let searchParams = {
    	year_of_occurance: "",
    	cci_number: "",
    	applicant_country: "",
    	name_of_disaster: "",
    	disaster_type: "",
    	status: "",
    	first_damage_date: "",
    	date_of_initial_application: "",
    	time_from_disaster_to: "",
    	major_regional_neighbouring: "",
    	total_direct_damage_accepted: "",
    	public_damage_eur_million: "",
    	public_total_damage: "",
    	cost_of_eligible_emergency: "",
    	eligible_cost_total_damage: "",
    	paid: "",
    	advanced_payment_post_from_twenty_fifteen: "",
    	potential_aid_amount_eur_m_: ""
	};

	// Función para buscar recursos utilizando todos los parámetros proporcionados por el usuario
	async function searchResources() {
    	try {
        	// Construir la URL de búsqueda con los parámetros ingresados por el usuario
        	let searchUrl = `${API}?`;

			// Verificar qué parámetros se han proporcionado y agregarlos a la URL de búsqueda
			if (searchParams.year_of_occurance) {
				searchUrl += `year_of_occurance=${searchParams.year_of_occurance}&`;
			}
			if (searchParams.cci_number) {
				searchUrl += `cci_number=${searchParams.cci_number}&`;
			}
			if (searchParams.applicant_country) {
				searchUrl += `applicant_country=${searchParams.applicant_country}&`;
			}
			if (searchParams.name_of_disaster) {
				searchUrl += `nameOfDisaster=${searchParams.name_of_disaster}&`;
			}
			if (searchParams.disaster_type) {
				searchUrl += `disasterType=${searchParams.disaster_type}&`;
			}
			if (searchParams.status) {
				searchUrl += `status=${searchParams.status}&`;
			}
			if (searchParams.first_damage_date) {
				searchUrl += `firstDamageDate=${searchParams.first_damage_date}&`;
			}
			if (searchParams.date_of_initial_application) {
				searchUrl += `dateOfInitialApplication=${searchParams.date_of_initial_application}&`;
			}
			if (searchParams.time_from_disaster_to) {
				searchUrl += `time_from_disaster_to=${searchParams.time_from_disaster_to}&`;
			}
			if (searchParams.major_regional_neighbouring) {
				searchUrl += `majorRegionalNeighbouring=${searchParams.major_regional_neighbouring}&`;
			}
			if (searchParams.total_direct_damage_accepted) {
				searchUrl += `totalDirectDamageAccepted=${searchParams.total_direct_damage_accepted}&`;
			}
			if (searchParams.public_damage_eur_million) {
				searchUrl += `public_damage_eur_million=${searchParams.public_damage_eur_million}&`;
			}
			if (searchParams.public_total_damage) {
				searchUrl += `public_total_damage=${searchParams.public_total_damage}&`;
			}
			if (searchParams.cost_of_eligible_emergency) {
				searchUrl += `costOfEligibleEmergency=${searchParams.cost_of_eligible_emergency}&`;
			}
			if (searchParams.eligible_cost_total_damage) {
				searchUrl += `eligibleCostTotalDamage=${searchParams.eligible_cost_total_damage}&`;
			}
			if (searchParams.paid) {
				searchUrl += `paid=${searchParams.paid}&`;
			}
			if (searchParams.advanced_payment_post_from_twenty_fifteen) {
				searchUrl += `advanced_payment_post_from_twenty_fifteen=${searchParams.advanced_payment_post_from_twenty_fifteen}&`;
			}
			if (searchParams.potential_aid_amount_eur_m_) {
				searchUrl += `potential_aid_amount_eur_m_=${searchParams.potential_aid_amount_eur_m_}&`;
			}

			// Eliminar el último '&' de la URL si está presente
			searchUrl = searchUrl.slice(0, -1);

        	// Realizar la petición GET a la API con todos los parámetros de búsqueda
        	let response = await fetch(searchUrl, {
            	method: 'GET'
        	});

        	// Verificar el código de respuesta
        	let code = response.status;

        	if (code === 200) {
            	funds = await response.json(); // Actualizar la lista de fondos con los resultados de búsqueda
        	} else {
            	message = 'Error al realizar la búsqueda';
        	}
    	} catch (error) {
        	// Mostrar mensaje de error
        	message = 'Error al realizar la búsqueda';
    	}
	}

	// Función para navegar a la página anterior
    function previousPage() {
        if (currentPage > 1) {
            currentPage--;
            getFunds();
        }
    }

    // Función para navegar a la página siguiente
    function nextPage() {
        currentPage++;
        getFunds();
    }

</script>

<!--<style>
	h1 {
	  text-align: center;
	  margin-bottom: 20px;
	}
  
	.alert {
	  margin-bottom: 20px;
	  padding: 10px;
	  border-radius: 5px;
	}
  
	.btn-container {
	  display: flex;
	  justify-content: space-between;
	  margin-bottom: 20px;
	}
  
	.table-container {
	  overflow-x: auto;
	}
  
	.table-container table {
	  width: 100%;
	  border-collapse: collapse;
	}
  
	.table-container th,
	.table-container td {
	  border: 1px solid #ccc;
	  padding: 8px;
	}
  
	.action-buttons {
	  display: flex;
	  justify-content: space-between;
	}
  
	.action-buttons button {
	  margin-right: 10px;
	}
  
	.success-btn {
	  background-color: #28a745;
	  color: #fff;
	  border: none;
	  padding: 8px 12px;
	  border-radius: 5px;
	  cursor: pointer;
	}
  
	.danger-btn {
	  background-color: #dc3545;
	  color: #fff;
	  border: none;
	  padding: 8px 12px;
	  border-radius: 5px;
	  cursor: pointer;
	}
  
	.primary-btn {
	  background-color: #007bff;
	  color: #fff;
	  border: none;
	  padding: 8px 12px;
	  border-radius: 5px;
	  cursor: pointer;
	}
  
	.info-btn {
	  background-color: #17a2b8;
	  color: #fff;
	  border: none;
	  padding: 8px 12px;
	  border-radius: 5px;
	  cursor: pointer;
	}
  </style>-->

<h1>Administración de Fondos de Solidaridad de la UE</h1>

<!-- Mostrar mensaje de éxito o error -->
{#if message}
	<div class="alert alert-info">{message}</div>
{/if}

<Button on:click={loadFunds} color="primary" class="load">Crear Fondos de prueba</Button>
<Button on:click={deleteAllFunds} color="danger">Eliminar Todos los Fondos</Button>
<Button href="eu-solidarity-funds/graph" color="success">Gráficos</Button>
<p>
	<!--<Button href="../integrations/migmormar7/NASA_API" color="primary">Uso de API NASA</Button>-->
	<Button href="../integrations/migmormar7/BaseballAPI" color="primary" style="background-color: purple;">Uso de BaseballAPI</Button>
	<Button href="../integrations/migmormar7/Top100MoviesAPI" color="primary" style="background-color: purple;">Uso de Top100MoviesAPI</Button>
	<Button href="../integrations/migmormar7/ExerciseDBAPI" color="primary" style="background-color: purple;">Uso de ExerciseDB</Button>
</p>

<!-- Formulario de búsqueda con todos los campos disponibles -->
<form on:submit|preventDefault={searchResources}>
    <label for="year_of_occurance">Año de Ocurrencia:</label>
    <input type="number" id="year_of_occurance" bind:value={searchParams.year_of_occurance} />

    <label for="cci_number">Número CCI:</label>
    <input type="text" id="cci_number" bind:value={searchParams.cci_number} />

    <label for="applicant_country">País Solicitante:</label>
    <input type="text" id="applicant_country" bind:value={searchParams.applicant_country} />

    <label for="name_of_disaster">Nombre del Desastre:</label>
    <input type="text" id="name_of_disaster" bind:value={searchParams.name_of_disaster} />

    <label for="disaster_type">Tipo de Desastre:</label>
    <input type="text" id="disaster_type" bind:value={searchParams.disaster_type} />

    <label for="status">Estado:</label>
    <input type="text" id="status" bind:value={searchParams.status} />

    <label for="first_damage_date">Fecha del Primer Daño:</label>
    <input type="text" id="first_damage_date" bind:value={searchParams.first_damage_date} />

	<label for="date_of_initial_application">Fecha de la primera aplicación:</label>
    <input type="text" id="date_of_initial_application" bind:value={searchParams.date_of_initial_application} />

    <label for="time_from_disaster_to">Tiempo desde el desastre hasta:</label>
    <input type="text" id="time_from_disaster_to" bind:value={searchParams.time_from_disaster_to} />

    <label for="major_regional_neighbouring">Principales regiones vecinas:</label>
    <input type="text" id="major_regional_neighbouring" bind:value={searchParams.major_regional_neighbouring} />

    <label for="total_direct_damage_accepted">Daño total directo aceptado:</label>
    <input type="text" id="total_direct_damage_accepted" bind:value={searchParams.total_direct_damage_accepted} />

	<label for="public_damage_eur_million">Daño publico por millones:</label>
    <input type="text" id="public_damage_eur_million" bind:value={searchParams.public_damage_eur_million} />

	<label for="public_total_damage">Daño total publico:</label>
    <input type="text" id="public_total_damage" bind:value={searchParams.public_total_damage} />

	<label for="cost_of_eligible_emergency">Coste de emergencia eligible:</label>
    <input type="text" id="cost_of_eligible_emergency" bind:value={searchParams.cost_of_eligible_emergency} />

    <label for="eligible_cost_total_damage">Coste total de daño elegible:</label>
    <input type="text" id="eligible_cost_total_damage" bind:value={searchParams.eligible_cost_total_damage} />

    <label for="paid">Pagado:</label>
    <input type="text" id="paid" bind:value={searchParams.paid} />

    <label for="advanced_payment_post_from_twenty_fifteen">Pago anticipado realizado después de 2015:</label>
    <input type="text" id="advanced_payment_post_from_twenty_fifteen" bind:value={searchParams.advanced_payment_post_from_twenty_fifteen} />

	<label for="potential_aid_amount_eur_m_">Cantidad de ayuda potencial:</label>
    <input type="text" id="potential_aid_amount_eur_m_" bind:value={searchParams.potential_aid_amount_eur_m_} />

	<Button color="primary" on:click={searchResources()}>Buscar</Button>
</form>


<!-- Tabla para mostrar los fondos de solidaridad -->

	<Table bordered>
		<!-- Encabezados de tabla y datos -->
		<thead>
			<tr>
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
				<th>Acción</th>
			</tr>
		</thead>
		<tbody>
			{#each funds as fund}
					<!-- Mostrar solo los resultados de la página actual -->
					<tr class="fundItem">
						<!-- Celdas de datos -->
						<td>{fund.year_of_occurance}</td>
						<td>{fund.cci_number}</td>
						<td>{fund.applicant_country}</td>
						<td>{fund.name_of_disaster}</td>
						<td>{fund.disaster_type}</td>
						<td>{fund.status}</td>
						<td>{fund.first_damage_date}</td>
						<td>{fund.date_of_initial_application}</td>
						<td>{fund.time_from_disaster_to}</td>
						<td>{fund.major_regional_neighbouring}</td>
						<td>{fund.total_direct_damage_accepted}</td>
						<td>{fund.public_damage_eur_million}</td>
						<td>{fund.public_total_damage}</td>
						<td>{fund.cost_of_eligible_emergency}</td>
						<td>{fund.eligible_cost_total_damage}</td>
						<td>{fund.paid}</td>
						<td>{fund.advanced_payment_post_from_twenty_fifteen}</td>
						<td>{fund.potential_aid_amount_eur_m_}</td>
						<!-- Botón para eliminar un fondo -->
						<td>
							<Button color="primary" href="/eu-solidarity-funds/{fund.cci_number}">Editar</Button>
							<Button color="danger" on:click={deleteFund(fund.cci_number)}>Eliminar</Button>
						</td>
					</tr>
			{/each}
		</tbody>
		
	</Table>


<!-- Formulario para crear un nuevo fondo -->

	<Table bordered>
		<!-- Campos de formulario -->
		<thead>
			<tr>
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
				<td><input bind:value={newFund.year_of_occurance} /></td>
				<td><input bind:value={newFund.cci_number} /></td>
				<td><input bind:value={newFund.applicant_country} /></td>
				<td><input bind:value={newFund.name_of_disaster} /></td>
				<td><input bind:value={newFund.disaster_type} /></td>
				<td><input bind:value={newFund.status} /></td>
				<td><input bind:value={newFund.first_damage_date} /></td>
				<td><input bind:value={newFund.date_of_initial_application} /></td>
				<td><input bind:value={newFund.time_from_disaster_to} /></td>
				<td><input bind:value={newFund.major_regional_neighbouring} /></td>
				<td><input bind:value={newFund.total_direct_damage_accepted} /></td>
				<td><input bind:value={newFund.public_damage_eur_million} /></td>
				<td><input bind:value={newFund.public_total_damage} /></td>
				<td><input bind:value={newFund.cost_of_eligible_emergency} /></td>
				<td><input bind:value={newFund.eligible_cost_total_damage} /></td>
				<td><input bind:value={newFund.paid} /></td>
				<td><input bind:value={newFund.advanced_payment_post_from_twenty_fifteen} /></td>
				<td><input bind:value={newFund.potential_aid_amount_eur_m_} /></td>
			</tr>
		</tbody>
	</Table>


<!-- Botón para crear un nuevo fondo -->
<Button on:click={createFund} color="success">Crear Nuevo Fondo</Button>

<!-- Controles de navegación para paginación -->
<div class="pagination-controls">
    <button on:click={previousPage} disabled={currentPage === 1}>Página anterior</button>
    <span>Página {currentPage}</span>
    <button on:click={nextPage} disabled={funds.length < 10}>Página siguiente</button>
</div>
