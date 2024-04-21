<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
</svelte:head>

<style>
    @import '/style.css';
</style>

<script>
    import { onMount } from "svelte";
    import { Highcharts } from "highcharts";
    import { HighchartsMore } from "highcharts/highcharts-more";
    import { HighchartsExporting } from "highcharts/modules/exporting";
    import { dev } from '$app/environment';

    // Importar los módulos adicionales de Highcharts
    HighchartsMore(Highcharts);
    HighchartsExporting(Highcharts);

    let datosIniciales = [
        {
            "year_of_occurance": "2002",
            "cci_number": "2002ATSPO001",
            "applicant_country": "AT",
            "name_of_disaster": "Flooding Austria 2002",
            "disaster_type": "Floods",
            "status": "Accepted",
            "first_damage_date": "2002-06-08T00:00:00.000",
            "date_of_initial_application": "accepted retroactively",
            "time_from_disaster_to": "",
            "major_regional_neighbouring": "Major",
            "total_direct_damage_accepted": "2,900.00",
            "public_damage_eur_million": "",
            "public_total_damage": "",
            "cost_of_eligible_emergency": "1,200.00",
            "eligible_cost_total_damage": "41.40%",
            "paid": "134",
            "advanced_payment_post_from_twenty_fifteen": "",
            "potential_aid_amount_eur_m_": ""
        },
        {
            "year_of_occurance": "2002",
            "cci_number": "2002DESPO001",
            "applicant_country": "DE",
            "name_of_disaster": "Flooding Germany 2002",
            "disaster_type": "Floods",
            "status": "Accepted",
            "first_damage_date": "2002-10-08T00:00:00.000",
            "date_of_initial_application": "accepted retroactively",
            "time_from_disaster_to": "",
            "major_regional_neighbouring": "Major",
            "total_direct_damage_accepted": "9,100.00",
            "public_damage_eur_million": "",
            "public_total_damage": "",
            "cost_of_eligible_emergency": "1,699.00",
            "eligible_cost_total_damage": "18.70%",
            "paid": "444",
            "advanced_payment_post_from_twenty_fifteen": "",
            "potential_aid_amount_eur_m_": ""
        },
        {
            "year_of_occurance": "2002",
            "cci_number": "2002CZSPO001",
            "applicant_country": "CZ",
            "name_of_disaster": "Flooding Czechia 2002",
            "disaster_type": "Floods",
            "status": "Accepted",
            "first_damage_date": "2002-05-08T00:00:00.000",
            "date_of_initial_application": "accepted retroactively",
            "time_from_disaster_to": "",
            "major_regional_neighbouring": "Major",
            "total_direct_damage_accepted": "2,300.00",
            "public_damage_eur_million": "",
            "public_total_damage": "",
            "cost_of_eligible_emergency": "1,186.00",
            "eligible_cost_total_damage": "51.60%",
            "paid": "129",
            "advanced_payment_post_from_twenty_fifteen": "",
            "potential_aid_amount_eur_m_": ""
        },
        {
            "year_of_occurance": "2002",
            "cci_number": "2002FRSPO001",
            "applicant_country": "FR",
            "name_of_disaster": "Flooding France 2002",
            "disaster_type": "Floods",
            "status": "Accepted",
            "first_damage_date": "2002-08-09T00:00:00.000",
            "date_of_initial_application": "accepted retroactively",
            "time_from_disaster_to": "",
            "major_regional_neighbouring": "Regional",
            "total_direct_damage_accepted": "834.5",
            "public_damage_eur_million": "",
            "public_total_damage": "",
            "cost_of_eligible_emergency": "225",
            "eligible_cost_total_damage": "27.00%",
            "paid": "21",
            "advanced_payment_post_from_twenty_fifteen": "",
            "potential_aid_amount_eur_m_": ""
        },
        {
            "year_of_occurance": "2003",
            "cci_number": "2003ESSPO001",
            "applicant_country": "ES",
            "name_of_disaster": "Prestige Oil spill 2003",
            "disaster_type": "Man Made",
            "status": "Accepted",
            "first_damage_date": "2002-11-19T00:00:00.000",
            "date_of_initial_application": "2003-01-13T00:00:00.000",
            "time_from_disaster_to": "55",
            "major_regional_neighbouring": "Regional",
            "total_direct_damage_accepted": "436",
            "public_damage_eur_million": "",
            "public_total_damage": "",
            "cost_of_eligible_emergency": "416",
            "eligible_cost_total_damage": "95.40%",
            "paid": "8.626",
            "advanced_payment_post_from_twenty_fifteen": "",
            "potential_aid_amount_eur_m_": ""
        },
        {
            "year_of_occurance": "2003",
            "cci_number": "2003IT16SPO002",
            "applicant_country": "IT",
            "name_of_disaster": "Earthquake Molise 2003",
            "disaster_type": "Earthquake/Volcanic",
            "status": "Accepted",
            "first_damage_date": "2002-10-31T00:00:00.000",
            "date_of_initial_application": "2003-01-13T00:00:00.000",
            "time_from_disaster_to": "74",
            "major_regional_neighbouring": "Regional",
            "total_direct_damage_accepted": "1,558.00",
            "public_damage_eur_million": "",
            "public_total_damage": "",
            "cost_of_eligible_emergency": "248",
            "eligible_cost_total_damage": "15.90%",
            "paid": "30.826",
            "advanced_payment_post_from_twenty_fifteen": "",
            "potential_aid_amount_eur_m_": ""
        },
        {
            "year_of_occurance": "2003",
            "cci_number": "2003IT16SPO003",
            "applicant_country": "IT",
            "name_of_disaster": "Etna Volcanic eruption & quakes 2003",
            "disaster_type": "Earthquake/Volcanic",
            "status": "Accepted",
            "first_damage_date": "2002-10-26T00:00:00.000",
            "date_of_initial_application": "2003-01-13T00:00:00.000",
            "time_from_disaster_to": "79",
            "major_regional_neighbouring": "Regional",
            "total_direct_damage_accepted": "849",
            "public_damage_eur_million": "",
            "public_total_damage": "",
            "cost_of_eligible_emergency": "204",
            "eligible_cost_total_damage": "24.00%",
            "paid": "16.798",
            "advanced_payment_post_from_twenty_fifteen": "",
            "potential_aid_amount_eur_m_": ""
        },
        {
            "year_of_occurance": "2003",
            "cci_number": "2003IT16SPO001",
            "applicant_country": "IT",
            "name_of_disaster": "North Italy Flooding 2003",
            "disaster_type": "Floods",
            "status": "Rejected",
            "first_damage_date": "2002-11-24T00:00:00.000",
            "date_of_initial_application": "2003-01-31T00:00:00.000",
            "time_from_disaster_to": "68",
            "major_regional_neighbouring": "Regional",
            "total_direct_damage_accepted": "",
            "public_damage_eur_million": "",
            "public_total_damage": "",
            "cost_of_eligible_emergency": "",
            "eligible_cost_total_damage": "",
            "paid": "0",
            "advanced_payment_post_from_twenty_fifteen": "",
            "potential_aid_amount_eur_m_": ""
        },
        {
            "year_of_occurance": "2003",
            "cci_number": "2003GR16SPO001",
            "applicant_country": "GR",
            "name_of_disaster": "Adverse winter weather 2003",
            "disaster_type": "Adverse weather",
            "status": "Rejected",
            "first_damage_date": "2002-01-12T00:00:00.000",
            "date_of_initial_application": "2003-02-28T00:00:00.000",
            "time_from_disaster_to": "89",
            "major_regional_neighbouring": "Regional",
            "total_direct_damage_accepted": "",
            "public_damage_eur_million": "",
            "public_total_damage": "",
            "cost_of_eligible_emergency": "",
            "eligible_cost_total_damage": "",
            "paid": "0",
            "advanced_payment_post_from_twenty_fifteen": "",
            "potential_aid_amount_eur_m_": ""
        },
        {
            "year_of_occurance": "2003",
            "cci_number": "2003PTSPO001",
            "applicant_country": "PT",
            "name_of_disaster": "Forest fires 2003",
            "disaster_type": "Forest fires/drought",
            "status": "Accepted",
            "first_damage_date": "2003-07-20T00:00:00.000",
            "date_of_initial_application": "2003-08-13T00:00:00.000",
            "time_from_disaster_to": "24",
            "major_regional_neighbouring": "Major",
            "total_direct_damage_accepted": "1,228.00",
            "public_damage_eur_million": "",
            "public_total_damage": "",
            "cost_of_eligible_emergency": "104",
            "eligible_cost_total_damage": "8.50%",
            "paid": "48.539",
            "advanced_payment_post_from_twenty_fifteen": "",
            "potential_aid_amount_eur_m_": ""
        }
    ];

    async function obtenerDatosAPI() {
        let API_URL = '/api/v1/eu-solidarity-funds';
        if (dev) API_URL = 'http://localhost:10000' + API_URL;

        try {
            let response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API.');
            }
            datosIniciales = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    let columnPyramidData = [];
    let columnRangeData = [];

    // Función para transformar los datos en el formato necesario para las gráficas
    function transformData() {
        datosIniciales.forEach((item) => {
            // Para la gráfica de tipo Column Pyramid
            columnPyramidData.push({
                name: item.applicant_country,
                y: parseFloat(item.cost_of_eligible_emergency.replace(",", "")) // Convertir a número y eliminar comas
            });

            // Para la gráfica de tipo Column Range con ejes intercambiados
            columnRangeData.push({
                name: item.applicant_country,
                high: parseFloat(item.total_direct_damage_accepted.replace(",", "")), // Convertir a número y eliminar comas
                low: 0 // Valor bajo fijo en 0
            });
        });
    }

    // Función para crear la gráfica de tipo Column Pyramid
    function crearGraficaColumnPyramid() {
        Highcharts.chart("graficaColumnPyramid", {
            chart: {
                type: "columnpyramid"
            },
            title: {
                text: "Cost of Eligible Emergency por País"
            },
            xAxis: {
                type: "category",
                title: {
                    text: "País"
                }
            },
            yAxis: {
                title: {
                    text: "Cost of Eligible Emergency"
                }
            },
            series: [{
                name: "Cost of Eligible Emergency",
                data: columnPyramidData
            }]
        });
    }

    // Función para crear la gráfica de tipo Column Range con ejes intercambiados
    function crearGraficaColumnRange() {
        Highcharts.chart("graficaColumnRange", {
            chart: {
                type: "columnrange"
            },
            title: {
                text: "Total Direct Damage Accepted vs Applicant Country"
            },
            xAxis: {
                type: "category",
                title: {
                    text: "Applicant Country"
                }
            },
            yAxis: {
                title: {
                    text: "Total Direct Damage Accepted"
                }
            },
            series: [{
                name: "Total Direct Damage Accepted",
                data: columnRangeData
            }]
        });
    }

    onMount(() => {
        obtenerDatosAPI();
        transformData();
        crearGraficaColumnPyramid();
        crearGraficaColumnRange();
    });
</script>

<h2>Column Pyramid Chart</h2>
<div id="graficaColumnPyramid" style="width: 100%; height: 400px;"></div>

<h2>Column Range Chart</h2>
<div id="graficaColumnRange" style="width: 100%; height: 400px;"></div>
