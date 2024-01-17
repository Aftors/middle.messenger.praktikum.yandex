import Block from '../../core/Block.ts'
import { Input } from '../input/input.ts'

interface IProps {
    onBlur?: () => void
    validate?: (value: string) => string
}

type Ref = {
    input: Input
}

export class InputMessage extends Block<IProps, Ref> {
    constructor() {
        super({
            onBlur: () => this.validate(),
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
        <form class='input-message-form' >
            {{{ Input name='message' style='__message' placeholder='Message' ref="input" onBlur=onBlur}}}
        </form>
        `
    }
}
