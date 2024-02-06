import Block from '../../core/Block.ts'
import router from '../../router/router.ts'
import { ERoutes } from '../../types/enums.ts'

export class Page500 extends Block {
    constructor() {
        super({
            onClick: () => {
                router.go(ERoutes.CHATS)
            },
        })
    }
    protected render() {
        return `
        <div class='page500 page404'>
            <h1>500</h1>
            <h2>
                Planting <span>P.</span>chats, come back leter
            </h2>
            <object type='image/svg+xml' data='plant.svg' class='logo'></object>
            {{{ Button label='Return' type='edit' page='chat' onClick=onClick }}}
        </div>
    

        `
    }
}
