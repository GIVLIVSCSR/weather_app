import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const capitalize = s =>
	s.match(/^[A-Z]/)
		? s
		: s.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase());

const validInput = input => input.match(/^[A-Za-z_ ]*$/) || input === "";

class Search extends Component {
	state = {
		input: "",
		error: false
	};

	handleChange = e => {
		if (!validInput(e.target.value)) {
			this.setState({ error: true });
		} else {
			this.setState({ error: false });
		}
		this.setState({ input: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.input && !this.state.error) {
			this.props.history.push(`/city/${capitalize(this.state.input)}`);
		}
	};

	render() {
		const error = this.state.error && (
			<div>
				<span className="notification">Only latin letters are allowed</span>
			</div>
		);
		const startSearching =
			this.state.input.length && !this.state.error ? true : false;

		return (
			<div className="main-container">
				<form onSubmit={this.handleSubmit}>
					<span className="inline-error">{error}</span>
					<label>Choose a city</label>
					<input
						className="input-for-search"
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
						autoFocus={true}
					/>
					<input
						className={`${startSearching && "button-search"} button`}
						type="submit"
						value="Submit"
					/>
				</form>
			</div>
		);
	}
}

export default Search;
