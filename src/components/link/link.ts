import Block from '../../core/Block.ts'

interface IAuthLink {
    text?: string
    label: string
    href?: string
    type?: string
    onClick: (e: Event) => void
    events: {
        click: (e: Event) => void
    }
}

export class Link extends Block<IAuthLink> {
    constructor(props: IAuthLink) {
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
        const { text = '', label = '', href = '', type = '' } = this.props
        return `
                <p class='link${type}'>
                    ${text}
                    <a href='${href}'>
                    ${label}
                    </a>
                </p>
                `
    }
}
