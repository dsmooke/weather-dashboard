// Variables
var time = moment();
console.log(time);

// Our API key
var APIKey = "f6f7a3dff7fc0e302488452daa7283c8"

// var cityName = getElementById.$(".city")

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=4180439&mode=xml&appid=" + APIKey;

console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response) {

    console.log(queryURL);

    console.log(response);

    // Transfer content to HTML
    $(".city").html("<h2>" + response.name + "</h2>");
    
    $(".wind").text("Wind: " + response.main.wind.speed);
    
    // Log the data in the console as well
    console.log("Wind Speed: " + response.main.windSpeed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + tempF);
})
// $(".city").html("<div>" + response.name + " </div>");
    

// get today's date and display it
function getHeaderDate() {
    var currentHeaderDate = moment().format("l");
    
    $("#currentDay").html("<p>" + currentHeaderDate + "</p>");
}


 getHeaderDate();

// function searchForCity() {
    
// }

// function getFiveDayForecast() {

// }