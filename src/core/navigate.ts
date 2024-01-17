import * as Pages from '../pages/index.ts'

const pages = {
    login: Pages.LoginPage,
    create: Pages.CreatePage,
    chat: Pages.ChatPage,
    profile: Pages.ProfilePage,
    password: Pages.PasswordPage,
    nav: Pages.Navigation,
    page404: Pages.Page404,
    page500: Pages.Page500,
}

export function navigate(page: string) {
    const app: HTMLElement | null = document.getElementById('app')
    // @ts-ignore
    const Component = pages[page]
    const component = new Component()
    // @ts-ignore
    app.innerHTML = ''
    app?.append(component.getContent()!)
}
