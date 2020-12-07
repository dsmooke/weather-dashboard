// Variables
var time = moment();
console.log(time);

// Our API key
var APIKey = "f6f7a3dff7fc0e302488452daa7283c8"




// get today's date and display it
function getHeaderDate() {
    var currentHeaderDate = moment().format("l");
    
    $("#currentDay").html("<p>" +currentHeaderDate + "</p>");
}

getHeaderDate();

