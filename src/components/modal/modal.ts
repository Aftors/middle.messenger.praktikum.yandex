import Block from '../../core/Block.ts'
import { createChat } from '../../services/chat.ts'
import { ErrorLine } from '../error-line/error-line.ts'
import { InputAuth } from '../input-auth/input-auth.ts'

interface Props {
    onReturn?: (e: Event) => void
    onCreate?: (e: Event) => void
}

type Refs = {
    titleChat: InputAuth
    error: ErrorLine
}

export class Modal extends Block<Props, Refs> {
    constructor(props: Props) {
        super({
            ...props,
            onReturn: () => {
                window.store.set({ openModal: false })
            },
            onCreate: () => {
                const nameChat = this.refs.titleChat.value()
                if (!nameChat) {
                    this.refs.error.setProps({
                        error: 'Field can not be empty',
                    })
                }
                if (nameChat) {
                    this.refs.error.setProps({ error: undefined })
                    window.store.set({ openModal: false })
                    createChat(nameChat)
                        .then(() => true)
                        .catch(() =>
                            this.refs.error.setProps({ error: 'error' })
                        )
                }
            },
        })
    }

    protected render() {
        return `
        <div class='modal-conteiner'>
            <form method="dialog" class='modal-body'>
                <h3>Enter title</h3>
                {{{ InputAuth 
                    label='Title'
                    type='text'
                    name='title'
                    disabled=false
                    ref='titleChat'
                 }}}
                {{{ ErrorLine error=error ref="error" style=this.style }}}
                <div class='modal-button'>
                {{{ Button label='Return' type='return' onClick=onReturn }}}
                {{{ Button label='Create' type='return' onClick=onCreate }}}
                </div>
            </form>
        </div>
        `
    }
}
