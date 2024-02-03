import { UserDTO } from '../api/dto/user-dto.ts'
import router from '../router/router.ts'
import { ERoutes } from '../types/enums.ts'
import { getMe } from './auth.ts'

const initApp = async () => {
    try {
        const me: UserDTO = await getMe()
        window.store.set({ user: me })
    } catch (error) {
        router.go(ERoutes.LOGIN)
        return
    }
    router.go(ERoutes.CHATS)
}

export { initApp }
