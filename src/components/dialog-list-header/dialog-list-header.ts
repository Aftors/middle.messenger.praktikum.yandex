import Block from '../../core/Block.ts'
import { connect } from '../../core/connect.ts'
import router from '../../router/router.ts'
import { logout } from '../../services/auth.ts'
import { ERoutes } from '../../types/enums.ts'

interface Props {
    onClick: () => void
    onProfile: (e: Event) => void
    user: {}
    avatar: string
}

export class DialogListHeader extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            avatar: window.store.getStateByID('user', 'avatar'),
            onClick: () => {
                logout()
            },
            onProfile: (e: Event) => {
                router.go(ERoutes.SETTINGS)
                e.preventDefault()
                e.stopPropagation()
            },
        })
    }
    protected render() {
        return `
        <div class='dialog-list__header'>
            <a page='profile'>
                <img class='dialog-list__logo' src=${this.props.avatar} alt='avatar'>
            </a>
        <div class='dialog-list__header__user-info' >
            {{{ Link label=user.displayName onClick=onProfile type='__profile' }}}
            <p>{{user.phone}}</p>
         </div>
        {{{ Button label='Log out' type='link' onClick=onClick }}}
    </div>
    
        `
    }
}

export default connect(({ user }) => ({ user }))(DialogListHeader)
