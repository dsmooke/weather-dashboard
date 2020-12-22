// Variables
var time = moment();
console.log(time);

var snow = ["light snow", "snow", "heavy snow", "sleet", "light shower sleet", "shower sleet", "light rain and snow", "rain and snow", "light shower snow", "shower snow", "heavy shower snow"];

var sun = ["clear", "sunny"];
var rain = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531]
var clouds = [801, 802, 803, 804]
// var weatherIcon = [sun + rain + clouds + snow];


var currentHeaderDate = moment().format("l");


// Our API key
var APIKey = "f6f7a3dff7fc0e302488452daa7283c8"
var city = "";

// Function to Search for a City
function searchCity(city) {

    // Building the URL we need to query the database -API call 5-Day Forecast using city name
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    console.log(queryURL);

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML aka display function and get today's date and display it
            $(".city").html("<h2>" + response.city.name + " (" + currentHeaderDate + ")" + "</h2>");

            $(".weatherIcon").html("<img src='./assets/imgs/sun.png'>");

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

            // function to get UV-Index
            function uvIndex() {

                uvURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`

                console.log("uv-index API " + uvURL);

                $.ajax({
                    url: uvURL,
                    method: "GET"
                })
                    .then(function (response) {

                        // Log the uvURL
                        console.log(uvURL);

                        // Log the resulting object
                        console.log(response.value);


                        $(".uv-index").text("UV Index: " + response.value)

                        var uv = response.value;
                        console.log(uv);

                        // color coordinating based on index
                        if (uv <= 2) {
                            $(".uv-index").html("UV Index: " + "<span class='badge low-uv'>" + + uv + "</span>")

                        } else if (uv <= 7) {
                            $(".uv-index").html("UV Index: " + "<span class='badge high-uv'>" + + uv + "</span>")

                        } else {
                            $(".uv-index").html("UV Index: " + "<span class='badge bad-uv'>" + + uv + "</span>")
                        }
                    })
            }

            // call function
            uvIndex();

            function getWeatherIcon() {

                // var snow = ["light snow", "snow", "heavy snow", "sleet", "light shower sleet", "shower sleet", "light rain and snow", "rain and snow", "light shower snow", "shower snow", "heavy shower snow"];

                // var sun = ["clear", "sunny"];
                // var rain = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531]
                // var clouds = [801, 802, 803, 804]

                if (response.list[0].weather[0].main == sun || "Clear") {
                    console.log("It's sunny.")
                    $("#wIcon1").html("<img src='./assets/imgs/sun.png'>")
                    $(".weatherIcon").html("<img src='./assets/imgs/sun.png'>")
                    $("#wIcon2").html("<img src='./assets/imgs/sun.png'>")
                    $("#wIcon3").html("<img src='./assets/imgs/sun.png'>")
                    $("#wIcon4").html("<img src='./assets/imgs/sun.png'>")
                    $("#wIcon5").html("<img src='./assets/imgs/sun.png'>")

                } else if (response.list[0].weather[0].id == rain) {
                    console.log("It's rainy.")
                    $("#wIcon1").html("<img src='./assets/imgs/rain.png'>")
                    $("#weatherIcon").html("<img src='./assets/imgs/rain.png'>")
                    $("#wIcon2").html("<img src='./assets/imgs/rain.png'>")
                    $("#wIcon3").html("<img src='./assets/imgs/rain.png'>")
                    $("#wIcon4").html("<img src='./assets/imgs/rain.png'>")
                    $("#wIcon5").html("<img src='./assets/imgs/rain.png'>")

                } else if (response.list[0].clouds.all == clouds || response.list[0].clouds.all <= 100) {
                    console.log("It's cloudy.")
                    $("#wIcon1").html("<img src='./assets/imgs/clouds.png'>")
                    $(".weatherIcon").html("<img src='./assets/imgs/clouds.png'>")
                    $("#wIcon2").html("<img src='./assets/imgs/clouds.png'>")
                    $("#wIcon3").html("<img src='./assets/imgs/clouds.png'>")
                    $("#wIcon4").html("<img src='./assets/imgs/clouds.png'>")
                    $("#wIcon5").html("<img src='./assets/imgs/clouds.png'>")

                } else if (response.list[0].weather[0].main == snow) {
                    console.log("It's snowing.")
                    $("#wIcon1").html("<img src='./assets/imgs/snow.png'>")
                    $(".weatherIcon").html("<img src='./assets/imgs/snow.png'>")
                    $("#wIcon2").html("<img src='./assets/imgs/snow.png'>")
                    $("#wIcon3").html("<img src='./assets/imgs/snow.png'>")
                    $("#wIcon4").html("<img src='./assets/imgs/snow.png'>")
                    $("#wIcon5").html("<img src='./assets/imgs/snow.png'>")
                }

            } // end of geWeatherIcon function
            getWeatherIcon();


            // // Log the data in the console as well
            console.log("Temperature (F): " + tempF.toFixed(2));
            console.log("Humidity: " + response.list[0].main.humidity);
            console.log("Wind Speed: " + response.list[0].wind.speed);
            console.log("UV Index: " + response.value);

            // within the response's(citySearch's) list, forEach item within list array, find item with a date text that includes 12pm, if found log to console.
            response.list.forEach(
                item => {
                    if (item.dt_txt.includes("12:00")) {

                        console.log(item.dt_txt);

                        // 1 Day in Future
                        var date1 = response.list[4].dt_txt
                        date1 = (moment().add(1, 'days').format("l"));
                        var temp1 = (response.list[4].main.temp - 273.15) * 1.80 + 32
                        var humid1 = (response.list[4].main.humidity);
                        var wIcon1 = (response.list[4].weather.main);

                        $("#date1").html(date1);
                        $("#temp1").html(`Temp: ${temp1.toFixed(2)} F`);
                        $("#humidity1").html(`Humidity: ${humid1}%`);
                        // $("#wIcon1").html(`<img src='./assets/imgs/${weatherIcon}.png'>`)

                        // 2 Days in Future
                        var date2 = response.list[12].dt_txt
                        date2 = (moment().add(2, 'days').format("l"));
                        var temp2 = (response.list[12].main.temp - 273.15) * 1.80 + 32
                        var humid2 = (response.list[12].main.humidity);
                        $("#date2").html(date2);
                        $("#temp2").html(`Temp: ${temp2.toFixed(2)} F`);
                        $("#humidity2").html(`Humidity: ${humid2}%`);

                        // 3 Days in Future
                        var date3 = response.list[20].dt_txt
                        date3 = (moment().add(3, 'days').format("l"));
                        var temp3 = (response.list[20].main.temp - 273.15) * 1.80 + 32
                        var humid3 = (response.list[20].main.humidity);
                        $("#date3").html(date3);
                        $("#temp3").html(`Temp: ${temp3.toFixed(2)} F`);
                        $("#humidity3").html(`Humidity: ${humid3}%`);

                        // 4 Days in Future
                        var date4 = response.list[28].dt_txt
                        date4 = (moment().add(4, 'days').format("l"));
                        var temp4 = (response.list[28].main.temp - 273.15) * 1.80 + 32
                        var humid4 = (response.list[28].main.humidity);
                        $("#date4").html(date4);
                        $("#temp4").html(`Temp: ${temp4.toFixed(2)} F`);
                        $("#humidity4").html(`Humidity: ${humid4}%`);

                        // 5 Days in Future
                        var date5 = response.list[36].dt_txt
                        date5 = (moment().add(5, 'days').format("l"));
                        var temp5 = (response.list[36].main.temp - 273.15) * 1.80 + 32
                        var humid5 = (response.list[36].main.humidity);
                        $("#date5").html(date5);
                        $("#temp5").html(`Temp: ${temp5.toFixed(2)} F`);
                        $("#humidity5").html(`Humidity: ${humid5}%`);


                        // $(city).val(localStorage.getItem(city))
                        function searchHistory() {
                            $(".searchBtn").val(localStorage.getItem(city))
                            $(".list-group").text(city).val(localStorage.getItem(city))
                        }
                        searchHistory();
                    }
                }
            )

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

var searchBtn = $(".searchBtn")
searchBtn.on("click", function (event) {
    console.log($(this).prev().val());
    console.log($(this).parent().attr("id"))
    localStorage.setItem($(this).parent().attr("id"), $(this).prev().val());
})


