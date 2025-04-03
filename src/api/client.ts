interface ClientResponse<T> {
	data: T;
	status: number;
	headers: Headers;
	url: string;
}

export async function client<T> (
	endpoint: string,
	{ body, ...customConfi }: Partial<RequestInit> = {}
): Promise<ClientResponse<T>> {
	const defaultHeaders = { "Content-Type": "application/json" };
	const config: RequestInit = {
		method: body ? "POST" : "GET",
		headers: {
			...defaultHeaders,
			...customConfi.headers,
		},
	};

	if (body) {
		config.body = JSON.stringify(body);
	}
	let data;
	try {
		const response = await window.fetch(endpoint, config);
		data = await response.json();

		if (response.ok) {
			return {
				status: response.status,
				data,
				headers: response.headers,
				url: response.url,
			};
		}
		throw new Error(response.statusText);
	} catch (error) {
		if (error instanceof Error)
			return Promise.reject(error.message ? error.message : data);
		throw new Error("Error Unknown");
	}
}

client.get = function <T> (
	endpoint: string,
	customConfig: Partial<RequestInit> = {}
) {
	return client<T>(endpoint, { ...customConfig, method: "GET" });
};

client.post = function <T> (
	endpoint: string,
	customConfig: Partial<RequestInit> = {}
) {
	return client<T>(endpoint, { ...customConfig, method: "POST" });
};
