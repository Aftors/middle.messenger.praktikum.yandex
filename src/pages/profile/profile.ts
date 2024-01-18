import Block from '../../core/Block.ts'
import { list } from '../../props/props.profile.ts'
import { InputAuth } from '../../components/index.ts'
import { navigate } from '../../core/navigate.ts'

interface Props {
    avatar?: string
    title?: string
    time?: string
    subtitle?: string
    badge?: string
    list: unknown
    onClick?: (e: Event) => void
    onSave: (e: Event) => void
    onReturn: (e: Event) => void
    events?: {}
}

type Refs = {
    [key: string]: InputAuth
}

export class ProfilePage extends Block<Props, Refs> {
    constructor() {
        super({
            list,
            onSave: e => {
                e.preventDefault()
                const login = this.refs.login.value()
                const email = this.refs.email.value()
                const firstName = this.refs.firstName.value()
                const secondName = this.refs.secondName.value()
                const displayName = this.refs.displayName.value()
                const phone = this.refs.phone.value()
                if (login && email && phone && firstName && secondName) {
                    console.log({
                        firstName,
                        secondName,
                        displayName,
                        login,
                        email,
                        phone,
                    })
                    const target = e.target as HTMLElement
                    if (target?.id === 'edit') {
                        const inputs =
                            document.querySelectorAll<HTMLInputElement>(
                                '.profile-form input[type="text"]'
                            )
                        let flag = true
                        inputs.forEach(input => {
                            if (input.disabled) {
                                input.disabled = false
                                flag = !flag
                            } else {
                                input.disabled = true
                                flag = !flag
                            }
                        })
                    }
                }
            },
            onClick: () => {
                navigate('password')
            },
            onReturn: () => {
                navigate('chat')
            },
        })
    }
    protected render() {
        return `
            <main class='profile'>
                {{{ Button label='Return' type='return' onClick=onReturn}}}
                <div class='profile-conteiner'>
                    <div class='profile-header'>
                        <img class='dialog-list__logo' src='man.png' alt='avatar' page='profile'>
                        <h2>Vasiliy</h2>
                        <p>+7 (981) 755-85-28</p>
                    </div>
                    <div class='profile-item-list'>
                        <ul>
                            <form class='profile-form' name='profile-form'>
                                {{#each list}}
                                     <li>
                                        {{{ InputAuth 
                                            style='__profile' 
                                            disabled='disabled' 
                                            label=this.label 
                                            value=this.value 
                                            type=this.type 
                                            name=this.name 
                                            ref=this.ref
                                            validate=this.validate
                                            disabled=this.disabled }}}
                                     </li>
                                {{/each}}
                            </form>
                        </ul>
                    </div>
                    <div class='profile-buttons'>
                        {{{ Button label='Edit' type='edit' id='edit' onClick=onSave}}}
                        {{{ Button label='Сhange password' type='edit' onClick=onClick}}}
                    </div>
                </div>
            </main>


        `
    }
}
