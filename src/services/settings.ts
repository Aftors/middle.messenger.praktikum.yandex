import ApiSettings, { ChangeUser } from '../api/apiSettings.ts'
import { apiHasError } from '../core/apiHasError.ts'

const settingsApi = new ApiSettings()

const getMe = async () => {
    const responseUser = await settingsApi.get()
    if (apiHasError(responseUser)) {
        throw Error(responseUser.reason)
    }
    return responseUser
}

const change = async (data: ChangeUser) => {
    const response = await settingsApi.change(data)
    if (apiHasError(response)) {
        throw Error(response.reason)
    }
    const me = await getMe()
    window.store.set({ user: me })
}

export { getMe, change }
