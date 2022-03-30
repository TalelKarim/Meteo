let weather = {
 apiKey: "99b6d5c129d75774bf653b46525f6895",

 fetchWeather: function(city){
     fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
     city 
     + "&appid=" +
     this.apiKey )
     .then(response =>{
         if(!response.ok){
             alert("No weather found! ");
             throw new Error("No weaher found" + response.status);
         }
         return response.json();
     })
     .then(data =>{
         this.displayWeather(data);
     })

 },
 
 displayWeather: function(data){
    const {name} = data;
    const {icon, description} = data.weather[0];
    const{temp, humidity} = data.main;
    const {speed} = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.floor(temp - 270) + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " +Math.floor(speed*10) + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    if(name =='Chebba'){
        document.body.style.backgroundImage = "url('images/chebba3.jpg')";
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';

    }
    if(name != "Chebba"){
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    }
     
 },
 
 search: function(){
     this.fetchWeather(document.querySelector("input").value);
 }

};

document.querySelector("button").addEventListener('click',function(){
    weather.search();
});

document.querySelector("input")
.addEventListener('keyup',function(event){
   if(event.key == "Enter"){
       weather.search();
   }
});

weather.fetchWeather("Rome");