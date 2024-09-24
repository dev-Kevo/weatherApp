
const API_KEY = 'bd43fba1cb03f1058c187993a1e7ee02';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

let iconDiv = document.querySelector('#icon');
let descriptionP = document.querySelector('#description');
let main = document.querySelector('#main');
let city = document.querySelector('#city');

const getWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `${baseUrl}?q=${city}&appid=${API_KEY}&units=metric`;

        // make api call 
        fetch(url)
        .then((response) => {
            if (!response.ok) {
                reject(`Error : ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(`Error fetching data ${error}`);
        })
    })
}


getWeather('THika').then(weatherData => {
    console.log('Data found ', weatherData['weather'][0]['main']);
    city.textContent = weatherData['name']
    iconDiv.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weatherData['weather'][0]['icon']}@2x.png" alt="${main}">
    `
    descriptionP.textContent = weatherData['weather'][0]['description']
    main.textContent = weatherData['weather'][0]['main']
}).catch(error => {
    console.log('Error ', error);
})
