import Block from '../../core/Block.ts'
import Router from '../../router/router.ts'
import { ERoutes } from '../../types/enums.ts'

export class Navigation extends Block {
    constructor() {
        const router = new Router('app')
        super({
            type: 'link-nav',
            buttons: [
                {
                    label: 'LoginPage',
                    onClick: () => {
                        router.go('/')
                    },
                },
                {
                    label: 'Registration page',
                    onClick: () => {
                        router.go(ERoutes.REGISTER)
                    },
                },
                {
                    label: 'Chat page',
                    onClick: () => {
                        router.go(ERoutes.CHATS)
                    },
                },
                {
                    label: 'Profile page',
                    onClick: () => {
                        router.go(ERoutes.SETTINGS)
                    },
                },
                {
                    label: 'Change password page',
                    onClick: () => {
                        router.go('password')
                    },
                },
                {
                    label: '404 page',
                    onClick: () => {
                        router.go(ERoutes.NOT_FOUND_PAGE)
                    },
                },
                {
                    label: '50* page',
                    onClick: () => {
                        router.go(ERoutes.SERVER_ERROR_PAGE)
                    },
                },
            ],
        })
    }
    protected render() {
        return `
        <nav class='navigation'>
            <h1>Existing pages</h1>
            <ul>
            {{#each buttons}}
                  {{{Button label=this.label type=../type onClick=this.onClick}}}
            {{/each}}
            </ul>
        </nav>

        `
    }
}
