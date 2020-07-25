const weatherForm = document.getElementById("weather-form");
const forecastUi = document.getElementById("forecast-result");
document.addEventListener("DOMContentLoaded", init);

function init(){
    setWeatherForm()
}

function setWeatherForm(){
    weatherForm && weatherForm.addEventListener("submit",handleWeatherFormSubmit);
}

function handleWeatherFormSubmit(event){
    const place = this.place.value;
    event.preventDefault();
    if(!place){
        setErrorMessage("Please provide a place");
    }
    setLoadingState();
    fetch(`/weather?address=${place}`)
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                return setErrorMessage(data.error)
            }
            
            setForecastState(data)
        })
        .catch(err=>console.log("error", err))
}


function setErrorMessage(msg){
    const html = `<p class="error">${msg}</p>`
    forecastUi.innerHTML= html;
}

function setLoadingState(){
    const html = `<p>Loading....</p>`
    forecastUi.innerHTML = html;
}

function setForecastState(data){
    const {location,temperature,summary} = data;
    const html = `<h3>Location: ${location}</h3><p>${summary}</p><p><strong>Temperature: ${temperature} celcius</strong></p>`
    forecastUi.innerHTML = html;
}