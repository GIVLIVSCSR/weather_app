import React, { Component } from "react";
import { func } from "prop-types";
import City from "./City";
import axios from "axios";
import api from "../api";
import _ from "lodash";
import { getFromStorage } from "../utils/storage";
import Interval from "./Interval";
import Spark from "./Spark";

const retrieveCities = data => {
	let items = [];
	_.forEach(data, (val, key) => {
		items = items.concat(data[key].data);
	});
	return items;
};

class AddedCities extends Component {
	state = {
		addedCities: []
	};

	componentDidMount() {
		this.setState({ addedCities: getFromStorage("cities") });
	}

	refreshData = () => {
		const cities = getFromStorage("cities").map(city => city.name);
		Promise.all(cities.map(city => api.getCity(city))).then(({ ...data }) => {
			//console.log("AddedCities data has been refreshed", retrieveCities(data));
			this.setState({
				addedCities: retrieveCities(data)
			});
		});
		//.catch(err => console.log(err));
	};

	render() {
		const { addedCities, refresh, counter } = this.state;
		const { addCity, removeCity } = this.props;
		const text =
			"The weather forecast for added cities will be refreshed after";

		return (
			<div className="main-container">
				<nav className="city-nav">
					<h3 className="nav-headline">Added cities</h3>
				</nav>
				{(addedCities.length && (
					<div>
						<Interval counter={60} f={this.refreshData} text={text} />
						<ul>
							{addedCities.length &&
								addedCities.map(item => (
									<City
										key={item.id}
										city={item}
										stored={true}
										addCity={addCity}
										removeCity={removeCity}
									/>
								))}
						</ul>
					</div>
				)) || <span className="notification">No cities has been stored</span>}
			</div>
		);
	}
}

AddedCities.propTypes = {
	addCity: func.isRequired,
	removeCity: func.isRequired
};

export default AddedCities;
