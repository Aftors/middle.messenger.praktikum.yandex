import {
    SinonFakeXMLHttpRequest,
    SinonFakeXMLHttpRequestStatic,
    useFakeXMLHttpRequest,
} from 'sinon'
import { expect } from 'chai'
import { Fetch } from '../core/fetch.ts'

describe('Fetch', () => {
    let api: Fetch
    let XHR: SinonFakeXMLHttpRequestStatic
    let fakeRequest: SinonFakeXMLHttpRequest | null

    const apiEnd = '/mock'
    const apiMock = `https://ya-praktikum.tech/api/v2${apiEnd}`

    const mockBody = { id: 0, name: 'Name' }
    const mockFormData = new FormData()

    beforeEach(() => {
        api = new Fetch(apiEnd)
        XHR = useFakeXMLHttpRequest()
        XHR.onCreate = xhr => {
            fakeRequest = xhr
        }
    })

    afterEach(() => {
        XHR.restore()
        fakeRequest = null
    })

    it('stringify object from GET request parameters', async () => {
        api.get('', { data: mockBody })
        const request = fakeRequest

        const expectedURL = '?id=0&name=Name'

        expect(request?.url).to.eq(`${apiMock}${expectedURL}`)
    })

    it('GET request', async () => {
        api.get('')
        const request = fakeRequest

        expect(request?.method).to.eq('GET')
    })

    it('POST request', async () => {
        api.post('', { data: mockBody })
        const request = fakeRequest

        expect(request?.url).to.eq(apiMock)
        expect(request?.requestBody).to.eq(JSON.stringify(mockBody))
        expect(request?.method).to.eq('POST')
    })

    it('PUT request', async () => {
        api.put('', { data: mockBody })
        const request = fakeRequest

        expect(request?.url).to.eq(apiMock)
        expect(request?.requestBody).to.eq(JSON.stringify(mockBody))
        expect(request?.method).to.eq('PUT')
    })

    it('PUT request Form Data', async () => {
        api.put('', { data: mockFormData })
        const request = fakeRequest

        expect(request?.url).to.eq(apiMock)
        expect(request?.requestBody).to.eq(mockFormData)
        expect(request?.method).to.eq('PUT')
    })

    it('DELETE request', async () => {
        api.delete('', { data: mockBody })
        const request = fakeRequest

        expect(request?.url).to.eq(apiMock)
        expect(request?.requestBody).to.eq(JSON.stringify(mockBody))
        expect(request?.method).to.eq('DELETE')
    })
})
