import Block from '../../core/Block.ts'
import * as validators from '../../core/validator.ts'
import { connect } from '../../core/connect.ts'
import { InputMessage } from '../input-message/input-message.ts'

interface IProps {
    validate: {
        message: (value: string) => boolean | string
    }
    onSendMessage: (e: Event) => void
    chatRun: boolean
}

type Ref = {
    message: InputMessage
}

export class ChatFooter extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            validate: {
                message: validators.message,
            },
        })
    }

    protected render() {
        return `
            {{#if chatRun}}
            <div class='chat-footer'>
                <object type='image/svg+xml' data='clip.svg' class='clip'></object>
                {{{ InputMessage ref='message' validate=validate.message }}}
            </div>
            {{/if}}
            <div></div>
        `
    }
}

export default connect(({ chatRun }) => ({ chatRun }))(ChatFooter)
