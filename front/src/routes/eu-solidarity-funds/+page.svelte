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

	onMount(()=>{
		getFunds();
	})

	function reloadPage() {
        location.reload();
    }

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
					message = 'Fondos cargados correctamente';
				} else {
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
			let response = await fetch(API, {
				method: 'GET'
			});
			// Parsear la respuesta a JSON
			let code = response.status;

			if (code === 200) {
				message = 'Fondos cargados correctamente';
				funds = await response.json();
			} else {
				message = 'Error al cargar los fondos';
			}
		} catch (error) {
			// Mostrar mensaje de error
			message = 'Error al cargar los fondos';
		}
		reloadPage();
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
				message = 'Fondo creado correctamente';
				// Limpiar el objeto newFund después de crear el fondo
				newFund = {};
			} else {
				message = 'Error al crear el fondo';
			}
		} catch (error) {
			// Mostrar mensaje de error
			message = 'Error al crear el fondo';
		}
		reloadPage();
	}

	// Función para eliminar un fondo de solidaridad
	async function deleteFund(cciNumber) {
		try {
			// Realizar la petición DELETE a la API
			let response = await fetch(API + "/" + cciNumber, {
				method: 'DELETE'
			});
			// Mostrar mensaje de éxito
			message = 'Fondo eliminado correctamente';
			// Actualizar la lista de fondos después de eliminar uno
			funds = funds.filter((fund) => fund.cci_number !== cciNumber);
		} catch (error) {
			// Mostrar mensaje de error
			message = 'Error al eliminar el fondo';
		}
		reloadPage();
	}

	// Función para eliminar todos los fondos de solidaridad
	async function deleteAllFunds() {
		try {
			// Realizar la petición DELETE a la API
			let response = await fetch(API, {
				method: 'DELETE'
			});
			// Mostrar mensaje de éxito
			message = 'Todos los fondos eliminados correctamente';
			// Limpiar el arreglo de fondos después de eliminar todos
			funds = [];
		} catch (error) {
			// Mostrar mensaje de error
			message = 'Error al eliminar todos los fondos';
		}
		reloadPage();
	}
</script>

<h1>Administración de Fondos de Solidaridad de la UE</h1>

<!-- Mostrar mensaje de éxito o error -->
{#if message}
	<div class="alert alert-info">{message}</div>
{/if}

<!-- Botón para recargar los fondos -->
<Button on:click={loadFunds} color="primary">Crear Fondos de prueba</Button>
<!-- Botón para eliminar todos los fondos -->
<Button on:click={deleteAllFunds} color="danger">Eliminar Todos los Fondos</Button>
<!-- Botón para ver todos los fondos -->
<!--<Button on:click={getFunds} color="info">Ver Todos los Fondos</Button>-->

<!-- Tabla para mostrar los fondos de solidaridad -->
<Container>
	<Table bordered>
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
				<tr>
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
						<Button color="primary" href="/eu-solidarity-funds/{fund.cciNumber}">Editar</Button>
						<Button color="danger" on:click="{deleteFund(fund.cciNumber)}">Eliminar</Button>
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>

	<h2>Crear Nuevo Fondo</h2>
	<!-- Formulario para crear un nuevo fondo -->
	<Table bordered>
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
</Container>


<!-- Botón para crear un nuevo fondo -->
<Button on:click="{createFund}" color="success">Crear Nuevo Fondo</Button>

