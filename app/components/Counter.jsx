import React, { Component } from "react";
import { number, func, node } from "prop-types";

class Counter extends Component {
	state = {
		counter: this.props.showTime
	};

	componentDidMount() {
		this.timer = setInterval(() => this.counter(), 1000);
	}

	counter = () => {
		if (this.state.counter < 1) {
			this.props.f();
			this.setState({ counter: this.props.showTime });
		} else {
			this.setState(prevState => ({
				counter: prevState.counter - 1
			}));
		}
	};

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		return <div>{this.props.children(this.state.counter)}</div>;
	}
}

Counter.propTypes = {
	f: func.isRequired,
	children: func.isRequired,
	showTime: number
};

Counter.defaultProps = {
	showTime: 60
};

export default Counter;
