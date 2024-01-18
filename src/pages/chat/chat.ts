import Block from '../../core/Block.ts'
import { listDialog } from '../../props/props.listDialog.ts'

export class ChatPage extends Block {
    constructor() {
        super({
            listDialog,
        })
    }
    protected render() {
        return `
        <main class='chat'>
            {{{ Dialogs listDialog=listDialog }}}
            {{{ ChatConteiner }}}
        </main>
        `
    }
}
