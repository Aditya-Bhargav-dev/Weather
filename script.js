var weatherUrl = "";

function foo(state){
  var selectedValue = state.value;
  weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+selectedValue+"&appid={pasteyourkeyhere}&units=metric";
  makeRequest(weatherUrl);
  
    
}


function makeRequest(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function () {
      if(this.status==200){
        let data =JSON.parse(this.response);
        document.getElementById("loc").innerHTML=data.name;
        document.getElementById("ctemp").innerHTML=data.main.temp;
        document.getElementById("type").innerHTML=data.weather[0].main;
        document.getElementById("wdesc").innerHTML="feels like"+" "+data.main.feels_like+"--";
        document.getElementById("hum").innerHTML="--humidity"+" "+data.main.humidity;
        document.getElementById("img").src="http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
        document.getElementById("img").style.display="block";
      }
      else
      {
        document.getElementById("loc").innerHTML="Oops....!Weather Data not found for this state";
      }
        
 };
}


