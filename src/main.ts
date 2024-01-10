import Handlebars from 'handlebars'
import * as Components from './components'
import * as Pages from './pages'

const pages = {
    login: [Pages.LoginPage],
    create: [Pages.CreatePage],
    chat: [Pages.ChatPage],
    profile: [Pages.ProfilePage],
    password: [Pages.PasswordPage],
    navigation: [Pages.NavigationPage],
    page404: [Pages.Page404],
    page500: [Pages.Page500],
}

Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component)
})

function route(page: string) {
    // @ts-expect-error version
    const [source, context] = pages[page]
    const container = document.getElementById('app')!
    container.innerHTML = Handlebars.compile(source)(context)
}

document.addEventListener('DOMContentLoaded', () => route('navigation'))

document.addEventListener('click', e => {
    // @ts-expect-error version
    const page = e.target.getAttribute('page')
    if (page) {
        route(page)

        e.preventDefault()
        e.stopImmediatePropagation()
    }
})

document.addEventListener('click', e => {
    // @ts-expect-error version
    const href = e.target.getAttribute('href')
    if (href) {
        route(href)

        e.preventDefault()
        e.stopImmediatePropagation()
    }
})
