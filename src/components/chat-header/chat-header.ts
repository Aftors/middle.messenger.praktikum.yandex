import Block from '../../core/Block.ts'
import { connect } from '../../core/connect.ts'
import { deleteUsersToChat } from '../../services/chat.ts'

interface IProps {
    avatar: string
    title: string
    selectedChat: number
    chat: []
    onOpenSettings: () => void
    onDelleteUser: (e: Event) => void
}

export class ChatHeader extends Block<IProps> {
    constructor(props: IProps) {
        super({
            ...props,
            onOpenSettings: () => {
                window.store.set({ openSettingsChat: true })
            },
            onDelleteUser: e => {
                const target = e.target as HTMLElement
                deleteUsersToChat(Number(target.id))
            },
        })
    }

    protected render() {
        const { selectedChat } = this.props
        let img = 'man2.png'
        const chat = window.store.getChatByID(selectedChat)
        if (chat.avatar) {
            img = chat.avatar
        }
        return `
        <div class='chat-header'>
            <div class='chat-header-dialog'>
               {{#if selectedChat}} 
                    <div class='avatar'>
                      <img src='${img}' alt='avatar photo'>
                    </div>
                    <div class='user-title'>
                        <span class='user-title__title'>${chat.title}</span>
                    </div>
                    {{{ Users onClick=onDelleteUser}}}
            </div>
                    {{{ Button label='• • •' type='send' onClick=onOpenSettings }}}
                {{/if}}
                {{#if openSettingsChat}}
                    {{{ ModalChat selectedChat=selectedChat}}}
                {{/if}}
        </div>

        `
    }
}

export default connect(({ selectedChat, openSettingsChat, chats }) => ({
    selectedChat,
    openSettingsChat,
    chats,
}))(ChatHeader)
