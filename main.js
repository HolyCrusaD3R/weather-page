"use strict";

const api = {
    key: "e08c1e996f02503d0ae4589f5acb8e82",
    url: "https://api.openweathermap.org/data/2.5/"
};

const image_api = {
    // curl https://api.unsplash.com/search/photos?query=wanderlust █
    ac_key: "iqDmIgbiXdPcblljioVR3nX2Ue6KucibbYhl1rZ_BV4",
    url: "https://api.unsplash.com/search/photos"
}

const body = document.querySelector("body");
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

    let height = 20;
    let width = 400;
    let i=1;
    let myInterval = setInterval(()=>{
        height++;
        width+=10;
        main.style.minHeight = height.toString() + "vh";
        main.style.maxWidth = width.toString() + "px";  
        i++;
        if(i==30)
        {
            clearInterval(myInterval);
        }
    },5);

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
        //console.log(`${image_api.url}?query=${weather.json().name}&cliend_id=${image_api.ac_key}`);
        /*fetch(`${image_api.url}?query=${weather.json().name}&cliend_id=${image_api.ac_key}`)
        .then(response => {
            return response.json();
        }).then(changeBackground);*/
        return weather.json();
    }).then(displayResults);

}

function displayResults(weather)
{
    //console.log(weather);
    let location = document.querySelector('.location');
    let temp = document.querySelector('.temp');
    let realTemp = parseInt(weather.main.temp);
    let weatherType = document.querySelector('.weather-type'); 
    location.innerText = `${weather.name}, ${weather.sys.country}`;
    temp.innerText = `${realTemp}°C`;
    weatherType.innerText = `${weather.weather[0].main}`;
    changeBackground(weather);
}

function changeBackground(weather)
{
    fetch(`${image_api.url}?query=${weather.name}&client_id=${image_api.ac_key}`)
        .then(response => {
            return response.json();
        })
            .then((response) => {
                console.log(response);
                body.style.backgroundImage = `url(${response.results[response.results.length-1].urls.full})`;
            });
}