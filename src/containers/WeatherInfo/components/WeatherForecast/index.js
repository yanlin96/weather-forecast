import { Grid } from "@material-ui/core";
import React from "react";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function WeatherForecast(props) {
  return (
    <Grid item xs={4} sm={4} md={1}>
      <p>{days[new Date(props.date).getDay()]}</p>

      <img src={props.icon} alt="icon" />

      <p>
        {props.max} {props.min}
      </p>
    </Grid>
  );
}

export default React.memo(WeatherForecast);
