import WeatherInfo from "./containers/WeatherInfo";
import "./App.css";

function App() {
  return (
    <div role="main" className="App">
      <h1 data-testid="greeting">Weather Forecast</h1>
      <WeatherInfo />
    </div>
  );
}

export default App;
