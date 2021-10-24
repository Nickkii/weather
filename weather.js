function getLocation() {
    $.get("https://ipapi.co/json", function(data) {
        getWeather(data.city);
    });
}

function getWeather(city) {
    var api = "http://api.openweathermap.org/data/2.5/weather?lang=ru&q=";
    var units = "&units=metric";
    var appid = "&appid=eb40569be873eddca9a3ad817c1a07fb";
    var $http = api + city + units + appid;
    $.getJSON($http, function(data) {
        console.log(data);
        temp = data.main.temp.toFixed(0);
        status = data.weather[0].description;
        iconId = data.weather[0].id;
        pressure = data.main.pressure ? Math.round(data.main.pressure) : "N/A ";
        humidity = data.main.humidity ? Math.round(data.main.humidity) : "N/A ";
        windSpeed = data.wind.speed ? (data.wind.speed * 3.6).toFixed(0) : "N/A ";
        windDirection = data.wind.deg ? data.wind.deg.toFixed(0) : "N/A ";
        city = data.name;
        country = data.sys.country;
        feelsLike = data.main.feels_like.toFixed(0);
        tempMax = data.main.temp_max.toFixed(0);
        tempMin = data.main.temp_min.toFixed(0);

        var hours = new Date().getHours();
        var dayOrNight = hours > 6 && hours < 22 ? "day" : "night";

        inputTextValue = city + ", " + country;
        $("#location").val(inputTextValue);
        $("#cityName").text(city);
        document.querySelector('.icons').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" >`
        $(".tempMax").text(tempMax + '°C');
        $('.tempMin').text(tempMin + '°C');
        $("#temperature").text(temp);
        $("#feelsLike").text("Ощущается как: " + feelsLike + '°C');
        $("#status").text(status[0].toUpperCase() + status.slice(1));
        $(".pressure").text(pressure + " Па");
        $(".humidity").text(humidity + " %");
        $(".windSpeed").text(windSpeed + " км/ч");
    });
}



function math() {
    temp = Math.round((temp - 32) * 5 / 9 * 10 / 10);
    windSpeed = Math.round(windSpeed * 1.609344 * 10 / 10);
}

function getDate() {
    var d = new Date();
    var date = d.toLocaleDateString();
    $("#date").html(date);
}

function getClock() {
    var d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    $("#time").text(h + ":" + m + ":" + s);
    var t = setTimeout(getClock, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

getDate();
getClock();
getLocation();

window.onkeyup = keyup;
var inputTextValue;

function keyup(e) {
    inputTextValue = e.target.value;
    if (e.keyCode == 13) {
        console.log(inputTextValue);
        if (~inputTextValue.indexOf(",")) inputTextValue = "";
        getWeather(inputTextValue);
    }
}

$(document).ready(function() {
    $("#location").on("click", function() {
        $(this).val("");
        inputTextValue = "";
    });

    $('form').submit(function() {
        if (~inputTextValue.indexOf(",")) inputTextValue = "";
        getWeather(inputTextValue);
        return false;
    });


});