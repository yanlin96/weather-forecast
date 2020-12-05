import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function WeatherForecast(props) {
  return (
    <Grid item xs={4}>
      <p>{props.date}</p>

      <img src={props.icon} alt="icon" />

      <p>
        {Math.trunc(props.max)} ºc {Math.trunc(props.min)} ºc
      </p>
    </Grid>
  );
}

export default WeatherForecast;
