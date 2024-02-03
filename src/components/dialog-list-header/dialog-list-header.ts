import Block from '../../core/Block.ts'
import router from '../../router/router.ts'
import { logout } from '../../services/auth.ts'
import { ERoutes } from '../../types/enums.ts'

export class DialogListHeader extends Block {
    constructor() {
        super({
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
                <img class='dialog-list__logo' src='man.png' alt='avatar'>
            </a>
        <div class='dialog-list__header__user-info' >
            {{{ Link label='Vasiliy' onClick=onProfile type='__profile' }}}
            <p>+7 (981) 755-85-28</p>
         </div>
        {{{ Button label='Log out' type='link' onClick=onClick }}}
    </div>
    
        `
    }
}
