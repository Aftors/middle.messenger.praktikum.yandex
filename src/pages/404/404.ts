import Block from '../../core/Block.ts'
import { navigate } from '../../core/navigate.ts'

export class Page404 extends Block {
    constructor() {
        super({
            onClick: () => {
                navigate('chat')
            },
        })
    }
    protected render() {
        return `
        <div class='page404'>
            <h1>404</h1>
            <h2>
                <span>P.</span>chat got lost
            </h2>
            <object type='image/svg+xml' data='peach.svg' class='logo'></object>
            {{{ Button label='Return' type='edit' page='chat' onClick=onClick }}}
        </div>

        `
    }
}
