import { UserDTO } from '../api/dto/user-dto.ts'
import { transformUser } from '../helpers/apiTransform.ts'
import Router from '../router/router.ts'
import { ERoutes } from '../types/enums.ts'
import { getMe } from './auth.ts'
import { getChats } from './chat.ts'

const initApp = async () => {
    const router = new Router('app')
    try {
        const me: UserDTO = await getMe()
        window.store.set({ user: transformUser(me) })
        const chats = await getChats()
        window.store.set({ chats })
        if (
            window.location.pathname === '/' ||
            window.location.pathname === '/sign-up'
        ) {
            router.go(ERoutes.CHATS)
        } else {
            router.go(window.location.pathname)
        }
    } catch (error) {
        if (window.location.pathname === '/sign-up') {
            router.go(ERoutes.REGISTER)
        } else {
            router.go(ERoutes.LOGIN)
        }
    }
}

const initChatPage = async () => {
    const chats = await getChats()
    window.store.set({ chats })
}

export { initApp, initChatPage }
