import Block from '../../core/Block.ts'

interface IProps {
    label: string
    span?: string
}

export class HeadLine extends Block<IProps> {
    protected render() {
        const { label, span = '' } = this.props
        return `
        <h1>${label}<span>${span}</span></h1>
        `
    }
}
