import Block from '../../core/Block.ts'
import { passwordList } from '../../props/props.password.ts'
import { InputAuth } from '../../components/index.ts'
import { navigate } from '../../core/navigate.ts'

interface Props {
    passwordList: unknown
    onClick?: (e: Event) => void
    onSave?: (e: Event) => void
}

type Refs = {
    password: InputAuth
    passwordTwo: InputAuth
    passwordOld: InputAuth
}

export class PasswordPage extends Block<Props, Refs> {
    constructor() {
        super({
            passwordList,
            onSave: e => {
                e.preventDefault()
                const password = this.refs.password.value()
                const passwordTwo = this.refs.passwordTwo.value()
                const passwordOld = this.refs.passwordOld.value()
                if (password && passwordTwo && passwordOld) {
                    console.log({
                        password,
                        passwordTwo,
                        passwordOld,
                    })
                    navigate('profile')
                }
            },
            onClick: () => {
                navigate('profile')
            },
        })
    }
    protected render() {
        return `
        <div class='password'>
                <h2>Password</h2>
                <div class='profile-item-list'>
                    <ul>
                        <form class='password-form'>
                            {{#each passwordList}}
                                 <li>
                                    {{{ InputAuth 
                                        style='__profile' 
                                        label=this.label 
                                        value=this.value 
                                        type=this.type 
                                        name=this.name 
                                        disabled=false
                                        validate=this.validate
                                        ref=this.ref
                                     }}}
                                 </li>
                            {{/each}}
                        </form>
                    </ul>
                </div>
                <div class='profile-buttons'>
                    {{{ Button label='Return' type='edit' onClick=onClick}}}
                    {{{ Button label='Save password' type='edit' onClick=onSave}}}
                </div>
    </div>
    
        `
    }
}
