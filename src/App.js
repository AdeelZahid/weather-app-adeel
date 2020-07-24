import React from "react";
import Axios from "axios";
import DisplayWeather from "./components/DisplayWeather";
import Navbar from "./components/Navbar";
import "./App.css";

class App extends React.Component {
  //state
  state = {
    coords: {
      latitude: 31.3976598,
      longitude: 73.1320449
    },
    weather: {},
    inputData: "",
  };

  componentDidMount() {
    // get device location

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({ coords: newCoords });

        Axios.get(
          `http://api.weatherstack.com/current?access_key=55b1ea0965849941a2b1fa55a72f9698&query=
      ${this.state.coords.latitude},${this.state.coords.longitude}`
        ).then((res, rej) => {
          let useWeather = {
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons,
          };
          this.setState({ weather: useWeather });
        });
      });
    } else {
      console.log("Not supported");
    }
  }

  change = (value) => {
    this.setState({ inputData: value });
  };
  changeWeather = (event) => {
    event.preventDefault();
    console.log(this.state.inputData);
    Axios.get(
      `http://api.weatherstack.com/current?access_key=55b1ea0965849941a2b1fa55a72f9698&query=${this.state.inputData}`
    ).then((res) => {
      try {
        if (res) {
          let useWeather = {
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons,
          };
          this.setState({ weather: useWeather });
        }
      } catch (error) {
        console.log(res.data.error.type);
        alert("City Not Found .. ");
      }
    });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Navbar
            changeWeather={this.changeWeather}
            changeRegion={this.change}
          />
          <DisplayWeather weatherData={this.state.weather} />
        </div>
      </div>
    );
  }
}

export default App;
