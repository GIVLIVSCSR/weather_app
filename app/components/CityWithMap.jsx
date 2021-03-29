import React, { Component } from "react";
import { func, string } from "prop-types";
import City from "./City";
import Chart from "./Map/Chart";
import Interval from "./Interval";
import { inStorage } from "../utils/storage";
import api from "../api";

const styled = { background: "lightblue" };

class CityWithMap extends Component {
	state = {
		city: null,
		stored: false
	};

	componentDidMount() {
		this.timeout = setTimeout(() => this.cityService(), 1000);
	}

	cityService = () => {
		const { city, status } = inStorage("cities", this.props.params);
		this.setState({ city: city, stored: status });
	};

	componentDidUpdate(prevProps, prevState) {
		if (!this.state.city) this.getData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.citiesInStorage > this.props.citiesInStorage)
			this.setState({ stored: true });
		if (nextProps.citiesInStorage < this.props.citiesInStorage)
			this.setState({ stored: false });
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	getData = () => {
		api
			.getCity(this.props.params)
			.then(({ data }) => {
				//console.log("CityWithMap data has been refreshed", data);
				this.setState({ city: data });
			})
			.catch(err => {
				this.props.history.push("/404");
			});
	};

	render() {
		const { city, stored } = this.state;
		const { addCity, removeCity } = this.props;

		return (
			(city && (
				<div className="main-container">
					<Chart
						lat={parseFloat(city.coord.lat)}
						lng={parseFloat(city.coord.lon)}
					/>
					{stored && (
						<Interval
							counter={60}
							f={this.getData}
							text={`The ${city.name} weather forecast will be refreshed after`}
						/>
					)}
					<City
						city={city}
						stored={stored}
						addCity={addCity}
						removeCity={removeCity}
						withMap={true}
					/>
				</div>
			)) ||
			null
		);
	}
}

CityWithMap.propTypes = {
	addCity: func.isRequired,
	removeCity: func.isRequired,
	params: string.isRequired
};

export default CityWithMap;
