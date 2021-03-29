import React, { Component } from "react";
import { func, bool, object } from "prop-types";
import { Link } from "react-router-dom";
import { setToStorage, getFromStorage } from "../utils/storage";
import Spark from "./Spark";
import CityCard from "./CityCard";

const styled = { background: "yellow" };

class City extends Component {
	state = {
		added: this.props.stored
	};

	addCity = () => {
		const { added } = this.state;
		if (!added) {
			const { city } = this.props;
			this.props.addCity(city);
			this.setState({ added: true });
		}
	};

	removeCity = () => {
		const { city } = this.props;
		this.props.removeCity(city);
		this.setState({ added: false });
	};

	render() {
		const { added } = this.state;
		const { city, withMap, stored } = this.props;

		return stored ? (
			<li className="city-item">
				<Spark style={styled} afterEach={60000}>
					<CityCard
						city={city}
						withMap={withMap}
						added={added}
						removeCity={this.removeCity}
						addCity={this.addCity}
					/>
				</Spark>
			</li>
		) : (
			<div className="city-item">
				<CityCard
					city={city}
					withMap={withMap}
					added={added}
					removeCity={this.removeCity}
					addCity={this.addCity}
				/>
			</div>
		);
	}
}

City.propTypes = {
	addCity: func.isRequired,
	removeCity: func.isRequired,
	city: object.isRequired,
	stored: bool.isRequired
};

export default City;
