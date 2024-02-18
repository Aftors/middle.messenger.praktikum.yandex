import Block from '../../core/Block.ts'

interface IInput {
    name?: string
    onChange: () => void
    events: {
        change: () => void
    }
    avatar: string
}

type Refs = {
    input: HTMLInputElement
}

export class Avatar extends Block<IInput, Refs> {
    constructor(props: IInput) {
        super({
            ...props,
            events: {
                change: props.onChange,
            },
        })
    }

    protected render() {
        const { name = '', avatar } = this.props
        if (avatar !== null) {
            const linkAvatar = `https://ya-praktikum.tech/api/v2/resources${avatar}`
            return `
            <label for="avatar">
                <img class='dialog-list__logo' src=${linkAvatar} alt='avatar'>
                <span>Change</span>
                <Input type="file" id="avatar" name=${name} ref="input"/>
            </label>
            `
        }
        return `
        <label for="avatar">
                <img class='dialog-list__logo' src='/man.png' alt='avatar'>
                <span>Change</span>
                <Input type="file" id="avatar" name=${name} ref="input"/>
            </label>`
    }
}
