import { Grid } from "@material-ui/core";

function WeatherStatus(props) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item>Humidity: {props.humidity} %</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item>
            Wind: {props.wind_speed}{" "}
            {props.unit === "m" ? "km/h" : "Miles/Hour"}{" "}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default WeatherStatus;
