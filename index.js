const { datos,average } = require('./samples/CBR');


let express = require("express");
let cool=require("cool-ascii-faces");

let app = express();


const port=(process.env.PORT || 10000);


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