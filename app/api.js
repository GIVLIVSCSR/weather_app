import axios from "axios";

const APIID = "fb4dc3c032eebaadd74aed40b3f6d5f1";
const rootUrl = "http://api.openweathermap.org";

export default {
	getCity: city =>
		axios.get(
			`${rootUrl}/data/2.5/weather?q=${city}&units=metric&appid=${APIID}&units=metric`
		)
};
