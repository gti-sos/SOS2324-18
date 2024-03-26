const API_BASE = "/api/v1";
const API_BASE2 = "/api/v2";

import dataStore from 'nedb';
import express from "express";
import bodyParser from "body-parser";

import {handler} from "./front/build/handler.js"

//import {carlosAPI} from './regional-politicies-acceptance/index.js';
import {JGVBackend} from "./foods-prices-inflation/index.js";
//import {MMMAPI} from "./eu-solidarity-funds/index.js";

let dbVotes= new dataStore();
let dbFood = new dataStore();
let dbFunds = new dataStore();

let app = express();

const port=(process.env.PORT || 10000);

//app.use("/",express.static("./public"));
app.use(bodyParser.json());
app.use(handler);

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
});


//carlosAPI(app, dbVotes);


JGVBackend(app, dbFood);


//MMMAPI(app, dbFunds);