const wrapper = document.querySelector('.wrapper'),
  inputPart = wrapper.querySelector('.input-part'),
  infoTxt = inputPart.querySelector('.info-txt'),
  inputField = inputPart.querySelector('input'),
  locationBtn = inputPart.querySelector('button');

let api;

const apiKey = 'e9090fe3f93f30462a1ac5b3eb869818';

inputField.addEventListener('keyup', (e) => {
  if ((e.key == 'Enter') & (inputField.value != '')) {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert('Your browser not suppor geolocation api');
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  fetchData();
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add('error');
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetchData();
}

function fetchData() {
  infoTxt.innerText = 'Getting weather derails...';
  infoTxt.classList.add('pending');
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  infoTxt.classList.replace('pending', 'error');
  if (info.cod === '404') {
    infoTxt.innerText = `${inputField.value} isn't a valid city name.`;
  } else {
    infoTxt.classList.remove('pending', 'error');
    console.log(info);
  }
}
