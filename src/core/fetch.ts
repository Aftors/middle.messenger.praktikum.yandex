const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

interface IOptions {
    headers?: { [key: string]: string }
    method?: string
    data?: object
    timeout?: number
}

type HTTPMethod = <TResponse>(
    url: string,
    options?: OptionsWithoutMethod
) => Promise<TResponse>

type Request = <TResponse>(
    url: string,
    options: IOptions,
    timeout?: number
) => Promise<TResponse>

type OptionsWithoutMethod = Omit<IOptions, 'method'>

const queryStringify = (data: { [key: string]: any }): string => {
    if (typeof data !== 'object') {
        throw new Error('Data must be object')
    }
    return `?${Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
}

export class Fetch {
    protected HOST = 'https://ya-praktikum.tech/api/v2'
    private apiUrl: string = ''

    constructor(apiPath: string) {
        this.apiUrl = `${this.HOST}${apiPath}`
    }

    get: HTTPMethod = (url, options = {}) => {
        const Url = options.data ? `${url}${queryStringify(options.data)}` : url
        return this.request(`${this.apiUrl}${Url}`, {
            ...options,
            method: METHODS.GET,
        })
    }

    post: HTTPMethod = (url, options = {}) =>
        this.request(`${this.apiUrl}${url}`, {
            ...options,
            method: METHODS.POST,
        })

    put: HTTPMethod = (url, options = {}) =>
        this.request(`${this.apiUrl}${url}`, {
            ...options,
            method: METHODS.PUT,
        })

    delete: HTTPMethod = (url, options = {}) =>
        this.request(`${this.apiUrl}${url}`, {
            ...options,
            method: METHODS.DELETE,
        })

    request: Request = (url, options = {}, timeout = 5000) => {
        const { method, data, headers = {} } = options

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('No method'))
                return
            }

            const xhr = new XMLHttpRequest()

            if (headers) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value)
                })
            }

            xhr.open(method, url)

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json')
            }

            xhr.withCredentials = true
            xhr.responseType = 'json'

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (
                        xhr.status === 0 ||
                        (xhr.status >= 200 && xhr.status < 400)
                    ) {
                        resolve(xhr.response)
                    } else {
                        reject(xhr.response)
                    }
                }
            }

            xhr.onabort = () => reject(new Error('User aborted request'))
            xhr.onerror = () => reject(new Error('Network error occurred'))
            xhr.ontimeout = () => reject(new Error('Request timed out'))

            xhr.timeout = timeout

            if (method === METHODS.GET) {
                xhr.send()
            } else {
                xhr.send(data instanceof FormData ? data : JSON.stringify(data))
            }
        })
    }
}
