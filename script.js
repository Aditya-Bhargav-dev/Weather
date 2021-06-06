var weatherUrl = "";

//function to set state upon selection
function setstate(state){
  var selectedValue = state.value;
  weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+selectedValue+"&appid=123c610b9dc7177312e5ab4c1abf7429&units=metric";
  makeRequest(weatherUrl);
    
}

//function to call and fetch details from api
function makeRequest(url) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.send();
      xhr.onload = function () {
      if(this.status==200)
      {
        let data =JSON.parse(this.response);
        document.getElementById("loc").innerHTML=data.name;
        document.getElementById("ctemp").innerHTML=data.main.temp;
        document.getElementById("type").innerHTML=data.weather[0].main;
        document.getElementById("wdesc").innerHTML="feels like"+" "+data.main.feels_like+"--";
        document.getElementById("hum").innerHTML="--humidity"+" "+data.main.humidity;
        document.getElementById("wind").innerHTML="wind speed"+" "+data.wind.speed;
        
        //Adding Weather Skycons
        let climatetype = data.weather[0].main;
        setclimatetype(climatetype.toLowerCase());        
      }
      else
      {
        document.getElementById("loc").innerHTML="Oops....!Weather Data not found for this state";
        let skycons = new Skycons({"color": "#CCCC00"});
        skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
        skycons.play();
      }
        
 };
}

//function to set Skycons based on climate description
function setclimatetype(climate)
{
  let skycons = new Skycons({"color": "#E8A723"});
  if(climate=="clear")
  {
    skycons.add("icon1", Skycons.CLEAR_DAY);    
  }
  else if(climate=="clouds")
  {
    skycons.add("icon1", Skycons.CLOUDY);    
  }
  else if(climate=="drizzle")
  {
    skycons.add("icon1", Skycons.SLEET);    
  }
  else if(climate=="rain")
  {
    skycons.add("icon1", Skycons.RAIN);    
  }
  else if(climate=="snow")
  {
    skycons.add("icon1", Skycons.SNOW);    
  }
  else if(climate=="mist" || climate=="mist" || climate=="smoke" )
  {
    skycons.add("icon1", Skycons.FOG);    
  }
  else 
  {
    skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);    
  }
  
  skycons.play();

  let skycons1 = new Skycons({"color": "#CCCC00"});
  skycons1.add("icon2", Skycons.WIND);
  skycons1.play();
  
}


