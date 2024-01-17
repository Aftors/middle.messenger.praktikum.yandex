import Block from '../../core/Block.ts'
import { InputMessage } from '../input-message/input-message.ts'
import * as validators from '../../core/validator.ts'

interface IProps {
    validate: {
        message: (value: string) => boolean | string
    }
    onSend: (e: Event) => void
}

type Ref = {
    message: InputMessage
}

export class ChatFooter extends Block<IProps, Ref> {
    constructor() {
        super({
            validate: {
                message: validators.message,
            },
            onSend: event => {
                event.preventDefault()
                const message = this.refs.message.value()
                if (!message) {
                    return
                }
                this.refs.message.setProps({ value: '' })
                console.log({
                    message,
                })
            },
        })
    }

    protected render() {
        return `
        <div class='chat-footer'>
            <object type='image/svg+xml' data='clip.svg' class='clip'></object>
            {{{ InputMessage ref='message' validate=validate.message  }}}
            {{{ Button name='send' type='send' label='➞' onClick=onSend }}}
        </div>
   
        `
    }
}
