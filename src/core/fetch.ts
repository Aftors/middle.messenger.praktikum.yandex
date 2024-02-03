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

type OptionsWithoutMethod = Omit<IOptions, 'method'>

export class Fetch {
    protected HOST = 'https://ya-praktikum.tech/api/v2'
    private apiUrl: string = ''

    constructor(apiPath: string) {
        this.apiUrl = `${this.HOST}${apiPath}`
    }

    get<TResponse>(
        url: string,
        options: OptionsWithoutMethod = {}
    ): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {
            ...options,
            method: METHODS.GET,
        })
    }

    post<TResponse>(
        url: string,
        options: OptionsWithoutMethod = {}
    ): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {
            ...options,
            method: METHODS.POST,
        })
    }

    put<TResponse>(
        url: string,
        options: OptionsWithoutMethod = {}
    ): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {
            ...options,
            method: METHODS.PUT,
        })
    }

    async request<TResponse>(
        url: string,
        options: IOptions = { method: METHODS.GET }
    ): Promise<TResponse> {
        const { method, data } = options

        const response = await fetch(url, {
            method,
            credentials: 'include',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: data ? JSON.stringify(data) : null,
        })

        const isJson = response.headers
            .get('content-type')
            ?.includes('application/json')
        const resultData = (await isJson) ? response.json() : null

        return resultData as unknown as TResponse
    }
}
