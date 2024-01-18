import Block from '../../core/Block.ts'
import { ErrorLine } from '../error-line/error-line.ts'
import { Input } from '../input/input.ts'

interface IInput {
    style?: string
    label?: string
    type?: string
    error: string
    disabled?: string
    value: string
    name: string
    onBlur?: () => void
    validate?: (value: string) => string
}

type Ref = {
    input: Input
    error: ErrorLine
}

export class InputAuth extends Block<IInput, Ref> {
    constructor(props: IInput) {
        super({
            ...props,
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
            value = '',
            name = '',
        } = this.props
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
