import React, { useEffect, useState, useRef } from "react";
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
  searchButton: {
    marginTop: "5px",
    fontSize: "18px",
    width: "200px",
    color: "white",
    backgroundColor: "rgb(31, 78, 105)",
    borderRadius: "10px",
  },
});

function WeatherInfo() {
  const [defaultCity, setDefaultCity] = useState("Melbourne");
  const [city, setCity] = useState("Melbourne");
  const [unit, setUnit] = useState("m");
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState({});

  // Error control: if API crashed, we should give a reminder for better use
  const [err, setErr] = useState(false);

  // For accessibility consideration
  const [isEditing, setEditing] = useState(false);
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const classes = useStyle();

  useEffect(() => {
    // For accessibility consideration:
    editFieldRef.current.focus();

    // Set Default city as Melbourne
    getWeatherForcast(city, unit)
      .then(({ data }) => {
        if (data.success === false) {
          setErr(true);
          return;
        }
        setErr(false);
        const { current, forecast } = data;
        setCurrentWeather(current);
        setForecast(forecast);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line
  }, [unit, isEditing]);

  // change input value
  const handleChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const searchNewCity = () => {
    getWeatherForcast(city, unit)
      .then(({ data }) => {
        if (data.success === false) {
          setErr(true);
          return;
        }
        setErr(false);
        const { current, forecast } = data;
        setCurrentWeather(current);
        setForecast(forecast);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUnit = () => {
    if (unit === "m") {
      return "ºc";
    } else {
      return "ºF";
    }
  };

  return (
    <Grid
      container
      className={classes.root}
      alignContent="center"
      alignItems="center"
    >
      <Grid item xs={12} className={classes.search}>
        <div>
          <label htmlFor="city-input">Search City</label>
          <input
            id="city-input"
            aria-describedby="city-helper-text"
            value={city}
            onChange={handleChange}
            ref={editFieldRef}
          />
          <span id="city-helper-text"> Please enter a city name </span>
        </div>
        <div style={{ color: "red" }}>
          {" "}
          {err ? <span>Please enter a valid city name</span> : null}{" "}
        </div>
        <div>
          <button
            className={classes.searchButton}
            onClick={() => {
              // error control for empty city to api
              if (city !== "") {
                setDefaultCity(city);
              }
              setEditing(true);
              editFieldRef.current.focus();
              searchNewCity();
            }}
            ref={editButtonRef}
          >
            Search
          </button>
        </div>
        <div>
          <button
            className={classes.searchButton}
            onClick={() => {
              if (unit === "m") {
                setUnit("f");
              } else {
                setUnit("m");
              }
            }}
          >
            {unit === "m" ? "Switch to ºF" : "Switch to ºc"}
          </button>
        </div>
      </Grid>
      <Grid item md={6} xs={6}>
        <CurrentWeather
          city={defaultCity}
          weather_descriptions={
            currentWeather.weather_descriptions
              ? currentWeather.weather_descriptions[0]
              : ""
          }
          icon={
            currentWeather.weather_icons ? currentWeather.weather_icons[0] : ""
          }
          temp={currentWeather.temperature}
          unit={unit}
        />
      </Grid>
      <Grid item md={6} xs={6}>
        <WeatherStatus
          humidity={currentWeather.humidity}
          wind_speed={currentWeather.wind_speed}
          unit={unit}
        />
      </Grid>
      {/* show the next 7 days weather forcast, inculding today */}
      <Grid item xs={12}>
        <Grid container justify="space-between" className={classes.forecast}>
          {Object.keys(forecast).map((key) => {
            return (
              <WeatherForecast
                key={key}
                max={forecast[key].maxtemp + getUnit()}
                min={forecast[key].mintemp + getUnit()}
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
