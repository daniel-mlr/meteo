var metric = true;
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    $("#actualLon").html("Longitude: " 
            + Math.round(crd.longitude * 1000) / 1000
            + "<br>Latitude: " 
            + Math.round(crd.latitude * 1000) / 1000
            + "<br>More or less " 
            + Math.round(crd.accuracy * ( metric ? 1: 3.28084))
            + (metric ? " meters": " feet")
            );
    getMeteo(crd.latitude, crd.longitude, metric);
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

function checkMetric(checkbox)
{
    if (checkbox.checked==false)
    {
        metric = false;
    } else {
        metric = true;
    }
    // executes when the unit system is changed
    showSystemChooser(metric);
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function getMeteo(latitude, longitude, metric) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?";
    var lat = "lat=" + latitude + "&";
    var lon = "lon=" + longitude + "&";
    var appKey = "appid=baf37919f49115f732bc4e9827fd3d4c";
    var units;
    if (metric) {
        units = "units=metric&";
    } else {
        units = "units=imperial&";
    }
    console.log(apiUrl + lat + lon + units + appKey)
    //$.getJSON(apiUrl + lat + lon + units + appKey, function(json) {
    };

function showSystemChooser(metric) {
    var text1 = "In line with the entire world minus 3 countries, this app uses the "; 
    var text2 = "system. Click if you live in one of those countries: Myanmar, Liberia, USA.";
    if (!metric) {
        text1 = "You have chosen to view this app in the ancient, non-standard";
        text2 = "system. We encourage you to adopt international standards.";
    };

    $("#text1").html(text1);
    $("#text2").html(text2);
};

// executes when the page loads
showSystemChooser(metric);
navigator.geolocation.getCurrentPosition(success, error, options);


   
 /*
function getLocation() {
    if (navigator.geolocation) {
        console.log("geolocation");
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("position coordonnées:" + position.coords.latitude);
            return position.coords;
        });
    };
};
var pos = getLocation();
console.log(pos.latitude);

function getocalWeatherData() {
};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        $("#data").html(
                "latitude: " 
                + position.coords.latitude 
                + "<br>longitude: " 
                + position.coords.longitude
                );
        var apiUrl = "http://api.openweathermap.org/data/2.5/weather?";
        var lat = "lat=" + position.coords.latitude + "&";
        var lon = "lon=" + position.coords.longitude + "&";
        var appKey = "appid=baf37919f49115f732bc4e9827fd3d4c";
        //console.log(apiUrl + lat + lon + appKey);
        $.getJSON(apiUrl + lat + lon + appKey, function(json) {
            $(".message").html(JSON.stringify(json));
            $("#stnLon").html(json.coord.lon);
            $("#stnLat").html(json.coord.lat);
            $("#condId").html(json.weather[0].id);
            $("#weatherMain").html(json.weather[0].main);
            $("#description").html(json.weather[0].description);
            $("#icon").html(json.weather[0].icon);
            $("#base").html(json.base);
            $("#temp").html(json.main.temp);
            $("#tempCelcius").html(json.main.temp - 273.15);
            $("#pressure").html(json.main.pressure);
            $("#humidity").html(json.main.humidity);
            $("#temp_min").html(json.main.temp_min);
            $("#temp_max").html(json.main.temp_max);
            $("#grnd_level").html(json.main.grnd_level);
            $("#wind_speed").html(json.wind.speed);
            $("#wind_deg").html(json.wind.deg);
            $("#cloudiness").html(json.clouds.all);
            $("#rain").html(JSON.stringify(json.rain));
            $("#rain").html(JSON.stringify(json.snow));
            $("#time").html(json.dt);
            $("#sunrise").html(json.sys.sunrise);
            $("#sunset").html(json.sys.sunset);
            $("#ctry_code").html(json.sys.country);
            $("#city_id").html(json.id);
            $("#city").html(json.name);
        });
    });
}
*/
