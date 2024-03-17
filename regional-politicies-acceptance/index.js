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
    let countriess;
    db.find({},(err,countries)=>{
        if(err){
            res.sendStatus(500,'Internal Server Error');
        }else{
            countriess=countries;
            if(countries.length==0){
                delete initialCountries._id;
                db.insert(initialCountries);
                res.sendStatus("201","created");
            }else{
                res.sendStatus(409);
            }
        }
    });
    
    }
);

//#########################################################################################

//POST A NEW COUNTRY  POSITIVE FEEDBACK
app.post(API_BASE+"/regional-politicies-acceptance/",(req,res)=>{
    
    let existingCountry;
    let newCountry=req.body;
    


    db.find({eu_country:newCountry.eu_country,year:newCountry.year},(err,countries)=>{
        delete countries._id;
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

app.post(API_BASE+"/regional-politicies-acceptance/:name",(req,res)=>{
    res.sendStatus(405);
    });


app.post(API_BASE+"/regional-politicies-acceptance/:name/:name2",(req,res)=>{
    res.sendStatus(405);
    });
    
    

        
//GET TO ACCESS COUNTRIES WITH A SPECIFIC FIELD
app.get(API_BASE+"/regional-politicies-acceptance",(req,res)=>{
   
  
    
    let offset=req.query.offset;
    let limitt=req.query.limit;
    let valueName=req.query.eu_country;
    let valueAnswerYes =req.query.answer_yes;
    let valueYes=req.query.yes;
    let valueAnswerNo=req.query.answer_no;
    let valueNo=req.query.no;
    let valueAnswerN_a=req.query.answer_n_a;
    let valueN_a=req.query.n_a;
    let valueTotal=req.query.total;
    let valueYear=req.query.year;



    if(valueName==undefined && valueAnswerYes==undefined && valueYes==undefined && valueAnswerNo==undefined && valueNo==undefined && valueAnswerN_a==undefined && valueN_a==undefined && valueTotal==undefined && valueYear==undefined){
        db.find({}).skip(offset).limit(limitt).exec((err,countries)=>{
            if(err){
                res.sendStatus(500,'Internal Server Error');
            }
            else{
                res.send(JSON.stringify(countries.map((c)=>{
                    delete c._id;
                    return c;
                })));
            }});
    }else{
        if(valueName!=undefined){
            db.find({eu_country:valueName}).skip(offset).limit(limitt).exec((err,countries)=>{
                if(err){
                    res.sendStatus(500,'Internal Server Error');
                }
                else{
                    res.send(JSON.stringify(countries.map((c)=>{
                        delete c._id;
                        return c;
                    })));
                }});
        }

        

        if(valueAnswerYes!=undefined){
            db.find({answer_yes:valueAnswerYes}).skip(offset).limit(limitt).exec((err,countries)=>{
                if(err){
                    res.sendStatus(500,'Internal Server Error');
                }
                else{
                    res.send(JSON.stringify(countries.map((c)=>{
                        delete c._id;
                        return c;
                    })));
                }});
        }

        if(valueYes!=undefined){
            db.find({yes:valueYes}).skip(offset).limit(limitt).exec((err,countries)=>{
                if(err){
                    res.sendStatus(500,'Internal Server Error');
                }
                else{
                    res.send(JSON.stringify(countries.map((c)=>{
                        delete c._id;
                        return c;
                    })));
                }});
        }

     
        
        if(valueAnswerNo!=undefined){
            db.find({answer_no:valueAnswerNo}).skip(offset).limit(limitt).exec((err,countries)=>{
                if(err){
                    res.sendStatus(500,'Internal Server Error');
                }
                else{
                    res.send(JSON.stringify(countries.map((c)=>{
                        delete c._id;
                        return c;
                    })));
                }});
        }

       
        if(valueNo!=undefined){
            db.find({no:valueNo}).skip(offset).limit(limitt).exec((err,countries)=>{
                if(err){
                    res.sendStatus(500,'Internal Server Error');
                }
                else{
                    res.send(JSON.stringify(countries.map((c)=>{
                        delete c._id;
                        return c;
                    })));
                }});
        }


        
        if(valueAnswerN_a!=undefined){
            db.find({answer_n_a:valueAnswerN_a}).skip(offset).limit(limitt).exec((err,countries)=>{
                if(err){
                    res.sendStatus(500,'Internal Server Error');
                }
                else{
                    res.send(JSON.stringify(countries.map((c)=>{
                        delete c._id;
                        return c;
                    })));
                }});
        }

         
        if(valueN_a!=undefined){
            db.find({n_a:valueN_a}).skip(offset).limit(limitt).exec((err,countries)=>{
                if(err){
                    res.sendStatus(500,'Internal Server Error');
                }
                else{
                    res.send(JSON.stringify(countries.map((c)=>{
                        delete c._id;
                        return c;
                    })));
                }});
        }

        

        if(valueTotal!=undefined){
            db.find({total:valueTotal}).skip(offset).limit(limitt).exec((err,countries)=>{
                if(err){
                    res.sendStatus(500,'Internal Server Error');
                }
                else{
                    res.send(JSON.stringify(countries.map((c)=>{
                        delete c._id;
                        return c;
                    })));
                }});
        }


        if(valueYear!=undefined){
            db.find({year:valueYear}).skip(offset).limit(limitt).exec((err,countries)=>{
                if(err){
                    res.sendStatus(500,'Internal Server Error');
                }
                else{
                    res.send(JSON.stringify(countries.map((c)=>{
                        delete c._id;
                        return c;
                    })));
                }});
        }
        }});


app.get(API_BASE+"/regional-politicies-acceptance/:name/:param",(req,res)=>{
    let name=req.params.name;
    let paramm=req.params.param;

    if(name!=undefined && paramm=="year"){
        res.sendStatus(404);
    }else{
        db.find({eu_country:name,year:paramm}).exec((err,countries)=>{
        if(err){
           res.sendStatus(500,'Internal Server Error');
        }else{
            if(countries.length==0){
                res.sendStatus(404);
            }else{
            res.send(JSON.stringify(countries.map((c)=>{
            delete c._id;
            return c;
                    })));
    }}});

    }
});





//PUT TO UPDATE A EXISTING ENTRY 
app.put(API_BASE+"/regional-politicies-acceptance/:name/:year",(req,res)=>{

    let countryName=req.params.name;
    let oldYear=req.params.year;
    let newYear=req.body.year;
    let answer_yess=req.body.answer_yes;
    let yess=req.body.yes;
    let answer_nos=req.body.answer_no;
    let nos=req.body.no;
    let answer_n_as=req.body.answer_n_a;
    let n_as=req.body.n_a;
    let totals=req.body.total;
            
    
    const expectedFields=["eu_country","answer_yes","yes","answer_no","no","answer_n_a","n_a","total","year"];
    const requestFields=Object.keys(req.body);
    const missedFields=expectedFields.filter(field=>!requestFields.includes(field));
    if(missedFields.length>0){
            res.status(400).send("Missing fields: " + missedFields.join(", "));
        }else{
            db.update({eu_country:countryName,year:oldYear},{$set:{eu_country:req.body.eu_country,year:newYear.toString(),answer_yes:answer_yess,yes:yess,answer_no:answer_nos,no:nos,answer_n_a:answer_n_as,n_a:n_as,total:totals}},{},(err,numCountryMod)=>{
                delete numCountryMod._id;
                if(err){
                    res.send(500,"Internal Server Error");
                }else{
                    if(numCountryMod>=1){
                        res.sendStatus(201,"Created");
                    }else{
                        res.sendStatus(404,'Bad Request');
                    }
                }
            });
    }});

//PUT TO A RESOURCE NEGATIVE FEEDBACK

app.put(API_BASE+"/regional-politicies-acceptance",(req,res)=>{

    res.sendStatus(405);
    
    });



//DELETE ALL ENTRIES
app.delete(API_BASE+"/regional-politicies-acceptance",(req,res)=>{

    const resources=["countries"];
    
    db.remove({},{multi:true},(err,numRemoved)=>{
            if(err){
                res.send(500,"Internal Server Error");
            }else{
                if(numRemoved>=1){
                    res.sendStatus(200,"OK");
                }else{
                    res.sendStatus(400,'Bad Request');
                }
            }});
    });



//DELETE A ESPECIFIC ENTRY
app.delete(API_BASE+"/regional-politicies-acceptance/:name/:year",(req,res)=>{

    let countryName=req.params.name;
    let countryYear=req.params.year
        db.remove({eu_country:countryName,year:countryYear},{},(err,numCountryMod)=>{
        if(err){
            res.send(500,"Internal Server Error");
        }else{
            if(numCountryMod==1){
                res.sendStatus(200,"OK");
            }else{
                res.sendStatus(404);
            }}});
    });

app.get(API_BASE+"/regional-politicies-acceptance/docs",(req,res)=>{
    res.redirect(200,"https://documenter.getpostman.com/view/32973833/2sA2xnxpzk");
    
});

}
