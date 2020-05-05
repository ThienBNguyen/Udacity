document.getElementById('generate').addEventListener('click', performAction);

function showDate() {
  let d = new Date();

  let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
  let currentTime = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  document.getElementById('myDate').innerText = newDate;
  document.getElementById('myClockDisplay').innerText = currentTime;
  setTimeout(showDate, 1000);
}
showDate();

function performAction(e) {
  const newZip = document.getElementById('zip').value;
  const variable = 'appid=e0604f545d00a9a660bde7c8ac49458a';

  getData();
  getWeather(newZip, variable);
}
const getWeather = async (zipCode, key) => {
  let baseURl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&${key}`;
  const res = await fetch(baseURl);

  try {
    const weatherData = await res.json();
    // console.log(weatherData.weather[0].main);
    // console.log(weatherData.main.temp);
    // document.getElementById('temp').innerHTML = Math.floor(newTemp) + 'F';
    let newTemp = (weatherData.main.temp - 273.15) * (9 / 5) + 32;

    const emotion = document.getElementById('feelings').value;

    let Data = { newTemp, emotion };

    const options = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    };
    const response = await fetch('/api', options);
    const apiDate = await response.json();
    console.log(apiDate);
  } catch (error) {
    console.log('error', error);
  }
};

async function getData() {
  const getResponse = await fetch('/api');
  const getData = await getResponse.json();
  console.log(getData);
  for (item of getData) {
    const entryHolder = document.getElementById('entryHolder');
    const root = document.createElement('div');
    const mood = document.createElement('div');
    mood.setAttribute('id', 'content');
    const temp = document.createElement('div');
    temp.setAttribute('id', 'temp');
    const date = document.createElement('div');
    date.setAttribute('id', 'date');
    mood.textContent = ` mood: ${item.emotion}`;
    temp.textContent = `${Math.floor(item.newTemp)} F`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    root.append(mood, temp, date);
    entryHolder.append(root);
  }

  console.log(getData);
}
