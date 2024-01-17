import Block from '../../core/Block.ts'

export class ChatConteiner extends Block {
    protected render() {
        return `
        <div class='chat-conteiner'>
            {{{ ChatHeader }}}
            {{{ ChatBody }}}
            {{{ ChatFooter }}}
        </div>
        `
    }
}
