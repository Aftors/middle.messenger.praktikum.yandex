import Block from '../../core/Block.ts'

interface Props {
    error: string
    style: string
}

type Ref = {}

export class ErrorLine extends Block<Props, Ref> {
    protected render(): string {
        return `
            <span class='input__text-error text-error{{ style }}'>{{ error }}</span>
        `
    }
}

export default ErrorLine
