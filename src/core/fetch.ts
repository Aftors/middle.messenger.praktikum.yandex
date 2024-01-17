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

type Method = (url: string, options?: IOptions) => Promise<any>

const queryStringify = (data: { [key: string]: any }): string => {
    if (typeof data !== 'object') {
        throw new Error('Data must be object')
    }
    return `?${Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
}

class Fetch {
    get: Method = (
        url: string,
        options: IOptions = {}
    ): Promise<XMLHttpRequest> => {
        const { data } = options
        if (data) {
            const params = queryStringify(data)
            return this.request(
                url + params,
                { ...options, method: METHODS.GET },
                options.timeout
            )
        }
        return this.request(
            url,
            { ...options, method: METHODS.GET },
            options.timeout
        )
    }

    post: Method = (url: string, options: IOptions = {}) =>
        this.request(url, { ...options, method: METHODS.POST }, options.timeout)
    put: Method = (url: string, options: IOptions = {}) =>
        this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
    delete: Method = (url: string, options: IOptions = {}) =>
        this.request(
            url,
            { ...options, method: METHODS.DELETE },
            options.timeout
        )

    request = (
        url: string,
        options: IOptions = {},
        timeout = 5000
    ): Promise<XMLHttpRequest> => {
        const { method, data, headers = {} } = options

        return new Promise((resolve, reject) => {
            if (!method) {
                return
            }

            const xhr = new XMLHttpRequest()

            xhr.open(method, url)

            xhr.onload = () => {
                resolve(xhr)
            }

            xhr.onabort = () => reject(new Error('User aborted request'))
            xhr.onerror = () => reject(new Error('Network error occurred'))
            xhr.ontimeout = () => reject(new Error('Request timed out'))

            if (headers) {
                // eslint-disable-next-line array-callback-return
                Object.entries(headers).map(([key, value]) => {
                    xhr.setRequestHeader(key, value)
                })
            }

            if (!method) {
                xhr.send()
            }

            if (method === METHODS.GET || !data) {
                xhr.send()
            } else {
                xhr.send(JSON.stringify(data))
            }

            setTimeout(() => {
                reject(new Error('время вышло!'))
            }, timeout)
        })
    }
}
