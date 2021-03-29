import React, { Component } from "react";
import { func, number, string } from "prop-types";
import Counter from "./Counter";

const Interval = ({ counter, f, text }) => (
	<Counter showTime={counter} f={f}>
		{showTime => (
			<div className="notification">{`${text} ${showTime} seconds`}</div>
		)}
	</Counter>
);

Interval.propTypes = {
	counter: number,
	f: func.isRequired,
	text: string.isRequired
};

export default Interval;
