import config from "../config";

export const apiCall = (path, data, type, callback) => {
	return new Promise((resolve, reject) => {
		fetch(`${config.BASE_URL}/api/${path}`, {
			method: type ?? "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: type !== "GET" ? JSON.stringify(data) : undefined,
		}).then((response) => {
			if (response.status === 200) {
				return response.json().then(resolve);
			} else if (response.status === 400) {
				return response.json().then((obj) => {
					// alert(obj.err);
					callback(obj.err);
					reject(obj.err);
				});
			} else {
				throw new Error(`${response.status} Error with API call`);
			}
		});
	});
};
