import React, { Component } from "react";
import { number } from "prop-types";
import axios from "axios";
import api from "../../api";

const chartContainer = {
  overflow: "auto",
  position: "relative",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0"
};

const chart = {
  width: "100%",
  height: "280px"
};

class Chart extends Component {
  componentDidMount() {
    this.chartRender();
  }

  chartRender = () => {
    let center = {
      lat: this.props.lat,
      lng: this.props.lng
    };

    this.map = new google.maps.Map(this.refs.map, {
      center: center,
      zoom: 11
    });

    this.marker = new google.maps.Marker({
      position: center,
      map: this.map
    });
  };

  render() {
    return (
      <div style={chartContainer} className="map">
        <div ref="map" style={chart} className="chart" />
      </div>
    );
  }
}

Chart.propTypes = {
  lat: number.isRequired,
  lng: number.isRequired
};

export default Chart;
