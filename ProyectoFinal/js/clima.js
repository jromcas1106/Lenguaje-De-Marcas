const API_KEY = '82f9ffada0cb4a5fbbc155621250406';
const selector = document.getElementById('selector-ciudad');
const datosHoy = document.getElementById('datos-hoy');
const proximosDias = document.getElementById('proximos-dias');
const alertasDiv = document.getElementById('alertas');

const horasObjetivo = ['00:00', '08:00', '12:00', '18:00'];

function obtenerClima(ciudad) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ciudad}&days=5&aqi=no&alerts=yes&lang=es`)
    .then(response => response.json())
    .then(data => {
        mostrarClimaHoy(data.forecast.forecastday[0].hour);
        mostrarProximosDias(data.forecast.forecastday);
        mostrarAlertas(data.alerts.alert);
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}

function mostrarClimaHoy(horas) {
    datosHoy.innerHTML = '';
    horasObjetivo.forEach(horaClave => {
    const datoHora = horas.find(h => h.time.endsWith(horaClave));
    if (datoHora) {
        const card = document.createElement('div');
        card.className = 'col-md-3';
        card.innerHTML = `
        <div class="card text-center mb-3">
            <div class="card-body">
            <h5 class="card-title">${horaClave}</h5>
            <img src="${datoHora.condition.icon}" alt="${datoHora.condition.text}">
            <p class="card-text"> ${datoHora.temp_c}°C</p>
            <p class="card-text"> Viento: ${datoHora.wind_kph} km/h</p>
            <p class="card-text"> Precipitación: ${datoHora.chance_of_rain || 0}%</p>
            </div>
        </div>
        `;
        datosHoy.appendChild(card);
    }
    });
}

function mostrarProximosDias(dias) {
    proximosDias.innerHTML = '';
    dias.forEach(dia => {
    const card = document.createElement('div');
    card.className = 'col-md-2';
    card.innerHTML = `
        <div class="card text-center mb-3">
        <div class="card-body">
            <h5 class="card-title">${dia.date}</h5>
            <img src="${dia.day.condition.icon}" alt="${dia.day.condition.text}">
            <p class="card-text"> Máx: ${dia.day.maxtemp_c}°C</p>
            <p class="card-text"> Mín: ${dia.day.mintemp_c}°C</p>
            <p class="card-text"> Viento: ${dia.day.maxwind_kph} km/h</p>
            <p class="card-text"> Precipitación: ${dia.day.daily_chance_of_rain}%</p>
        </div>
        </div>
    `;
    proximosDias.appendChild(card);
    });
}

function mostrarAlertas(alertas) {
    alertasDiv.innerHTML = '';
    if (alertas && alertas.length > 0) {
    alertas.forEach(alerta => {
        const alertaDiv = document.createElement('div');
        alertaDiv.className = 'alert alert-warning';
        alertaDiv.innerHTML = `<strong>${alerta.headline}</strong><br>${alerta.desc}`;
        alertasDiv.appendChild(alertaDiv);
    });
    } else {
    alertasDiv.innerHTML = '<p>No hay alertas meteorológicas para esta ubicación.</p>';
    }
}

// Evento al cambiar ciudad
selector.addEventListener('change', () => {
    obtenerClima(selector.value);
});

// Cargar clima inicial al abrir página
document.addEventListener('DOMContentLoaded', () => {
    obtenerClima(selector.value);
});
