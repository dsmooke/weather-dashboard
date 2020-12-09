// Variables
var time = moment();
console.log(time);

// Our API key
var APIKey = "f6f7a3dff7fc0e302488452daa7283c8"
// var city = "Chicago"





// "https://api.openweathermap.org/data/2.5/forecast?q=Hartford&appid=" + APIKey;





function searchCity(city){

var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response) {

    console.log(queryURL);

    console.log(response);

    // Transfer content to HTML aka display function
    $(".city").html("<h2>" + response.city.name + "</h2>");
    
    $(".wind").text("Wind: " + response.list[0].wind.speed);
    
    response.list.forEach(
        item => {
            if(item.dt_txt.includes("12:00")) {
                console.log(item.dt);
            }

        } 
    )
   
    // // Log the data in the console as well
    // console.log("Wind Speed: " + response.main.windSpeed);
    // console.log("Humidity: " + response.main.humidity);
    // console.log("Temperature (F): " + tempF);
})
// $(".city").html("<div>" + response.name + " </div>");
    
} 
// get today's date and display it
function getHeaderDate() {
    var currentHeaderDate = moment().format("l");
    
    $("#currentDay").html("<p>" + currentHeaderDate + "</p>");
}

searchCity("Hartford");

 getHeaderDate();


$("form").on("submit", (e) => {
    e.preventDefault();
    var inputOne = e.currentTarget[0].value;
    searchCity(inputOne);
})

// function searchForCity() {
    
// }

// function getFiveDayForecast() {

// }