import fetch from "isomorphic-unfetch";

const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) return response;

	const error = new Error(response.statusText);
	error.response = response;
	throw error;
};

const parseJson = (response) => {
	if (response.status === 204 || response.status === 205) {
		return null;
	}
	return response.json();
};

const callApi = (url, options) => {
	return fetch(url, options)
		.then(checkStatus)
		.then(parseJson);
};

export default callApi;
