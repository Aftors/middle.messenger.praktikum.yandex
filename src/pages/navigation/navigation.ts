import Block from '../../core/Block.ts'
import { navigate } from '../../core/navigate.ts'

export class Navigation extends Block {
    constructor() {
        super({
            type: 'link-nav',
            buttons: [
                {
                    label: 'LoginPage',
                    onClick: () => {
                        navigate('login')
                    },
                },
                {
                    label: 'Registration page',
                    onClick: () => {
                        navigate('create')
                    },
                },
                {
                    label: 'Chat page',
                    onClick: () => {
                        navigate('chat')
                    },
                },
                {
                    label: 'Profile page',
                    onClick: () => {
                        navigate('profile')
                    },
                },
                {
                    label: 'Change password page',
                    onClick: () => {
                        navigate('password')
                    },
                },
                {
                    label: '404 page',
                    onClick: () => {
                        navigate('page404')
                    },
                },
                {
                    label: '50* page',
                    onClick: () => {
                        navigate('page500')
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
