function getWeather(){
    const api_key = '9824a963c0daae575b76b97a96124860';
    const city = document.getElementById('city').value;

    if(!city){
        alert('Please enter a city');
        return
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;

    fetch(currentWeatherUrl) 
        .then(response=> response.json())
        .then(data => {
            displayWeather(data);
            console.log(data);
        })
        .catch(error=>{
            console.error('error fetching current weather data', error);
            alert('error fetching current weather data. Please try again' );
        });

    fetch(forcastUrl) 
    .then(response=> response.json())
    .then(data => {
        console.log('Full response:', data); // Log the full response
        if (data && data.list) {
            displayHourlyForecast(data.list);
        } else {
            throw new Error('Unexpected data format');
        }
    })
    .catch(error=>{
        console.error('error fetching hourly forcast data', error);
        alert('error fetching t hourly forcast data. Please try again' );
    });
}
function displayWeather(data)
{
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forcast');
    
    //clear previous content
    weatherInfoDiv.innerHTML=''
    hourlyForecastDiv.innerHTML=''
    tempDivInfo.innerHTML=''
    weatherIcon.innerHTML=''

    //check response
    if(data.cod == 404){
        weatherInfoDiv.innerHTML = `<p> ${data.message} </p>`;
    }else{
        hourlyForecastDiv.style.display="flex"
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p> ${temperature} °C</p>`;

        const weatherHTML = `
        <p>${cityName}</p>
        <p>${description} </p>
        `;
        tempDivInfo.innerHTML=temperatureHTML;
        weatherInfoDiv.innerHTML=weatherHTML;
        weatherIcon.src=iconUrl;
        weatherIcon.alt=description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData)
{
    const hourlyForecastDiv = document.getElementById('hourly-forcast');
    const next24hours = hourlyData.slice(0,8);
    console.log(next24hours);
    next24hours.forEach(item =>{
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
        <div id="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C </span>
        </div>
        `;
        hourlyForecastDiv.innerHTML+=hourlyItemHtml
    })
}
function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display="block"
}