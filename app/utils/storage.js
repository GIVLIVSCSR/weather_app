export const setToStorage = (key, value) =>
	localStorage.setItem(key, JSON.stringify(value));

export const getFromStorage = key =>
	JSON.parse(localStorage.getItem(key)) || [];

export const inStorage = (key, value) => {
	let data;
	//console.log("inStorage item name", value);
	if (getFromStorage(key).length) {
		data = getFromStorage(key).filter(
			item => item.name.toLowerCase() === value.toLowerCase()
		);
		//console.log("localstorage", data);
		return data.length
			? { city: data[0], status: true }
			: { city: null, status: false };
	} else return { city: null, status: false };
};

export const citiesInStorage = () => getFromStorage("cities").length;

export const removeItem = key => localStorage.removeItem(key);

