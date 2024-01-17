import Block from '../../core/Block.ts'

interface IButton {
    name: string
    type?: string
    page?: string
    id?: string
    label: string
    onClick: (e: Event) => void
    events: {
        click: (e: Event) => void
    }
}

export class Button extends Block<IButton> {
    constructor(props: IButton) {
        super({
            ...props,
            events: {
                click: e => {
                    if (props.onClick) {
                        props.onClick(e)
                    }
                },
            },
        })
    }
    protected render() {
        const {
            name = '',
            type = '',
            page = '',
            id = '',
            label = '',
        } = this.props
        return `
        <button 
            name='${name}' 
            class='button button__${type}' 
            page='${page}' 
            id='${id}'>
            ${label}
        </button>
        `
    }
}
