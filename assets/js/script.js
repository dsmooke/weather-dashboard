// Variables
var time = moment();
console.log(time);

// Our API key
var APIKey = "f6f7a3dff7fc0e302488452daa7283c8"
var city = "";


// "https://api.openweathermap.org/data/2.5/forecast?q=Hartford&appid=" + APIKey;


// Function to Search for a City
function searchCity(city){

// Building the URL we need to query the database -API call 5-Day Forecast using city name
var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

console.log(queryURL);

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
})

// We store all of the retrieved data inside of an object called "response"
.then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML aka display function
    $(".city").html("<h2>" + response.city.name + "</h2>");
    
    $(".wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");

    $(".humidity").text("Humidity: " + response.list[0].main.humidity + " %");

    // Convert the temp to fahrenheit
    
    var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;

    $(".temp").text("Temperature: " + response.list[0].main.temp + " K");


    $(".tempF").text("Temperature: " + tempF.toFixed(2) + "F");
    $(".tempF").html("Temperature: " + tempF.toFixed(2) + "<span>&#8457;</span>");
    // $(".uv-index").text("UV Index: " + )
    
    // response.city.list[array of objects with dt date code]

    // within the response's(citySearch's) list, forEach item within list array, find item with a date text that includes 12pm, if found log to console.
    response.list.forEach(
        item => {
            if(item.dt_txt.includes("12:00")) {
                console.log(item.dt_txt);
            }
               
        
                } 
            )


        } 
    )
   
    // // Log the data in the console as well
    // console.log("Wind Speed: " + response.main.windSpeed);
    // console.log("Humidity: " + response.main.humidity);
    // console.log("Temperature (F): " + tempF);
}
// $(".city").html("<div>" + response.name + " </div>");
    

// get today's date and display it
function getHeaderDate() {
    var currentHeaderDate = moment().format("l");
    
    $("#currentDay").html("<p>" + currentHeaderDate + "</p>");
}

// calling searchCity function with argument of "Hartford"
searchCity("Hartford");

// calling getHeaderDate function
getHeaderDate();

// in the form element on click of 'search'/'submit' event (e) prevent from refreshing the page; 
// when page refreshes show default city Hartford
$("form").on("submit", (e) => {
    e.preventDefault();

    var inputOne = e.currentTarget[0].value;
    searchCity(inputOne);
})


