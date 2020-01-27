// Johanna Hedåker: af6196

import React from "react";

// stateless version of the form component
const Form = ({ getWeather }) => (
	<form onSubmit={getWeather}>
		<input id="usr-input" type="text" name="city" placeholder='e.g. "Copenhagen, DK" ...' />
    <button id="search-btn">SEARCH</button>
  </form>
);

export default Form;
