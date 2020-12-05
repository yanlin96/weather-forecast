import axios from "axios";

const API_BASE = "https://api.weatherstack.com/";

export const getWeatherForcast = (city, days, unit) => {
  return axios.get(`${API_BASE}/forecast?access_key=${process.env.access_key}&query=${city}&forecast_days=${days}&units=${unit}`)
};


