// script.js

document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    const apiKey = '7c74791e7b7c498f8b5181825243108';  // Tu clave de API
    const countryCode = 'DO';  // Código de país para República Dominicana

    if (city) {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)},${countryCode}&lang=es&aqi=no`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.location.country === 'Dominican Republic') {
                    const weatherInfo = `
                        <h2>${data.location.name}, ${data.location.country}</h2>
                        <p>Temperatura: ${data.current.temp_c} °C</p>
                        <p>Clima: ${data.current.condition.text}</p>
                        <p>Humedad: ${data.current.humidity}%</p>
                        <p>Velocidad del Viento: ${data.current.wind_kph} km/h</p>
                    `;
                    document.getElementById('weather-info').innerHTML = weatherInfo;
                } else {
                    document.getElementById('weather-info').innerHTML = `<p>Error: Coloca el nombre de la ciudad o provincia completo.</p>`;
                }
            })
            .catch(error => {
                document.getElementById('weather-info').innerHTML = `<p>Error: ${error.message}</p>`;
                console.error('Error:', error);
            });
    } else {
        document.getElementById('weather-info').innerHTML = `<p>Por favor, ingresa el nombre de una ciudad.</p>`;
    }
});

// Función para actualizar el contador
function updateCountdown() {
    const endDate = moment.tz('2024-09-14T00:00:00', 'America/Santo_Domingo'); // Fecha de actualización en la zona horaria de RD
    const now = moment.tz('America/Santo_Domingo'); // Hora actual en la zona horaria de RD
    const duration = moment.duration(endDate.diff(now));

    if (duration.asMilliseconds() <= 0) {
        document.getElementById('countdown').innerHTML = '¡La actualización ya ha ocurrido!';
        return;
    }

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    document.getElementById('countdown').innerHTML = `${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;
}

// Actualiza el contador cada segundo para mayor precisión
setInterval(updateCountdown, 1000);

// Actualiza el contador inmediatamente
updateCountdown();
