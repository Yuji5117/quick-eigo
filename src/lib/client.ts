type FetchApiOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
}

const fetchApi = async <T>(url: string, options: FetchApiOptions = {}): Promise<T> => {
  const { body, headers, ...restOptions } = options

  const config: RequestInit = {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const res = await fetch(url, config)

  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`)
  }

  const text = await res.text()
  return text ? JSON.parse(text) : ({} as T)
}

export const api = {
  get: <T>(url: string, options?: Omit<FetchApiOptions, 'body'>) =>
    fetchApi<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body: unknown, options?: Omit<FetchApiOptions, 'body'>) =>
    fetchApi<T>(url, { ...options, method: 'POST', body }),
  put: <T>(url: string, body: unknown, options?: Omit<FetchApiOptions, 'body'>) =>
    fetchApi<T>(url, { ...options, method: 'PUT', body }),
  patch: <T>(url: string, body: unknown, options?: Omit<FetchApiOptions, 'body'>) =>
    fetchApi<T>(url, { ...options, method: 'PATCH', body }),
  delete: <T>(url: string, options?: Omit<FetchApiOptions, 'body'>) =>
    fetchApi<T>(url, { ...options, method: 'DELETE' }),
}
