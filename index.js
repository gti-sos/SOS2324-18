let express = require("express");
let cool=require("cool-ascii-faces");

let app = express();
let faces= cool();
const port=10000



app.use("/",express.static("./public"));


app.get("/cool",(req,res)=>{
    res.send(faces);
}

)


app.listen(port);