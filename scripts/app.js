const cityInput = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const { cityDets, weather } = data;

    // Update details template
    details.innerHTML = ` 
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div> 
    `;

    // Update the night/day and icon imgs
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.src = iconSrc;

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.src = timeSrc;

    // Remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key)

    return { cityDets, weather };
};

cityInput.addEventListener('submit', e => {
    e.preventDefault();

    // Get city from user input
    const city = cityInput.city.value.trim();
    cityInput.reset();

    // Update the UI with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});