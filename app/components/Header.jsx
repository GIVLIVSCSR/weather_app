import React from "react";
import { Link } from "react-router-dom";
import { number } from "prop-types";

const styleHeader = {
	height: "46px"
};

const Header = ({ numberOfCities }) => (
	<div className="header">
		<div className="header-container">
			<Link className="h--link link" to="/">
				Home
			</Link>
			<Link className="h--link link" to="/my-cities">
				<span>Added cities</span>
				<div className="counter-background">
					<span className="counter-number">{numberOfCities}</span>
				</div>
			</Link>
		</div>
	</div>
);

Header.propTypes = {
	numberOfCities: number.isRequired
};

export default Header;
