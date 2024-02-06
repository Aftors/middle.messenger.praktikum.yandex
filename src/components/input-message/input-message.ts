import Block from '../../core/Block.ts'
import { Input } from '../input/input.ts'

interface IProps {
    onBlur?: () => void
    validate?: (value: string) => string
    onSendMessage: (e: Event) => void
}

type Ref = {
    input: Input
}

export class InputMessage extends Block<IProps, Ref> {
    constructor() {
        super({
            onBlur: () => this.validate(),
            onSendMessage: event => {
                event.preventDefault()
            },
        })
    }

    public value() {
        if (!this.validate()) {
            return null
        }
        return (this?.refs?.input?.element as HTMLInputElement).value
    }

    private validate() {
        const { value } = this.refs.input.element as HTMLInputElement
        const error = this.props.validate?.(value)
        if (error) {
            return false
        }
        return true
    }

    protected render() {
        return `
        <form class='input-message-form' onsubmit=onSendMessage>
            {{{ Input name='message' style='__message' placeholder='Message' id='areaMessages' ref="input" onBlur=onBlur}}}
            {{{ Button name='send' type='send' label='➞' onClick=onSendMessage id='send-message' }}}
        </form>
        `
    }
}
