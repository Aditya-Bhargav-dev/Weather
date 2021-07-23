var weatherUrl = "";

//function to set state upon selection
function setstate(state) {
  var selectedValue = state.value;
  //change your weather map api key n below url
  weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + selectedValue + "&appid=123c610b9dc7177312e5ab4c1abf7429&units=metric";
  makeRequest(weatherUrl);

}

//function to call and fetch details from api
async function makeRequest(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    updateWeather(data);
  }
  catch (error) {
    document.getElementById("loc").innerHTML = "Oops....!Weather Data not found for this state";
    document.getElementById("ctemp").innerHTML = "";
    document.getElementById("type").innerHTML = "";
    document.getElementById("wdesc").innerHTML = "";
    document.getElementById("hum").innerHTML = "";
    document.getElementById("wind").innerHTML = "";
    let skycons = new Skycons({ "color": "#CCCC00" });
    skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
    skycons.play();
    console.log(error);
  }
}

//function to update weather data
function updateWeather(data) {
  document.getElementById("loc").innerHTML = data.name;
  document.getElementById("ctemp").innerHTML = data.main.temp;
  document.getElementById("type").innerHTML = data.weather[0].main;
  document.getElementById("wdesc").innerHTML = "feels like" + " " + data.main.feels_like + "--";
  document.getElementById("hum").innerHTML = "--humidity" + " " + data.main.humidity;
  document.getElementById("wind").innerHTML = "wind speed" + " " + data.wind.speed;

  //Adding Weather Skycons
  let climatetype = data.weather[0].main;
  setclimatetype(climatetype.toLowerCase());
}


//function to set Skycons based on climate description
function setclimatetype(climate) {
  let skycons = new Skycons({ "color": "#E8A723" });
  if (climate == "clear") {
    skycons.add("icon1", Skycons.CLEAR_DAY);
  }
  else if (climate == "clouds") {
    skycons.add("icon1", Skycons.CLOUDY);
  }
  else if (climate == "drizzle") {
    skycons.add("icon1", Skycons.SLEET);
  }
  else if (climate == "rain") {
    skycons.add("icon1", Skycons.RAIN);
  }
  else if (climate == "snow") {
    skycons.add("icon1", Skycons.SNOW);
  }
  else if (climate == "mist" || climate == "mist" || climate == "smoke") {
    skycons.add("icon1", Skycons.FOG);
  }
  else {
    skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
  }

  skycons.play();

  let skycons1 = new Skycons({ "color": "#CCCC00" });
  skycons1.add("icon2", Skycons.WIND);
  skycons1.play();

}


