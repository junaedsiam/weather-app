const express = require("express");
const forecast = require("./forecast");
const geoCode = require("./geocode");
//initiation 
const app = express();
const port = +process.argv[2] || 4000;  

//middlewares
app.use(express.static('public'))

//setting
app.set('view engine','ejs');

app.get("/",(req,res) => {
   res.render("index",{title:"Search for forecast"});
});

app.get("/about",(req,res)=>{
    res.render("about",{title:"About the application"})
});
app.get("/contact",(req,res)=>{
    res.render("contact",{title:"Contact Page"})
});

app.get("/weather",(req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Bad Request! You must provide address as a query with your request"
        })
    }
   const {address} = req.query;
   geoCode(address,(geoErr,geoData)=>{
       if(geoErr){
           return res.send({
               error:geoErr 
           })
       }
       forecast({lat:geoData.lat,long:geoData.long},(forecastError,forecastData)=>{
           if(forecastError){
               return res.send({
                   error:forecastError
               })
           }
           res.send({
               location: geoData.location,
               temperature: forecastData.currently.temperature,
               summary: forecastData.currently.summary
           })
       })
   })

});

app.listen(port,() => {
    console.log("Server is listening at port: " + port)
});
