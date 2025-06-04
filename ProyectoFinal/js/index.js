document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '82f9ffada0cb4a5fbbc155621250406';
    const ciudad = 'Malaga';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&days=1&aqi=no&alerts=no`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById('resumen-clima');
        const horas = data.forecast.forecastday[0].hour;

      // Filtramos solo las horas que quieres mostrar
        const horasClave = ['00:00', '08:00', '12:00', '18:00'];
        const horasFiltradas = horas.filter(h =>
        horasClave.includes(h.time.split(' ')[1].slice(0, 5))
        );

        horasFiltradas.forEach(hora => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('col-md-3');
        tarjeta.innerHTML = `
            <div class="card h-100 text-center">
            <div class="card-header">${hora.time.split(' ')[1]}</div>
            <div class="card-body">
                <img src="https:${hora.condition.icon}" alt="${hora.condition.text}">
                <p><strong>Temp:</strong> ${hora.temp_c} °C</p>
                <p><strong>Viento:</strong> ${hora.wind_kph} km/h</p>
                <p><strong>Lluvia:</strong> ${hora.chance_of_rain || 0}%</p>
                <p><small>${hora.condition.text}</small></p>
            </div>
            </div>
        `;
        contenedor.appendChild(tarjeta);
        });
    })
    .catch(error => {
        console.error('Error al obtener el clima:', error);
    });
});
