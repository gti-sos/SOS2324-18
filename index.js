const API_BASE = "/api/v1";
const API_BASE2 = "/api/v1";

import  express  from 'express';
import bodyParser from 'body-parser';
import {carlosBackend} from './backend/v2/regional-politicies-acceptance/index.js';
import {JGVBackend} from "./backend/v2/foods-prices-inflation/index.js";
import {MMMBackend} from "./backend/v1/eu-solidarity-funds/index.js"
import dataStore from "nedb";
import {handler} from "./front/build/handler.js";
import cors from "cors";


let dbVotes= new dataStore();
//let JGVAPI = require("./foods-prices-inflation");
let dbFood = new dataStore();
let dbFunds = new dataStore();

//let MMMAPI = require("./eu-solidarity-funds");

let app = express();

const port=(process.env.PORT || 10000);

app.use(cors());
app.use(bodyParser.json());


carlosBackend(app,dbVotes);
JGVBackend(app, dbFood);
MMMBackend(app, dbFunds);









app.use(handler);
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
});









//JGVAPI(app, dbFood);


//MMMAPI(app, dbFunds);