import React from "react";
import { object } from "prop-types";

const WeatherData = ({ city }) => (
	<div>
		<div>
			<p className="weather-desc">
				Current temperature <b>{city.main.temp}</b>
			</p>
		</div>
		<div>
			<p className="weather-desc">{city.weather[0].main} </p>
			<span className="weather-desc desc">{city.weather[0].description}</span>
		</div>
	</div>
);

WeatherData.propTypes = {
	city: object.isRequired
};

export default WeatherData;
