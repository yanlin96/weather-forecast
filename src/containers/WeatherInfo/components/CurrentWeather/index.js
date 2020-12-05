import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const now = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const day = days[now.getDay()];
const month = months[now.getMonth()];

const useStyle = makeStyles({
  tempWrapper: {
    marginTop: "20px",
  },
  tempFont: {
    fontSize: "48px",
  },
});

function CurrentWeather(props) {
  const classes = useStyle();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item>
            <h2>{props.city}</h2>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item>{day + ", " + month + " " + now.getDate()}</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item>{props.weather_descriptions}</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.tempWrapper}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item>
            <img
              src={props.icon}
              alt="icon"
              style={{ backgroundColor: "#1f4e69" }}
            />
          </Grid>
          <Grid item className={classes.tempFont}>
            {props.temp} {props.unit === "m" ? "ºc" : "ºF"}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CurrentWeather;
