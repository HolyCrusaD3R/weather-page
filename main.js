"use strict";

const api = {
    key: "e08c1e996f02503d0ae4589f5acb8e82",
    url: "https://api.openweathermap.org/data/2.5/"
};

const main = document.querySelector(".main");
const search = document.querySelector("#search-box");
search.addEventListener('keypress', setQuery);
var np = true;

function setQuery(e) 
{
    if( e.keyCode === 13 && search.value!=="")
    {
        if(np)
        {
            np = false;
            createElements();
        }
        setResults(search.value);
    }
}

function createElements()
{
    const location = document.createElement('div');
    const temp = document.createElement('div');
    const weatherType = document.createElement('div');

    location.classList.add("location");    
    temp.classList.add("temp");    
    weatherType.classList.add("weather-type");    
    
    main.appendChild(location);
    main.appendChild(temp);
    main.appendChild(weatherType);

}

function setResults(str)
{
    fetch(`${api.url}weather?q=${str}&units=metric&APPID=${api.key}`).then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather)
{
    console.log(weather);
    let location = document.querySelector('.location');
    let temp = document.querySelector('.temp');
    let realTemp = parseInt(weather.main.temp);
    let weatherType = document.querySelector('.weather-type');
    location.innerText = `${weather.name}, ${weather.sys.country}`;
    temp.innerText = `${realTemp}°C`;
    weatherType.innerText = `${weather.weather[0].main}`;
}