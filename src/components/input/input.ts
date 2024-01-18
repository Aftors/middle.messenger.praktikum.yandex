import Block from '../../core/Block.ts'

interface IInput {
    style?: string
    name?: string
    type?: string
    value?: string
    disabled?: boolean
    placeholder: string
    onBlur: () => void
    events: {
        blur: () => void
    }
}

type Refs = {
    input: HTMLInputElement
}

export class Input extends Block<IInput, Refs> {
    constructor(props: IInput) {
        super({
            ...props,
            events: {
                blur: props.onBlur,
            },
        })
    }

    protected render() {
        const {
            style = '',
            name = '',
            type = '',
            placeholder = '',
            value = '',
            disabled = false,
        } = this.props
        return `
        <input
            class='input__element${style}'
            name='${name}'
            type='${type}'
            placeholder='${placeholder}'
            value='${value}'
            ref="input"
           ${disabled}
        />  
        `
    }
}
