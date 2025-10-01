const weatherApi = {
    key: "d5694b0bb70a9608e2b67ce03ae30f7e",
    baseUrl : "https://api.openweathermap.org/data/2.5/weather",
};

const textInput = document.getElementById("input-box");
const btnWeather = document.getElementById("button");

const hTemp = document.getElementById("temp");
const hCity = document.getElementById("city");

const divWeatherBody = document.getElementById("weather-body");
const divErrorMessage = document.getElementById("error-message");

const pDate = document.getElementById("date");
const pMinMax = document.getElementById("min-max");
const pWeather = document.getElementById("weather");
const pHumidity = document.getElementById("humidity")
const pWind = document.getElementById("wind");
const pPressure = document.getElementById("pressure");

textInput.addEventListener("keypress", async(event) =>{
     if(event.key === "Enter"){
         await getWeatherReport(event.target.value);   //need to revise
     }
});
btnWeather.addEventListener("click", async() => {
     getWeatherReport(textInput.value);
     
});

async function getWeatherReport(city){
   try{
        const response= await fetch(
            `${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`
        );
        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        // console.log(data);
        showWeatherReport(data);
        //bootstrap ka concept
        divWeatherBody.classList.remove("d-none");
        divErrorMessage.classList.add("d-none");
   }catch(error){
      console.log(`error:${error}`);
      divWeatherBody.classList.add("d-none");
      divErrorMessage.classList.remove("d-none");
       clearWeatherDisplay();
   }
}

function showWeatherReport(weather){
    hCity.innerText =`${weather.name},${weather.sys.country}`;
    pDate.innerText = formatDate(new Date());
    hTemp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    pMinMax.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C(min)/
    ${Math.ceil(weather.main.temp_max)}&deg;C(max)`;
    pWeather.innerText = `${weather.weather[0].main}`;
    pHumidity.innerText = `${weather.main.humidity}%`;
    pWind.innerText = `${weather.wind.speed} kmph`;
    pPressure.innerText = `${weather.main.pressure} hPa`;

    //background change karenge
    updateBackground(weather.weather[0].main);

}
function formatDate(date){
    const obj = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
     return date.toLocaleDateString(undefined, obj);  //do search
}
function updateBackground(weatherType){
    const background = {
        Clear:"Img/clear.jpeg",
        Clouds:"Img/Clouds.jpeg",
        Haze: "Img/Clouds.jpeg",
        Rain:"Img/Rain.jpeg",
        Thunderstorm : "Img/Thunder.jpeg",
        Sunny: "Img/Sunny.jpeg",
        Snow:"Img/Snow.jpeg",
    };
    document.body.style.backgroundImage=`url(${background[weatherType] || "Img/clear.jpeg"})`;
}
function clearWeatherDisplay(){
    hCity.innerText = "";
    pDate.innerText = "";
    hTemp.innerText= "";
    pMinMax.innerText = "";
    pWeather.innerText = "";
    pHumidity.innerText= "";
    pPressure.innerText = "";
    pWind.innerText ="";
}