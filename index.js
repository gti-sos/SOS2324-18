const { datos,average } = require('./samples/CBR');
const{data,calcularMediaPorPais}= require('./samples/MMM');
const{dat,f}=require('./samples/JGV');
let carlosAPI=require('./regional-politicies-acceptance');
let dataStore=require('nedb');
let express = require("express");
let cool=require("cool-ascii-faces");



let dbVotes= new dataStore();

let app = express();


const port=(process.env.PORT || 10000);
const API_BASE="/api/v1";

app.use("/",express.static("./public"));

app.get("/cool",(req,res)=>{
    res.send(cool());
});

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
});



app.get("/samples/CBR", (req, res) => {
    const a = average(datos, "EU");
    res.send(`<html> <body> <h1> The average who voted yes in EU is: ${a} </h1> </body> </html>`);
});



app.get("/samples/MMM", (req, res)=>{
    const a=calcularMediaPorPais(data,"AT");
    res.send(`<html><body>Media de los daños directos aceptados en Austria: ${a}</body></html>`);
  })



app.get("/samples/JGV", (req, res)=>{
    const a=f(dat,"Afghanistan");
    res.send(`<html><body>Prueba La media de Afghanistan es: ${a}</body></html>`);
  })
  




carlosAPI(app,dbVotes);


