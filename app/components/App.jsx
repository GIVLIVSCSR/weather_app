import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import CityWithMap from "./CityWithMap";
import AddedCities from "./AddedCities";
import {
	citiesInStorage,
	getFromStorage,
	setToStorage,
	removeItem
} from "../utils/storage";

const FourOhFour = () => (
	<div className="main-container">
		<h1>404</h1>
		<p>not found</p>
	</div>
);

class App extends Component {
	state = {
		numberOfCities: citiesInStorage()
	};

	addCity = city => {
		const data = getFromStorage("cities");
		const newData = data ? data : [];
		const item = [...newData, city];
		setToStorage("cities", item);
		//console.log("Added to storage", city.name);
		this.setState({ numberOfCities: citiesInStorage() });
	};

	removeCity = city => {
		const data = getFromStorage("cities");
		const newData = data.filter(item => item.name !== city.name);
		newData.length ? setToStorage("cities", newData) : removeItem("cities");
		//console.log("Removed from storage", city.name);
		this.setState({ numberOfCities: citiesInStorage() });
	};

	render() {
		return (
			<div>
				<Header numberOfCities={this.state.numberOfCities} />
				<Switch>
					<Route exact path="/" component={Search} />
					<Route
						path="/city/:name"
						render={props => {
							return (
								<CityWithMap
									params={props.match.params.name}
									addCity={city => this.addCity(city)}
									removeCity={city => this.removeCity(city)}
									citiesInStorage={this.state.numberOfCities}
									{...props}
								/>
							);
						}}
					/>
					<Route
						path="/my-cities"
						render={() => (
							<AddedCities
								addCity={city => this.addCity(city)}
								removeCity={city => this.removeCity(city)}
							/>
						)}
					/>
					<Route component={FourOhFour} />
				</Switch>
			</div>
		);
	}
}

export default App;
