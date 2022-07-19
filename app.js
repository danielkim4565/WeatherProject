const { json } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true})); 

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var place = req.body.location;
    const url = "https://api.openweathermap.org/data/2.5/weather?p=" + place + "&id=524901&appid=00e53ad3c21502d1159979601d0246be&units=metric";
    http.get(url, function(response){
        response.on("data", function(data) {
            var weatherData = JSON.parse(data);
            var iconLink = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.write("<h1>It is " + weatherData.main.temp + " degrees in " + place + "</h1>");
            res.write("<img src= " + iconLink + ">");
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("The server is up");
});