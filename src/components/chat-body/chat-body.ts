import Block from '../../core/Block.ts'
import { connect } from '../../core/connect.ts'
import { messages } from '../../props/props.message.ts'

export class ChatBody extends Block {
    constructor() {
        super({
            message: messages,
        })
    }

    protected render() {
        return `
        <div class='chat-body'id='chat-body'>    
        </div>
        `
    }
}

export default connect(({ selectedChat }) => ({
    selectedChat,
}))(ChatBody)
