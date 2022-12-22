const wrapper = document.querySelector('.wrapper'),
  inputPart = wrapper.querySelector('.input-part'),
  infoTxt = inputPart.querySelector('.info-txt'),
  inputField = inputPart.querySelector('input');

const apiKey = 'e9090fe3f93f30462a1ac5b3eb869818';
console.log(apiKey);

inputField.addEventListener('keyup', (e) => {
  if ((e.key == 'Enter') & (inputField.value != '')) {
    requestApi(inputField.value);
  }
});

function requestApi(city) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(api).then((response) => console.log(response.json()));
}
