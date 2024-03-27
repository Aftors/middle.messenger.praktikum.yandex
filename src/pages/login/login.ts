import Block from '../../core/Block.ts'
import { InputAuth } from '../../components/index.ts'
import * as validators from '../../core/validator.ts'
import { signin } from '../../services/auth.ts'
import Router from '../../router/router.ts'
import { ERoutes } from '../../types/enums.ts'

interface IProps {
    validate: {
        login: (value: string) => boolean | string
        password: (value: string) => boolean | string
    }
    onLogin: (e: Event) => void
    events?: {}
    onClick: (e: Event) => void
}

type Refs = {
    login: InputAuth
    password: InputAuth
}

export class LoginPage extends Block<IProps, Refs> {
    constructor() {
        const router = new Router('app')
        super({
            validate: {
                login: validators.login,
                password: validators.password,
            },
            onLogin: event => {
                event.preventDefault()
                const login = this.refs.login.value()
                const password = this.refs.password.value()
                if (!login || !password) {
                    return
                }

                signin({
                    login,
                    password,
                }).catch(error => console.log(error))
                this.refs.password.setProps({ value: '' })
            },
            onClick: e => {
                router.go(ERoutes.REGISTER)
                e.preventDefault()
                e.stopPropagation()
            },
        })
    }

    protected render() {
        return `
        <main class="container">
            <form class='auth-form'>
                <object type='image/svg+xml' data='peach.svg' class='logo'></object>
                {{{ Headline label='Sign in' span='Peach' }}}
                {{{ InputAuth name='login' type='text' label='Login' ref='login' validate=validate.login }}}
                {{{ InputAuth name='password' type='password' label='Password' ref="password" validate=validate.password }}}
                {{{ Button name='sign in' label='Sign in' type='basic' onClick=onLogin }}}
                {{{ Link text="Don't have an account?" label='Create in here'  onClick=onClick}}}
            </form>
        </main>
        `
    }
}
