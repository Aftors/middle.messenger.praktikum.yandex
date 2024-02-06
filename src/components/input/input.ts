import Block from '../../core/Block.ts'

interface IInput {
    style?: string
    name?: string
    type?: string
    id: string
    value?: string
    disabled?: boolean
    placeholder: string
    onBlur: () => void
    onChange: () => void
    events: {
        blur: () => void
        change: () => void
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
                change: props.onChange,
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
            id = '',
        } = this.props
        return `
        <input
            class='input__element${style}'
            name='${name}'
            id='${id}'
            type='${type}'
            placeholder='${placeholder}'
            value='${value}'
            ref="input"
           ${disabled}
        />  
        `
    }
}
