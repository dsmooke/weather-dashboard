// Variables
var time = moment();
console.log(time);




var currentHeaderDate = moment().format("l");
// var fiveDayOutlook = 

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

        // longitude and latitude
        var lon = response.city.coord.lon;
        var lat = response.city.coord.lat;
            console.log(lat, lon);
        

        function uvIndex() {
       
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
                console.log(response.value);
            

                $(".uv-index").text("UV Index: " +  response.value)
            
                var uv = response.value;
                console.log(uv);

                // color coordinating based on index
                if (uv <= 2) {
                    $(".uv-index").html("UV Index: " + "<span class='badge low-uv'>" +  + uv + "</span>") 

                } else if (uv <= 7){
                    $(".uv-index").html("UV Index: " + "<span class='badge high-uv'>" +  + uv + "</span>")

                } else { $(".uv-index").html("UV Index: " + "<span class='badge bad-uv'>" +  + uv + "</span>")
                }
            })
        }
    
        // call function
        uvIndex();
        
        // // Log the data in the console as well
        console.log("Temperature (F): " + tempF.toFixed(2));
        console.log("Humidity: " + response.list[0].main.humidity);
        console.log("Wind Speed: " + response.list[0].wind.speed);
        console.log("UV Index: " + response.value);
        
        // within the response's(citySearch's) list, forEach item within list array, find item with a date text that includes 12pm, if found log to console.
        response.list.forEach(
            item => {
                if(item.dt_txt.includes("12:00")) {
                    console.log(item.dt_txt);

                    // 1 Day in Future
                    var fiveDays = item.dt_txt
                    fiveDays = moment().format("l");
                    console.log("YES" + fiveDays)
                    $("#nextDay").html("<h5>" + fiveDays + "</h5>");
                                
                    // 2 Days in Future

                            
                        
                    
                }
            }
        )
        
        function getWeatherIcon(){

            var snow = ["light snow", "snow", "heavy snow", "sleet", "light shower sleet", "shower sleet", "light rain and snow", "rain and snow", "light shower snow", "shower snow", "heavy shower snow"];

            var sun = ["clear", "sunny"];
            var rain = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531]
            var clouds = [801, 802, 803, 804]

            if (response.list[0].weather[0].main == "Sun" || "Clear") {
                console.log("It's sunny.")
                $("#wIcon1").html("<img src='./assets/imgs/sun.png'>")
                $(".weatherIcon").html("<img src='./assets/imgs/sun.png'>")

            } else if (response.list[0].weather[0].id == rain ) {
                console.log("It's rainy.")
                $("#wIcon1").html("<img src='./assets/imgs/rain.png'>")
                $("#weatherIcon").html("<img src='./assets/imgs/rain.png'>")

            } else if (response.list[0].clouds.all == clouds || response.list[0].clouds.all <= 100) {
                console.log("It's cloudy.")
                $("#wIcon1").html("<img src='./assets/imgs/clouds.png'>")
                $(".weatherIcon").html("<img src='./assets/imgs/clouds.png'>")

            } else if (response.list[0].weather[0].main == snow ) {
                console.log("It's snowing.")
                $("#wIcon1").html("<img src='./assets/imgs/snow.png'>")
                $("#wIcon1").html("<img src='./assets/imgs/snow.png'>")
             }

            
            
            

        
        
        } // end of geWeatherIcon function
       getWeatherIcon();

     })
        
        
} 
// calling searchCity function with argument of "Hartford"
searchCity("Hartford");


// when page refreshes show default city Hartford
$("form").on("submit", (e) => {
    e.preventDefault();

    var inputOne = e.currentTarget[0].value;
    searchCity(inputOne);
})

// function getFiveDayOutlook() {
//     var fiveDayOutlook = response.item.dt_txt.includes("12:00");
//     console.log(fiveDayOutlook);
// }
// // getFiveDayOutlook();


// response.list.forEach(
//     item => {
//         if(item.dt_txt.includes("12:00")) {
//             var fiveDays = item.dt_txt
//             console.log(item.dt_txt);

