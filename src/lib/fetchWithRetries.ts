const DEFAULT_RETRIES = 3

interface ClientResponse<T> {
	data: T
	status: number
	headers: Headers
	url: string
}

interface FetchOptions extends RequestInit {
	retries?: number
	token?: string
}

export async function fetchWithRetries<T> (endpoint: string, options: FetchOptions): Promise<ClientResponse<T>> {
	const { retries = DEFAULT_RETRIES, token, body, headers = {}, method = 'GET', ...customConfig } = options
	const defaultHeaders = { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) }

	const config: RequestInit = {
		method,
		headers: {
			...defaultHeaders,
			...headers
		},
		...customConfig
	}

	if (body) JSON.stringify(body)

	const request = async (attempt: number = 1) => {
		try {
			const response = await window.fetch(endpoint, config)
			const data = await response.json()

			if (response.ok) {
				return {
					status: response.status,
					data,
					headers: response.headers,
					url: response.url
				}
			} else {
				throw new Error(response.statusText)
			}
		} catch (error) {
			if (attempt < retries) {
				console.log(`Intento ${attempt} fallido. Reintentando...`)
				return request(attempt + 1) // intentamos nuevamente
			}
			throw new Error(`Error tras ${retries} intentos: ${error.message}`)
		}
	}
	return request()
}

// Función para hacer peticiones GET
fetchWithRetries.get = function <T> (
	endpoint: string,
	options: FetchOptions = {}
): Promise<ClientResponse<T>> {
	return fetchWithRetries<T>(endpoint, { ...options, method: 'GET' });
};

// Función para hacer peticiones POST
fetchWithRetries.post = function <T> (
	endpoint: string,
	options: FetchOptions = {}
): Promise<ClientResponse<T>> {
	return fetchWithRetries<T>(endpoint, { ...options, method: 'POST' });
};

// Función para hacer peticiones PUT
fetchWithRetries.put = function <T> (
	endpoint: string,
	options: FetchOptions = {}
): Promise<ClientResponse<T>> {
	return fetchWithRetries<T>(endpoint, { ...options, method: 'PUT' });
};

// Función para hacer peticiones DELETE
fetchWithRetries.delete = function <T> (
	endpoint: string,
	options: FetchOptions = {}
): Promise<ClientResponse<T>> {
	return fetchWithRetries<T>(endpoint, { ...options, method: 'DELETE' });
};