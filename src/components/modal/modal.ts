import Block from '../../core/Block.ts'

interface Props {}

export class Modal extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
        })
    }

    protected render() {
        return `
        <div class='modal-conteiner'>
            <form method="dialog" class='modal-body'>
                <h3>Создать новую переписку</h3>
                <div>
                    {{{ Button
                        label="создать"
                    }}}
                    {{{ Button
                        label="отменить"
                    }}}
                </div>
            </form>
        </div>
        `
    }
}
