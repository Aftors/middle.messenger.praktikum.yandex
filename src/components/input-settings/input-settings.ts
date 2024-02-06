import Block from '../../core/Block.ts'
import { connect } from '../../core/connect.ts'
import { ErrorLine } from '../error-line/error-line.ts'
import { Input } from '../input/input.ts'

interface IInput {
    style?: string
    label?: string
    type?: string
    error: string
    disabled?: string
    name: string
    user?: { [key: string]: string }
    onBlur?: () => void
    validate?: (value: string) => string
    me: { [key: string]: string }
}

type Ref = {
    input: Input
    error: ErrorLine
}

export class InputSettings extends Block<IInput, Ref> {
    constructor(props: IInput) {
        super({
            ...props,
            onBlur: () => this.validate(),
            user: window.store.getState('user'),
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
            this.refs.error.setProps({ error })
            return false
        }
        this.refs.error.setProps({ error: undefined })
        return true
    }

    protected render() {
        const {
            style = '',
            label,
            type = 'text',
            disabled = false,
            name = '',
            user,
        } = this.props
        let value = ''
        if (user === undefined || null) {
            value = ''
        }
        if (user) {
            value = user[name]
        }
        return `
        <div class='input${style} {{#if error}}input__error{{/if}}' >
        <label class='input__container${style}'>
            {{{ Input ref="input" onBlur=onBlur type='${type}' style='${style}' disabled='${disabled}' value='${value}' name='${name}'}}}
            <div class='input__label${style}'>${label}</div>
            {{{ ErrorLine error=error ref="error" style=this.style }}}
        </label>
        </div>
    
        `
    }
}

export default connect(({ user }) => ({ user }))(InputSettings)
