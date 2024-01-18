import Block from '../../core/Block.ts'
import { InputAuth } from '../../components/index.ts'
import * as validators from '../../core/validator.ts'
import { navigate } from '../../core/navigate.ts'

interface Props {
    validate: {
        [key: string]: (value: string) => boolean | string
    }
    onCreate: (e: Event) => void
    events?: {}
    onClick: (e: Event) => void
}

type Refs = {
    [key: string]: InputAuth
}

export class CreatePage extends Block<Props, Refs> {
    constructor() {
        super({
            validate: {
                login: validators.login,
                password: validators.password,
                passwordTwo: validators.passwordTwo,
                email: validators.email,
                phone: validators.phone,
                firstName: validators.name,
                secondName: validators.name,
            },

            onCreate: event => {
                event.preventDefault()
                const login = this.refs.login.value()
                const password = this.refs.password.value()
                const email = this.refs.email.value()
                const firstName = this.refs.firstName.value()
                const secondName = this.refs.secondName.value()
                const phone = this.refs.phone.value()
                if (
                    login &&
                    password &&
                    email &&
                    password &&
                    phone &&
                    firstName &&
                    secondName
                ) {
                    console.log({
                        firstName,
                        secondName,
                        login,
                        password,
                        email,
                        phone,
                    })
                    navigate('chat')
                }
            },
            onClick: e => {
                navigate('login')
                e.preventDefault()
                e.stopPropagation()
            },
        })
    }

    protected render() {
        return `
        <main class='container'>
            <form class='auth-form'>
                <object type='image/svg+xml' data='peach.svg' class='logo'></object>
                {{{ Headline label='Registration' }}}
                {{{ InputAuth name='email' type='text' label='Mail' ref="email" validate=validate.email }}}
                {{{ InputAuth name='login' type='text' label='Login' ref="login"  validate=validate.login }}}
                {{{ InputAuth name='first_name' label='Name' ref="firstName" validate=validate.firstName }}}
                {{{ InputAuth name='second_name' label='Last name' ref="secondName" validate=validate.secondName }}}
                {{{ InputAuth name='phone' label='Phone' ref="phone" validate=validate.phone }}}
                {{{ InputAuth name='password' type='password' label='Password' ref="password" validate=validate.password }}}
                {{{ InputAuth name='password_two' type='password' label='Password' ref="passwordTwo" validate=validate.passwordTwo }}}
                {{{ Button label='Create' type='basic' onClick=onCreate }}}
                {{{ Link text='Already have an account?' label='Login in here' href='login' onClick=onClick }}}
            </form>
        </main>
 
        `
    }
}
