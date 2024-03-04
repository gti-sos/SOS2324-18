let express=require("express");
let bodyParser=require("body-parser");
const API_BASE="/api/v1";
const port=(process.env.PORT || 10000);


let initialCountries=[
    {
            "eu_country": "eu",
            "answer_yes": "10788",
            "yes": "0.4",
            "answer_no": "15890",
            "no": "0.58",
            "answer_n_a": "466",
            "n_a": "0.02",
            "total": "27144",
            "year": "2019"
        },
        {
            "eu_country": "austria",
            "answer_yes": "247",
            "yes": "0.25",
            "answer_no": "732",
            "no": "0.73",
            "answer_n_a": "21",
            "n_a": "0.02",
            "total": "1000",
            "year": "2019"
        },
        {
            "eu_country": "belgium",
            "answer_yes": "224",
            "yes": "0.22",
            "answer_no": "773",
            "no": "0.77",
            "answer_n_a": "10",
            "n_a": "0.01",
            "total": "1007",
            "year": "2019"
        },
        {
            "eu_country": "bulgaria",
            "answer_yes": "433",
            "yes": "0.43",
            "answer_no": "562",
            "no": "0.56",
            "answer_n_a": "5",
            "n_a": "0.01",
            "total": "1000",
            "year": "2019"
        },
        {
            "eu_country": "cyprus",
            "answer_yes": "268",
            "yes": "0.38",
            "answer_no": "409",
            "no": "0.59",
            "answer_n_a": "22",
            "n_a": "0.03",
            "total": "700",
            "year": "2019"
        },
        {
            "eu_country": "czechia",
            "answer_yes": "755",
            "yes": "0.75",
            "answer_no": "217",
            "no": "0.22",
            "answer_n_a": "27",
            "n_a": "0.03",
            "total": "1000",
            "year": "2019"
        },
        {
            "eu_country": "germany",
            "answer_yes": "296",
            "yes": "0.3",
            "answer_no": "669",
            "no": "0.67",
            "answer_n_a": "35",
            "n_a": "0.03",
            "total": "1000",
            "year": "2019"
        },
        {
            "eu_country": "denmark",
            "answer_yes": "149",
            "yes": "0.15",
            "answer_no": "840",
            "no": "0.84",
            "answer_n_a": "11",
            "n_a": "0.01",
            "total": "1000",
            "year": "2019"
        },
        {
            "eu_country": "estonia",
            "answer_yes": "580",
            "yes": "0.58",
            "answer_no": "383",
            "no": "0.38",
            "answer_n_a": "36",
            "n_a": "0.04",
            "total": "1000",
            "year": "2019"
        },
        {
            "eu_country": "greece",
            "answer_yes": "474",
            "yes": "0.47",
            "answer_no": "512",
            "no": "0.51",
            "answer_n_a": "14",
            "n_a": "0.02",
            "total": "1000",
            "year": "2019"
        },
        {
            "eu_country": "spain",
            "answer_yes": "376",
            "yes": "0.37",
            "answer_no": "608",
            "no": "0.61",
            "answer_n_a": "16",
            "n_a": "0.02",
            "total": "1000",
            "year": "2019"
        },
        {
            "eu_country": "finland",
            "answer_yes": "293",
            "yes": "0.29",
            "answer_no": "691",
            "no": "0.69",
            "answer_n_a": "19",
            "n_a": "0.02",
            "total": "1003",
            "year": "2019"
        }
    ];

module.exports=(app,db)=>{

app.use(bodyParser.json());

//Initial data load
app.get(API_BASE+"/regional-politicies-acceptance/loadInitialdata",(req,res)=>{
    db.insert(initialCountries);
    res.sendStatus("201","created");
    }
);

//#########################################################################################

//POST A NEW COUNTRY  POSITIVE FEEDBACK
app.post(API_BASE+"/regional-politicies-acceptance/:name",(req,res)=>{
    
    let existingCountry;
    const resources=["countries"];
    
    if(!resources.includes(req.params.name)){
        res.sendStatus(404,"Not Found");
    }
   
    let newCountry=req.body;
    


    db.find({eu_country:newCountry.eu_country,year:newCountry.year},(err,countries)=>{
        if(err){
            res.sendStatus(500,'Internal Server Error');
        }
        else{
            existingCountry=countries;
            const expectedFields=["eu_country","answer_yes","yes","answer_no","no","answer_n_a","n_a","total","year"];
            const requestFields=Object.keys(req.body);
            const missedFields=expectedFields.filter(field=>!requestFields.includes(field));
            if(missedFields.length>0){
                res.status(400).send("Missing fields: " + missedFields.join(", "));
            }else{  
                if(existingCountry.length>0){
                    res.sendStatus(409);
                }else{
                    db.insert(req.body);
                    res.sendStatus(201,"Created");
                }}
            }});

      
    
    
});


//POST A NEW COUNTRY NEGATIVE FEEDBACK

app.post(API_BASE+"/regional-politicies-acceptance/:name/:nam",(req,res)=>{
    
    const resources=["countries"];
    
    if(!resources.includes(req.params.name)){
        res.sendStatus(404,"Not Found");
    }else{
        if(req.params.nam!=undefined || req.params.nam!=null){
            res.sendStatus(405);
        }
    }});



//GET TO ACCESS A FULL COUNTRIES
app.get(API_BASE+"/regional-politicies-acceptance",(req,res)=>{
    
    db.find({},(err,countries)=>{
        if(err){
            res.sendStatus(500,'Internal Server Error');
        }
        else{
            res.send(JSON.stringify(countries.map((c)=>{
                delete c._id;
                return c;
            })));
        }});
    });


        
//GET TO ACCESS COUNTRIES THAT CONTAINS A SPECIFIC NAME
app.get(API_BASE+"/regional-politicies-acceptance/:name/:countrName",(req,res)=>{
    const resources=["countries"];
    if(!resources.includes(req.params.name)){
        res.sendStatus(404,"Not Found");
    }else{
        let countryName=req.params.countrName;
        db.find({eu_country:countryName},(err,countries)=>{
            if(err){
                res.sendStatus(500,'Internal Server Error');
            }
            else{
                res.send(JSON.stringify(countries.map((c)=>{
                    delete c._id;
                    return c;
                })));
            }});
        }});








//PUT TO UPDATE A EXISTING ENTRY 
app.put(API_BASE+"/regional-politicies-acceptance/:resource/:name/:year",(req,res)=>{

    const resources=["countries"];
    
    if(!resources.includes(req.params.resource)){
        res.sendStatus(404,"Not Found");
    }else{
        if(req.params.name===undefined || req.params.name===null){
            res.sendStatus(405);
        }else{
            let countryName=req.params.name;
            let oldYear=req.params.year;
            let newYear=req.body.year;
            db.update({eu_country:countryName,year:oldYear},{$set:{year:newYear}},{},(err,numCountryMod)=>{
                if(err){
                    res.send(500,"Internal Server Error");
                }else{
                    if(numCountryMod===1){
                        res.sendStatus(201,"Created");
                    }else{
                        res.sendStatus(400,'Bad Request');
                    }
                }
            });
        }
    }});


//DELETE ALL ENTRIES
app.delete(API_BASE+"/regional-politicies-acceptance/:resource",(req,res)=>{

    const resources=["countries"];
    
    if(!resources.includes(req.params.resource)){
        res.sendStatus(404,"Not Found");
    }else{
        db.remove({},{multi:true},(err,numRemoved)=>{
            if(err){
                res.send(500,"Internal Server Error");
            }else{
                if(numRemoved>1){
                    res.sendStatus(200,"OK");
                }else{
                    res.sendStatus(400,'Bad Request');
                }
            }});
    }});



//DELETE ESPECIFIC ENTRIES
app.delete(API_BASE+"/regional-politicies-acceptance/:resource/:name",(req,res)=>{

    const resources=["countries"];
    
    if(!resources.includes(req.params.resource)){
        res.sendStatus(404,"Not Found");
    }else{
        let countryName=req.params.name;
        db.remove({eu_country:countryName},{},(err,numCountryMod)=>{
        if(err){
            res.send(500,"Internal Server Error");
        }else{
            if(numCountryMod>=1){
                res.sendStatus(200,"OK");
            }else{
                res.sendStatus(400,'Bad Request');
            }}});
    }});



}

