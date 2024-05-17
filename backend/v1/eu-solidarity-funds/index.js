import request from 'request';
import cors from "cors";

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
]

//let datos = []

//let express = require('express');
//let bodyParser = require('body-parser');
//let app = express();

// Configurar body parser para JSON
//app.use(bodyParser.json());


const API_BASE = "/api/v1";

function MMMBackend(app, db) {

app.get(API_BASE + "/eu-solidarity-funds/docs", (req, res) => {
  res.redirect("https://documenter.getpostman.com/view/33040772/2sA2xh2ssG");
});

//El recurso debe contener una ruta /api/v1/FFFFF/loadInitialData que al hacer un GET cree 10 o más datos en el array de NodeJS si 
//está vacío. (http://sos2324-18.appspot.com/api/v1/eu-solidarity-funds/loadInitialData)

app.get(API_BASE + "/eu-solidarity-funds/loadInitialData", (req, res)=>{
  //if (datos.length === 0) {
    //for (let i = 0; i < 10; i++) {
      //datos.push(datosIniciales[i]);
    //}
    //res.sendStatus(200, "OK");
  //} else {
    //res.send(JSON.stringify(datos));
  //}
  db.insert(datosIniciales);
  res.sendStatus(200, "OK");
});

//Debe tener desplegado en Google Cloud una API REST funcional ofreciendo su fuente de datos. La API debe estar desplegada 
//(e integrada con los compañeros de grupo) en la dirección: http://sos2324-XX.appspot.com/api/v1/FFFFF  (Siendo XX el numero de grupo 
//relleno con ceros y FFFFF el nombre del recurso) (http://sos2324-18.appspot.com/api/v1/eu-solidarity-funds).

app.get(API_BASE + "/eu-solidarity-funds", (req, res) => {
  const queryParams = req.query;
  const limit = parseInt(queryParams.limit) || 10; // Límite predeterminado de 10
  const offset = parseInt(queryParams.offset) || 0; // Desplazamiento predeterminado de 0

  // Construir la consulta para buscar documentos que coincidan con los parámetros proporcionados
  const query = {};
  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key) && key !== 'limit' && key !== 'offset') {
      query[key] = queryParams[key];
    }
  }

  // Realizar la consulta a la base de datos con los parámetros proporcionados
  db.find(query).skip(offset).limit(limit).exec((err, matchingDocuments) => {
    if (err) {
      return res.sendStatus(500, "Internal error");
    }
    // Eliminar el campo _id de cada documento
    const formattedData = matchingDocuments.map(d => {
      const { _id, ...rest } = d;
      return rest;
    });
    res.send(JSON.stringify(formattedData));
  });
});



app.get(API_BASE + "/eu-solidarity-funds/:id", (req, res) => {
  const id = req.params.id;

  // Si se proporciona un ID, buscar y devolver el recurso específico
  db.findOne({ cci_number: id }, (err, resource) => {
    if (err) {
      return res.sendStatus(500, "Internal error");
    }
    if (!resource) {
      return res.status(404).send("Resource not found");
    }
    // Si se encuentra el recurso, enviarlo como respuesta
    res.send(JSON.stringify(resource));
  });
});

//POST CORRECTO
app.post(API_BASE + "/eu-solidarity-funds", (req, res) => {
  // Verificar si el recurso ya existe
  db.findOne({ cci_number: req.body.cci_number }, (err, existingData) => {
    if (err) {
      return res.sendStatus(500, "Internal error");
    }
    if (existingData) {
      return res.status(409).send("Resource already exists");
    }

    // Verificar si el dato recibido tiene los campos esperados
    const expectedFields = [
      "year_of_occurance",
      "cci_number",
      "applicant_country",
      "name_of_disaster",
      "disaster_type",
      "status",
      "first_damage_date",
      "date_of_initial_application",
      "time_from_disaster_to",
      "major_regional_neighbouring",
      "total_direct_damage_accepted",
      "public_damage_eur_million",
      "public_total_damage",
      "cost_of_eligible_emergency",
      "eligible_cost_total_damage",
      "paid",
      "advanced_payment_post_from_twenty_fifteen",
      "potential_aid_amount_eur_m_"
    ];

    const receivedFields = Object.keys(req.body);
    const missingFields = expectedFields.filter(field => !receivedFields.includes(field));

    if (missingFields.length > 0) {
      return res.status(400).send("Missing fields: " + missingFields.join(", "));
    }

    // Si todo está bien, agregar el dato a la base de datos
    db.insert(req.body);
    res.sendStatus(201, "Created");
  });
});

//POST INCORRECTO
app.post(API_BASE + "/eu-solidarity-funds/:id", (req, res) => {
  res.status(405).send("Method not allowed");
});

// PUT correcto
app.put(API_BASE + "/eu-solidarity-funds/:id", (req, res) => {
  const id = req.params.id;

  // Verificar si el recurso existe
  db.findOne({ cci_number: id }, (err, resource) => {
    if (err) {
      return res.sendStatus(500, "Internal error");
    }
    if (!resource) {
      return res.status(404).send("Resource not found");
    }

    // Verificar si el ID en el cuerpo coincide con el ID en la URL
    if (req.body.cci_number !== id) {
      return res.status(400).send("ID in body does not match ID in URL");
    }

    // Actualizar el recurso existente con los datos del cuerpo de la solicitud
    db.update({ cci_number: id }, req.body, {}, (err, numReplaced) => {
      if (err) {
        return res.sendStatus(500, "Internal error");
      }
      res.sendStatus(200, "OK"); // No Content
    });
  });
});

// PUT incorrecto
app.put(API_BASE + "/eu-solidarity-funds", (req, res) => {
  const id = req.query.cci_number;

  // Verificar si se intenta hacer PUT en el recurso base
  if (!id) {
    return res.status(405).send("Method not allowed");
  }

  // Verificar si el recurso existe
  db.findOne({ cci_number: id }, (err, resource) => {
    if (err) {
      return res.sendStatus(500, "Internal error");
    }
    if (!resource) {
      return res.status(404).send("Resource not found");
    }

    // Verificar si el ID en el cuerpo coincide con el ID en la URL
    if (req.body.cci_number !== id) {
      return res.status(400).send("ID in body does not match ID in URL");
    }

    // Actualizar el recurso existente con los datos del cuerpo de la solicitud
    db.update({ cci_number: id }, req.body, {}, (err, numReplaced) => {
      if (err) {
        return res.sendStatus(500, "Internal error");
      }
      res.sendStatus(204); // No Content
    });
  });
});


app.delete(API_BASE + "/eu-solidarity-funds", (req, res) => {
  // Eliminar todos los documentos de la base de datos
  db.remove({}, { multi: true }, (err, numRemoved) => {
    if (err) {
      return res.sendStatus(500, "Internal error");
    }
    res.sendStatus(200); // OK
  });
});

app.delete(API_BASE + "/eu-solidarity-funds/:id", (req, res) => {
  const id = req.params.id;

  // Eliminar el documento de la base de datos con el ID proporcionado
  db.remove({ cci_number: id }, {}, (err, numRemoved) => {
    if (err) {
      return res.sendStatus(500, "Internal error");
    }
    if (numRemoved === 0) {
      return res.status(404).send("Resource not found");
    }
    res.sendStatus(200); // OK
  });
});

app.use(cors({
  "origin":"http://localhost:5173",
  "preflightContinue":false,
  "optionsSuccessStatus":204
}));

app.use(API_BASE + "/eu-solidarity-funds/proxy",function(req,res) {
  var url="https://myanimelist.p.rapidapi.com/anime";
  console.log('piped'+req.url);
  req.pipe(request(url)).pipe(res);
  
  request(url,(error,response,body)=>{
      if(error)
        console.log(error)
      console.log(response)
      res.send(body);
  })
});

//const PORT = (process.env.PORT || 10000);
  
//app.listen(PORT,()=>{
    //console.log(`Server listening on port ${PORT}.`);
//});
}

export {MMMBackend}