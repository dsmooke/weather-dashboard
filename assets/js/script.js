// Variables
var time = moment();
console.log(time);




var currentHeaderDate = moment().format("l");


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

        
        
        // Transfer content to HTML aka display function and get today's date and display it
        $(".city").html("<h2>" + response.city.name + " (" + currentHeaderDate + ")" + "</h2>");
        
        $(".wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");

        $(".humidity").text("Humidity: " + response.list[0].main.humidity + " %");

        // Convert the temp to fahrenheit
        var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;

        $(".temp").text("Temperature: " + response.list[0].main.temp + " K");


        $(".tempF").text("Temperature: " + tempF.toFixed(2) + "F");
        $(".tempF").html("Temperature: " + tempF.toFixed(2) + " <span>&#8457;</span>");

    function getLongLat(city) {
        uvURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`

         console.log("uv-index API " + uvURL);

         $.ajax({
            url: uvURL,
            method: "GET"
        })
            .then(function(response) {

            // Log the uvURL
            console.log(uvURL);
    
            // Log the resulting object
            console.log(response);

            var lon = response.city.coord[1];
            var lat = response.city.coord[0];
            console.log(lon, lat);
            
            
            })



                                   
                                
                                
                                
                                }
    $(".uv-index").text("UV Index: " + response)
    getLongLat();


        
        
            
        
        
        // // Log the data in the console as well
        console.log("Temperature (F): " + tempF.toFixed(2));
        console.log("Humidity: " + response.list[0].main.humidity);
        console.log("Wind Speed: " + response.list[0].wind.speed);
        
        

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
    
        
    }
// $(".city").html("<div>" + response.name + " </div>");
    


// calling searchCity function with argument of "Hartford"
searchCity("Hartford");



// in the form element on click of 'search'/'submit' event (e) prevent from refreshing the page; 
// when page refreshes show default city Hartford
$("form").on("submit", (e) => {
    e.preventDefault();

    var inputOne = e.currentTarget[0].value;
    searchCity(inputOne);
})


// function getWeatherIcon(){
    
//     var weatherIcon = response.list[0].weather[0].icon;

//     iconURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

// //    console.log(weatherIcon);
//     console.log(iconURL);

//         // Here we run our AJAX call to the OpenWeatherMap API
//     $.ajax({
//         url: iconURL,
//         method: "GET"
//     })

//     // We store all of the retrieved data inside of an object called "response"
//     .then(function(response) {

//         // Log the queryURL
//         console.log(iconURL);

//         // Log the resulting object
//         console.log(response);

            

//         // Transfer content to HTML aka display function
//         $(".city").html("<span>" + response.list[0].weather.icon + "</span>");
            
//          })

//    } 
