const API_BASE = "/api/v1";

const{data,calcularMediaPorPais}= require('./samples/MMM');
let carlosAPI=require('./regional-politicies-acceptance');

let dataStore=require('nedb');
let express = require("express");


let dbVotes= new dataStore();
let bodyParser = require("body-parser");
let JGVAPI = require("./foods-prices-inflation/API-JGV");
let dbFood = new dataStore();

let MMMAPI = require("./eu-solidarity-funds/index.js");

let app = express();

const port=(process.env.PORT || 10000);


app.use("/",express.static("./public"));
app.use(bodyParser.json());



app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
});


app.get("/samples/MMM", (req, res)=>{
    const a=calcularMediaPorPais(data,"AT");
    res.send(`<html><body>Media de los daños directos aceptados en Austria: ${a}</body></html>`);
  })


app.get("/samples/JGV", (req, res)=>{
    const a=f(dat, "Afghanistan");
    res.send(`<html><body>La media de Afghanistan es: ${a}</body></html>`);
  })
  




carlosAPI(app,dbVotes);


JGVAPI(app, dbFood);


MMMAPI(app);