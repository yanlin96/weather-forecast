import axios from "axios";

const API_BASE = "https://api.weatherstack.com/";
const access_key = "2e51f748a9d9a204d0f564e1c0815154";

export const getWeatherForcast = (city, unit) => {
  return axios.get(`${API_BASE}/forecast?access_key=${access_key}&query=${city}&forecast_days=7&hourly=1&interval=24&units=${unit}`)
};


