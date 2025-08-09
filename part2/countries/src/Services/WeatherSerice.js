import axios from "axios"

const get = (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY

    const request = axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`)
    return request.then(response => {
        const raw_data = response.data['data'][0]
        return {
            "temp": raw_data['temp'],
            "wind": `${raw_data['wind_spd']} ${raw_data['wind_cdir']}`,
            "icon": `https://cdn.weatherbit.io/static/img/icons/${raw_data["weather"]["icon"]}.png`,
            "description": raw_data["weather"]["description"]
        }
    })
}

export default {get}