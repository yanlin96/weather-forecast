import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


function WeatherStatus(props) {
 return (
   <Grid container>
     <Grid item xs={12} >
       <Grid container justify="flex-start" spacing={2}>
         <Grid item>
         Humidity: {props.humidity} %
         </Grid>
       </Grid>
     
     </Grid>
     <Grid item xs={12}>
       <Grid container justify="flex-start" spacing={2}>
         <Grid item>
         Wind: {props.wind_speed} 
         </Grid>
       </Grid>
     
     </Grid>
     <Grid item xs={12}>
     </Grid>
   </Grid>
 )
}

export default WeatherStatus