import Block from '../../core/Block.ts'
import { InputAuth } from '../../components/index.ts'
import Router from '../../router/router.ts'
import { ERoutes } from '../../types/enums.ts'
import { list } from '../../props/props.profile.ts'
import { change, changeAvatar } from '../../services/settings.ts'
import { connect } from '../../core/connect.ts'

interface Props {
    avatar?: string
    title?: string
    time?: string
    subtitle?: string
    badge?: string
    list: unknown
    displayName: string
    onClick?: (e: Event) => void
    onSave: (e: Event) => void
    onReturn: (e: Event) => void
    onChange: (e: Event) => void
    events?: {}
    user: { [key: string]: string }
}

type Refs = {
    [key: string]: InputAuth
}

export class ProfilePage extends Block<Props, Refs> {
    constructor(props: Props) {
        const router = new Router('app')
        super({
            ...props,
            list,

            onSave: e => {
                e.preventDefault()
                const login = this.refs.login.value()
                const email = this.refs.email.value()
                const firstName = this.refs.firstName.value()
                const secondName = this.refs.secondName.value()
                const displayName = this.refs.displayName.value()
                const phone = this.refs.phone.value()
                if (
                    login &&
                    email &&
                    phone &&
                    firstName &&
                    secondName &&
                    displayName
                ) {
                    const me = {
                        login,
                        email,
                        phone,
                        first_name: firstName,
                        second_name: secondName,
                        display_name: displayName,
                    }
                    change(me)
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
                router.go(ERoutes.PASSWORD)
            },
            onReturn: () => {
                router.go(ERoutes.CHATS)
            },
            displayName: window.store.getStateByID('user', 'display_name'),
            onChange: e => {
                const target = e.target as HTMLInputElement
                const { files } = target
                files ? changeAvatar(files[0]) : false
            },
        })
    }

    protected render() {
        return `
            <main class='profile'>
                {{{ Button label='Return' type='return' onClick=onReturn }}}
                <div class='profile-conteiner'>
                    <div class='profile-header'>
                       {{{Avatar ref="file" onChange=onChange avatar=user.avatar}}}
                        <h2>{{user.displayName}}</h2>
                    </div>
                    <div class='profile-item-list'>
                        <ul>
                            <form class='profile-form' name='profile-form'>
                                {{#each list}}
                                     <li>
                                        {{{ InputSettings 
                                            style='__profile' 
                                            disabled='disabled' 
                                            label=this.label
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

export default connect(({ user }) => ({ user }))(ProfilePage)
