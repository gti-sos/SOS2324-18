let express = require("express");
let cool=require("cool-ascii-faces");

let app = express();
let faces= cool();

const port=(process.env.PORT || 10000);



app.use("/",express.static("./public"));

app.get("/cool",(req,res)=>{
    res.send(faces);
});

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
});