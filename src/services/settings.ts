import ApiSettings from '../api/apiSettings.ts'
import { apiHasError } from '../core/apiHasError.ts'
import { transformUser } from '../helpers/apiTransform.ts'
import Router from '../router/router.ts'
import { ChangePass, ChangeUser } from '../types/apiTipes.ts'
import { ERoutes } from '../types/enums.ts'

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
    window.store.set({ user: transformUser(response) })
}

const changePass = async (data: ChangePass) => {
    const response = await settingsApi.changePass(data)
    const router = new Router('app')
    if (apiHasError(response)) {
        throw Error(response.reason)
    }
    router.go(ERoutes.SETTINGS)
}

const changeAvatar = async (data: Blob) => {
    const formData = new FormData()
    formData.append('avatar', data)
    const response = await settingsApi.changeAvatar(formData)
    if (apiHasError(response)) {
        throw Error(response.reason)
    }
    window.store.set({ user: transformUser(response) })
}

export { getMe, change, changePass, changeAvatar }
