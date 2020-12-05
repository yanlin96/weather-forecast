import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WeatherStatus from "./components/WeatherStatus";

const useStyles = makeStyles(() => ({}));

function WeatherInfo() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <input /> search
      </Grid>
      <Grid item md={6} xs={6}>
        hello
      </Grid>
      <Grid item md={6} xs={6}>
        <WeatherStatus />
      </Grid>
      <Grid item xs={12}>
        worl
      </Grid>
    </Grid>
  );
}

export default WeatherInfo;
