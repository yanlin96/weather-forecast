import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  Fragment,
} from "react";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import CurrentWeather from "./components/CurrentWeather";
import WeatherStatus from "./components/WeatherStatus";
import WeatherForecast from "./components/WeatherForecast";
import { getWeatherForcast } from "../../apis/weather";

// css in js: material-ui libray support
const useStyle = makeStyles({
  root: {
    padding: "20px 20px",
  },
  search: {
    marginBottom: "20px",
  },
  input: {
    borderRadius: "10px",
    width: "200px",
    height: "30px",
    outline: "none",
    border: "none",
  },
  forecast: {
    marginTop: "30px",
  },
  searchButton: {
    outline: "none",
    border: "none",
    marginTop: "5px",
    fontSize: "16px",
    width: "200px",
    height: "30px",
    color: "#207cca",
    backgroundColor: "white",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#207cca",
      color: "white",
      cursor: "pointer",
    },
  },
});

function WeatherInfo() {
  const [defaultCity, setDefaultCity] = useState("Melbourne");
  const [city, setCity] = useState("Melbourne");
  const [unit, setUnit] = useState("m");
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [isLoading, setLoading] = useState(true);
  const classes = useStyle();

  // Error control: if API crashed, we should give a reminder for better use
  const [err, setErr] = useState(false);

  // For accessibility consideration
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const fetchData = useCallback(async (city, unit) => {
    console.log("called");
    const data = await getWeatherForcast(city, unit);
    console.log(data);
    if (data.success === false) {
      setErr(true);
      setLoading();
      return;
    }
    setErr(false);
    const { current, forecast } = data;
    setCurrentWeather(current);
    setForecast(forecast);
    setLoading(false);
  }, []);

  // Call api and fetch data
  useEffect(() => {
    fetchData(city, unit);
    // eslint-disable-next-line
  }, [unit]);

  // change input value
  const handleChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  // Unit swith
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
          <label htmlFor="city-input">Please enter a city name </label>
          <input
            className={classes.input}
            data-testid="city-input"
            id="city-input"
            aria-describedby="city-helper-text"
            value={city}
            onChange={handleChange}
            ref={editFieldRef}
          />
          <span id="city-helper-text">(city name）</span>
        </div>
        {/* role="alert" is also for accessibility */}
        <div style={{ color: "red" }} role="alert">
          {" "}
          {err ? <span>Please enter a valid city name</span> : null}{" "}
        </div>
        <div>
          <button
            data-testid="city-search"
            className={classes.searchButton}
            onClick={() => {
              // error control for empty city to api
              if (city !== "") {
                setDefaultCity(city);
              }
              editFieldRef.current.focus();
              fetchData(city, unit);
            }}
            ref={editButtonRef}
          >
            Search
          </button>
        </div>
      </Grid>

      {/* Loading for current, */}
      {isLoading ? (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      ) : (
        <Fragment>
          <Grid item md={6} xs={6}>
            <CurrentWeather
              city={defaultCity}
              weather_descriptions={
                currentWeather.weather_descriptions
                  ? currentWeather.weather_descriptions[0]
                  : ""
              }
              icon={
                currentWeather.weather_icons
                  ? currentWeather.weather_icons[0]
                  : ""
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
            <Grid
              container
              justify="space-between"
              className={classes.forecast}
            >
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
        </Fragment>
      )}
      <div>
        <button
          data-testid="unit-switch"
          className={classes.searchButton}
          onClick={() => {
            if (unit === "m") {
              setUnit("f");
            } else {
              setUnit("m");
            }
            editFieldRef.current.focus();
          }}
        >
          {unit === "m" ? "Switch to ºF" : "Switch to ºc"}
        </button>
      </div>
    </Grid>
  );
}

export default React.memo(WeatherInfo);
