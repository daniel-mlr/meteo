// default unit system is metric
var metric = true;

// options to be passed to navigator.geolocation.getCurrentPosition
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    // success callback for navigator.geolocation.getCurrentPosition
    var crd = pos.coords;
    $("#actualLon").html(Math.round(crd.longitude * 1000) / 1000);
    $("#actualLat").html(Math.round(crd.latitude * 1000) / 1000);
    $("#accuracy").html("More or less " + 
            Math.round(crd.accuracy * ( metric ? 1: 3.28084)) +
            (metric ? " meters": " feet")
            );
    getMeteo(crd.latitude, crd.longitude, metric);
}

function error(err) {
    // error callback for navigator.geolocation.getCurrentPosition
    alert("There was a problem getting current geolocation");
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

function checkMetric(checkbox) {
    // check if the unit choosing button have been clicked
    if (checkbox.checked === false)
    {
        metric = false;
    } else {
        metric = true;
    }
    // executes when the unit system is changed
    showSystemChooser(metric);
    // navigator.geolocation.getCurrentPosition(success, error, options);
    getIpGeoLocation();
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
    //console.log(apiUrl + lat + lon + units + appKey)
    $.getJSON(apiUrl + lat + lon + units + appKey, displayResult); 
}
    

function showSystemChooser(metric) {
    // messages displayed in the unit chooser box
    var text1 = "In line with the entire world minus 3 countries, this app uses the "; 
    var text2 = "system. Click if you live in one of those countries: Myanmar, Liberia, USA.";
    if (!metric) {
        text1 = "You have chosen to view this app in the ancient, non-standard";
        text2 = "system. We encourage you to adopt international standards.";
    }

    $("#text1").html(text1);
    $("#text2").html(text2);
}

// executes when the page loads
showSystemChooser(metric);
// navigator.geolocation.getCurrentPosition(success, error, options);
getIpGeoLocation();

function displayResult(json) {
    //$(".message").html(JSON.stringify(json));
    $("#icon").attr("src", iconName(json.weather[0].icon));
    //$("#icon").attr("src", iconName("10n"));
    $("#icon").attr("alt", json.weather[0].description);
    $("#temp").html(json.main.temp + "&#176;" + (metric ? " C" : " F"));
    $("#description").html(json.weather[0].description);
    $("#humidity").html(json.main.humidity + "%");
    $("#pressure").html(json.main.pressure + " hPa");
    $("#wind_speed").html(json.wind.speed + (metric ? " m/sec" : " mph"));
    $("#wind_deg").html(json.wind.deg + "&#176;");
    $("#sunrise").html(humanHour(json.sys.sunrise, metric));
    $("#sunset").html(humanHour(json.sys.sunset, metric));
    $(".ctry_code").html(json.sys.country);
    $(".city").html(json.name);
    // correction de la couleur de fond des icones de nuit
    if (json.weather[0].icon[2] == "n") {
        $("body").css("background", "#070506");
    }
}
  
function humanHour(utc, metric) {
    var timestamp = utc,
    date = new Date(timestamp * 1000);
    var hr = date.getHours();
    var min = date.getMinutes();

    if (metric) {
        return hr + ":" + min;
    } else {
        if (hr > 11) {
            return (hr - 12) + "h " + min + " pm";
        } else {
            return hr + "h " + min + " am";
        }
    }
}

function iconName(icon_code) {
    switch (icon_code) {
        case "01d": 
            return "img/soleil.jpg";
            // break;
        case "02d": 
            return "img/soleil_nuage_leger.jpg";
            // break;
        case "03d": 
            return "img/soleil_nuage_moyen.jpg";
            // break;
        case "04d": 
            return "img/nuage.jpg";
            // break;
        case "09d": 
            return "img/averse.jpg";
            // break;
        case "10d": 
            return "img/soleil_pluie.jpg";
            // break;
        case "11d": 
            return "img/orage.jpg";
            // break;
        case "13d": 
            return "img/nuage_neige.jpg";
            // break;
        case "50d": 
            return "img/smog.png";
            // break;
        case "01n": 
            return "img/lune_nouvelle.jpg";
            // break;
        case "02n": 
            return "img/lune_nouvelle_nuage.jpg";
            // break;
        case "03n": 
            return "img/lune_pleine_nuage.jpg";
            // break;
        case "04n": 
            return "img/nuage.jpg";
            // break;
        case "09n": 
            return "img/averse.jpg";
            // break;
        case "10n": 
            return "img/lune_pluie.jpg";
            // break;
        case "11n": 
            return "img/lune_orage.jpg";
            // break;
        case "13n": 
            return "img/nuage_neige.jpg";
            // break;
        case "50n": 
            return "img/smog.png";
            // break;
    }
}

function getIpGeoLocation() {
  var apiURL = "http://ip-api.com/json";
  $.getJSON(apiURL, function(pos){
     // success callback for navigator.geolocation.getCurrentPosition
     // var crd = pos.coords;
  $("#actualLon").html(Math.round(pos.lon * 1000) / 1000);
  $("#actualLat").html(Math.round(pos.lat * 1000) / 1000);
  
  getMeteo(pos.lat, pos.lon, metric);
  });
}
