import Block from '../../core/Block.ts'
import { addUsersToChat, deleteChat } from '../../services/chat.ts'
import { ErrorLine } from '../error-line/error-line.ts'
import { InputAuth } from '../input-auth/input-auth.ts'

interface Props {
    onReturn: (e: Event) => void
    onDeleteChat: (e: Event) => void
    addUserToChat: (e: Event) => void
    selectedChat: number
}

type Refs = {
    addUsers: InputAuth
    error: ErrorLine
}

export class ModalChat extends Block<Props, Refs> {
    constructor(props: Props) {
        super({
            ...props,
            onReturn: () => {
                window.store.set({ openSettingsChat: false })
            },
            onDeleteChat: e => {
                e.preventDefault()
                deleteChat(this.props.selectedChat)
                window.store.set({ openSettingsChat: false })
                window.store.set({ selectedChat: null })
            },
            addUserToChat: e => {
                e.preventDefault()
                const idUser = this.refs.addUsers.value()
                if (!idUser) {
                    this.refs.error.setProps({
                        error: 'Field can not be empty',
                    })
                }
                if (idUser) {
                    this.refs.error.setProps({
                        error: undefined,
                    })
                    addUsersToChat(idUser.toString(), this.props.selectedChat)
                }
            },
        })
    }

    protected render() {
        const { selectedChat } = this.props
        const chat = window.store.getChatByID(selectedChat)
        return `
        <div class='modal-conteiner'>
            <form method="settingsChat" class='modal-body'>
                <h3>${chat.title}</h3>
                    {{{ InputAuth 
                        label='Add users to chat by ID'
                        type='text'
                        name='title'
                        disabled=false
                        ref='addUsers'
                     }}}
                    {{{ ErrorLine error=error ref="error" style=this.style }}}
                    {{{ Button label='Add user' type='return' onClick=addUserToChat }}}
                <div class='modal-button'>
                {{{ Button label='Return' type='return' onClick=onReturn }}}
                {{{ Button label='Delete Chat' type='warn' onClick=onDeleteChat }}}
                </div>
            </form>
        </div>
        `
    }
}
