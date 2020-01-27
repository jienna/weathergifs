// Johanna Hedåker: af6196

import React from "react";

// component for display of weather values from the openweathermap API
class Weather extends React.Component {
  render() {
    return (
      <div>
        {/* conditions below mean that contents of <p>-tagg will shown only if statements are returned as true, i.e. they are hidden if no call has been made */}
        {
         this.props.city && this.props.country && <p className="weather__key"> Location:
           <span className="weather__value"> { this.props.city }, { this.props.country }</span>
         </p>
        }
        {
         this.props.temperature && <p className="weather__key"> Temperature:
           <span className="weather__value"> { this.props.temperature }	</span> C
         </p>
        }
        {
         this.props.humidity && <p className="weather__key"> Humidity:
           <span className="weather__value"> { this.props.humidity } </span> %
         </p>
        }
        {
         this.props.description && <p className="weather__key"> Conditions:
           <span className="weather__value"> { this.props.description } </span>
        </p>
        }
        {
         this.props.error && <p className="weather__error">{ this.props.error }</p>
        }
      </div>
    );
  }
};

export default Weather;
