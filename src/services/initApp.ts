import { UserDTO } from '../api/dto/user-dto.ts'
import { transformUser } from '../helpers/apiTransform.ts'
import router from '../router/router.ts'
import { ERoutes } from '../types/enums.ts'
import { getMe } from './auth.ts'
import { getChats } from './chat.ts'

const initApp = async () => {
    try {
        const me: UserDTO = await getMe()
        window.store.set({ user: transformUser(me) })
    } catch (error) {
        router.go(ERoutes.LOGIN)
        return
    }
    const chats = await getChats()
    window.store.set({ chats })
    if (window.location.pathname === '/') {
        router.go(ERoutes.CHATS)
    } else {
        router.go(window.location.pathname)
    }
}

const initChatPage = async () => {
    const chats = await getChats()
    window.store.set({ chats })
}

export { initApp, initChatPage }
