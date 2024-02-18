import AuthApi from '../api/apiAuth.ts'
import { UserDTO } from '../api/dto/user-dto.ts'
import { apiHasError } from '../core/apiHasError.ts'
import { transformUser } from '../helpers/apiTransform.ts'
import router from '../router/router.ts'
import { CreateUser, LoginRequestData } from '../types/apiTipes.ts'
import { ERoutes } from '../types/enums.ts'

const authApi = new AuthApi()

const getMe = async () => {
    const responseUser = await authApi.getMe()
    if (apiHasError(responseUser)) {
        throw Error(responseUser.reason)
    }
    return responseUser as UserDTO
}

const signin = async (data: LoginRequestData) => {
    const response = await authApi.login(data)
    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    const me = await getMe()
    window.store.set({ user: transformUser(me) })
    router.go(ERoutes.CHATS)
}

const signup = async (data: CreateUser) => {
    const response = await authApi.create(data)
    if (apiHasError(response)) {
        throw Error(response.reason)
    }
    const me = await getMe()
    window.store.set({ user: transformUser(me) })
    router.go(ERoutes.CHATS)
}

const logout = async () => {
    await authApi.logout()
    router.go(ERoutes.LOGIN)
    window.store.set({ user: null })
}

export { signin, signup, logout, getMe }
