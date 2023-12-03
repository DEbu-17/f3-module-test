let iframe = document.getElementById("iframe");
iframe.style.border = "none";
let mainContainer = document.querySelector(".main-container");
const bottomContainer = document.getElementById("landBottum");
let newSection = document.querySelector(".new-section");

let url = null;
let url1= null;
let apiKey = "9b3f3a2c5add0b642059fd088d5e7d64";

let longitude = null;
let latitude = null;

const lat = document.getElementById("lat");
const long = document.getElementById("long");
function myLocation() {
  mainContainer.classList.add("hide");
  newSection.classList.remove("hide");
  bottomContainer.classList.remove("hide");

  let success = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    lat.innerText = `Lat: ${latitude}`;
    long.innerText = `Long: ${longitude}`;
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  
    iframe.setAttribute(
      "src",
      "https://maps.google.com/maps?" +
        `q=${latitude}, ${longitude}` +
        "&output=embed"
    );
    
      checkWeatherData();
    iframe.style.height = "80vh";
    iframe.style.width = "100%";
  };
  const error = () => {
    console.log("err");
  };

  navigator.geolocation.getCurrentPosition(success, error);
}

const fetchBtn = document.querySelector(".btn");

fetchBtn.addEventListener("click", myLocation);



async function checkWeatherData() {
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
  document.getElementById("dateName").innerText = data.name;
  document.getElementById("wind").innerText = data.wind.speed;
  document.getElementById("humidity").innerText = data.main.humidity;
  document.getElementById("pressure").innerText = data.main.pressure;
  document.getElementById("feels").innerText = data.main.feels_like;
  
  document.getElementById("uv").innerText = data.cod;
}
  