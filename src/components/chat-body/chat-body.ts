import Block from '../../core/Block.ts'
import { messages } from '../../props/props.message.ts'

export class ChatBody extends Block {
    constructor() {
        super({
            message: messages,
        })
    }

    protected render() {
        return `
        <div class='chat-body'>
        {{#each message}}
            {{{ ChatMessage type=this.type text=this.text img=this.img }}}
        {{/each}}
        </div>
        `
    }
}
