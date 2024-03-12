const API_BASE = "/api/v1";


let carlosAPI=require('./regional-politicies-acceptance');

let dataStore=require('nedb');
let express = require("express");


let dbVotes= new dataStore();
let bodyParser = require("body-parser");
let JGVAPI = require("./foods-prices-inflation/API-JGV");
let dbFood = new dataStore();

let dbFunds = new dataStore();

let MMMAPI = require("./eu-solidarity-funds/index.js");

let app = express();

const port=(process.env.PORT || 10000);


app.use("/",express.static("./public"));
app.use(bodyParser.json());



app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
});






carlosAPI(app,dbVotes);


JGVAPI(app, dbFood);


MMMAPI(app, dbFunds);