const key = "";   //use your openweathermap.org api key here
const wrapper = document.querySelector(".wrapper"),
      inputPart = document.querySelector(".input-part "),
      infoTxt = document.querySelector(".input-txt"),
      locationBtn = document.querySelector("button"),
      arrowBack = document.querySelector(".fa-arrow-left"),
      wIcon = document.querySelector(".weather-part img"),
      inputField = document.querySelector("input");


inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

function requestApi(city){
   
    let api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    fetchData(api);
}
function fetchData(api) {
    infoTxt.innerText = "Getting weather deatils";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

locationBtn.addEventListener("click", ( ) => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
         alert("your browser does not support geolocation api");
    }
});

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}
function onSuccess(position){
    console.log(position)
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let api =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    fetchData(api); 
}

arrowBack.addEventListener("click",() => {
    console.log("ajfkjafk")
    wrapper.classList.remove("activate");

})

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.innerText = `${inputField.value} not a valid name`;
        infoTxt.classList.remove("pending");
        infoTxt.classList.add("error");
    }else{
        const city = info.name;
        const country = info.sys.country;
        const description = info.weather[0].description;
        const id = info.weather[0].id;
        const feels_like = info.main.feels_like;
        const humidity = info.main.humidity;
        const temp = info.main.temp;
        console.log(id)
        console.log(wIcon)
        if(id==800){
            wIcon.src ="./sunny.png";
        }else if(id >= 200 && id <= 232){
            wIcon.src ="./storm-2.png";
        }else if(id >= 600 && id <= 622){
            wIcon.src =" ./snowy.png";
        }else if(id >= 701 && id <= 781){
            wIcon.src =" ./windy.png";
        }else if(id >= 801 && id <= 804){
            wIcon.src =" ./cloudy.png";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wIcon.src ="./cloudy-2.png";
        }

        wrapper.querySelector(".temp .numb").innerText = temp;
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".feelslikenumb").innerText = feels_like;
        wrapper.querySelector(".humidnumb").innerText = `${humidity}%`;


        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("activate");
        console.log(info);

    }
   
}
