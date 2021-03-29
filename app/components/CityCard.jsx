import React from "react";
import { object, func, bool } from "prop-types";
import { Link } from "react-router-dom";
import WeatherData from "./WeatherData";

const CityCard = ({ city, withMap, added, removeCity, addCity }) => (
	<div className="city-item-container">
		{withMap ? (
			<h1 className="city-title">{city.name}</h1>
		) : (
			<Link to={`/city/${city.name}`}>
				<h2 className="city-title link">{city.name}</h2>
			</Link>
		)}
		<WeatherData city={city} />
		<br />
		<button
			className={`${added && "city-added-button"} button city-button`}
			onClick={addCity}
		>
			{added ? "Added" : "Add"}
		</button>
		{added && (
			<button
				className="button city-button city-button--remove"
				onClick={removeCity}
			>
				Remove
			</button>
		)}
	</div>
);

CityCard.defaultProps = {
	withMap: false
};

CityCard.propTypes = {
	city: object.isRequired,
	withMap: bool.isRequired,
	addCity: func.isRequired,
	removeCity: func.isRequired,
	added: bool.isRequired
};

export default CityCard;
