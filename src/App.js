// Johanna Hedåker: af6196

import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

// API keys
const API_KEY = "1fd70a7e83872df79687ced7d13b7187";
const GIPHY_KEY = "1eFTgRYa2FTkYDzV5arhiEOlSkPPer1L";

class App extends React.Component {

  //initial state of the object (which changes upon user action)
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    gifUrl: undefined,
  }

// Giphy
  getGiphy = async (description) => {

    // call to Giphy API asking for data (object) based on set parameters
    const api_call = await fetch(`https://api.giphy.com/v1/gifs/search?q=${description}&api_key=${GIPHY_KEY}`);

    // converts api call to json format and assigns it to a constant called data
    const data = await api_call.json();

    // randomizes what gif is displayed
    const random = Math.floor(data.data.length *  Math.random());

    // sets new state of gifUrl to received gif from object (from the API)
    this.setState({
      gifUrl: data.data[random].images.original.url,
    })
  }

// OpenWeatherMap
  getWeather = async (e) => {
    // prevents default action (reloading page) upon submitting the form
    e.preventDefault();

    const city = e.target.elements.city.value;

    // call to OWM API asking for data (object) based on set parameters
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    // converts api call to json format and assigns it to a constant called data
    const data = await api_call.json();

    /* if an API call was successfully made (code 200), the if statement below runs function getGiphy (see: elseif) which makes a nestled API-call to the giphy API, which replies with a gif based on the weather conditions from the weather-data (which is known as 'description' in the object) */

    // error handling
    if (data.cod === "404"){
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: data.message,
        gifUrl: undefined,
      });
    // if everything is ok
    } else if (data.cod === 200) {
      this.getGiphy(data.weather[0].description);

      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    // error handling
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values."
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="title-container">
            <Titles />
        </div>

        <div className="form-container">
          {/* sets up a prop and sets its value to the getWeather function */}
          <Form getWeather={this.getWeather}
          />
            {/* allows weather.js to access and update (copied, never original) state */}
        </div>
        <div className="weather-container">
              <Weather
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
              />
        </div>
        <div className="gif-container">
          {/* displays gif-data if a search was made, otherwise displays default gif */}
          <img src={this.state.gifUrl || "https://media3.giphy.com/media/l0HlDlnsxChCn5WdG/giphy.gif?cid=790b76111de9073eb1a08204302bc719329a7d0e4c168274&rid=giphy.gif"} alt="gif"/>
        </div>
      </div>
    );
  }
};

export default App;
