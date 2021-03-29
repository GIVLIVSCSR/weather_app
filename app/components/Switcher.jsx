import React, { Component } from "react";
import { func, number } from "prop-types";

class Switcher extends Component {
	state = {
		switched: false
	};

	componentDidMount() {
		this.toggle = setInterval(() => this.f(), this.props.afterEach);
	}

	f = () => {
		this.g();
		this.switch = setTimeout(() => this.g(), 1000);
		//console.log(this.state.switched);
	};

	g = () => {
		this.setState({
			switched: !this.state.switched
		});
	};

	componentWillUnmount() {
		clearInterval(this.toggle);
		clearTimeout(this.switch);
	}

	render() {
		return <div>{this.props.children(this.state.switched)}</div>;
	}
}

Switcher.defaultProps = {
	afterEach: 60000
};

Switcher.propTypes = {
	afterEach: number,
	children: func.isRequired
};

export default Switcher;
