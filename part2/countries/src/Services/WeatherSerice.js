import axios from "axios"

const get = (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY

    const request = axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`)
    return request.then(response => {
        const rawData = response.data['data'][0]
        return {
            "temp": rawData['temp'],
            "wind": `${rawData['wind_spd']} ${rawData['wind_cdir']}`,
            "icon": `https://cdn.weatherbit.io/static/img/icons/${rawData["weather"]["icon"]}.png`,
            "description": rawData["weather"]["description"]
        }
    })
}

export default {get}