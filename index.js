const API_BASE = "/api/v1";
const { datos,average } = require('./samples/CBR');
const{data,calcularMediaPorPais}= require('./samples/MMM');
const{dat,f}=require('./samples/JGV');

let express = require("express");
let cool=require("cool-ascii-faces");
let bodyParser = require("body-parser");
let JGVAPI = require("./samples/JGV/API-JGV");

let app = express();

const port=(process.env.PORT || 10000);

app.use("/",express.static("./public"));
app.use(bodyParser.json());

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
    const a=f(dat, "Afghanistan");
    res.send(`<html><body>La media de Afghanistan es: ${a}</body></html>`);
  })

JGVAPI(app);
  