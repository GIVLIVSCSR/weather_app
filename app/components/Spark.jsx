import React from "react";
import { number, func, object } from "prop-types";
import Switcher from "./Switcher";

const Spark = ({ style, afterEach, children }) => (
	<Switcher afterEach={afterEach}>
		{spark => <div style={spark ? style : null}>{children}</div>}
	</Switcher>
);

Spark.propTypes = {
	children: object.isRequired,
	style: object.isRequired,
	afterEach: number
};

export default Spark;
