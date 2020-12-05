import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


function CurrentWeather(props) {
  return (
    <Grid container>
      <Grid item xs={12} >
        <Grid container justify="flex-start" spacing={2}>
          <Grid item>
          {props.city}
          </Grid>
        </Grid>
      
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item>
          Date: {props.date} 
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item>
          {props.weather_descriptions} 
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item>
            <img src={props.icon} alt="icon" style={{backgroundColor: '#1f4e69'}}/> 
            {props.temp}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CurrentWeather;
