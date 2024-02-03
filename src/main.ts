import * as Components from './components/index.ts'
import { registerComponent } from './core/regComponent.ts'
import router from './router/router.ts'
import * as Pages from './pages/index.ts'
import { ERoutes } from './types/enums.ts'
import { Store } from './core/Store.ts'
import { AppState } from './types/appState.ts'
import { initApp } from './services/initApp.ts'

declare global {
    interface Window {
        store: Store<AppState>
    }

    type Nullable<T> = T | null
}

const initState: AppState = {
    error: null,
    user: {
        id: 0,
        login: 'ff',
        first_name: 'ff',
        second_name: 'ff',
        display_name: '',
        avatar: '',
        phone: '',
        email: 'fff@fff',
    },
    openModal: false,
}

window.store = new Store<AppState>(initState)

registerComponent('Headline', Components.HeadLine)
registerComponent('Button', Components.Button)
registerComponent('Link', Components.Link)
registerComponent('Input', Components.Input)
registerComponent('ErrorLine', Components.ErrorLine)
registerComponent('InputAuth', Components.InputAuth)
registerComponent('InputMessage', Components.InputMessage)

registerComponent('Dialogs', Components.Dialogs)
registerComponent('DialogListHeader', Components.DialogListHeader)
registerComponent('Search', Components.Search)
registerComponent('DialogItem', Components.DialogItem)

registerComponent('ChatConteiner', Components.ChatConteiner)
registerComponent('ChatHeader', Components.ChatHeader)
registerComponent('ChatBody', Components.ChatBody)
registerComponent('ChatFooter', Components.ChatFooter)
registerComponent('InputMessage', Components.InputMessage)
registerComponent('ChatMessage', Components.ChatMessage)
registerComponent('Modal', Components.Modal)

window.addEventListener('popstate', () => {
    router.start()
})

interface IPages {
    [key: string]: any
}

const pages: IPages = {
    login: Pages.LoginPage,
    create: Pages.CreatePage,
    chat: Pages.ChatPage,
    profile: Pages.ProfilePage,
    password: Pages.PasswordPage,
    page404: Pages.Page404,
    page500: Pages.Page500,
}

router
    .use(ERoutes.LOGIN, pages.login)
    .use(ERoutes.REGISTER, pages.create)
    .use(ERoutes.CHATS, pages.chat)
    .use(ERoutes.SETTINGS, pages.profile)
    .use(ERoutes.NOT_FOUND_PAGE, pages.page404)
    .use(ERoutes.SERVER_ERROR_PAGE, pages.page500)

document.addEventListener('DOMContentLoaded', () => initApp())
