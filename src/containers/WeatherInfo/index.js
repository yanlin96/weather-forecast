import React, { Fragment, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CurrentWeather from "./components/CurrentWeather";
import WeatherStatus from "./components/WeatherStatus";
import WeatherForecast from "./components/WeatherForecast";
import { getWeatherForcast } from "../../apis/weather";

const useStyle = makeStyles({
  root: {
    padding: "20px 20px",
  },
  search: {
    marginBottom: "20px",
  },
  forecast: {
    marginTop: "30px",
  },
});

function WeatherInfo() {
  const [city, setCity] = useState("Melbourne");
  const [unit, setUnit] = useState("m");
  const [date, setDate] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState({});

  const classes = useStyle();

  useEffect(() => {
    getWeatherForcast(city, unit)
      .then(({ data }) => {
        console.log(data);
        const { current, forecast } = data;
        setCurrentWeather(current);
        setForecast(forecast);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city, unit]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.search}>
        <input /> <button>search</button>
      </Grid>
      <Grid item md={8} xs={6}>
        <CurrentWeather
          city={city}
          date={date}
          weather_descriptions={
            currentWeather.weather_descriptions
              ? currentWeather.weather_descriptions[0]
              : ""
          }
          icon={
            currentWeather.weather_icons ? currentWeather.weather_icons[0] : ""
          }
          temp={currentWeather.temperature}
        />
      </Grid>
      <Grid item md={4} xs={6}>
        <WeatherStatus
          humidity={currentWeather.humidity}
          wind_speed={currentWeather.wind_speed}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="space-between" className={classes.forecast}>
          {Object.keys(forecast).map((key) => {
            return (
              <WeatherForecast
                max={forecast[key].maxtemp}
                min={forecast[key].mintemp}
                icon={forecast[key].hourly[0].weather_icons}
                date={key}
              />
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WeatherInfo;
