import Block from '../../core/Block.ts'
import { connect } from '../../core/connect.ts'

interface IProps {
    avatar: string
    title: string
    selectedChat: number
    chat: []
    onOpenSettings: () => void
}

export class ChatHeader extends Block<IProps> {
    constructor(props: IProps) {
        super({
            ...props,
            onOpenSettings: () => {
                window.store.set({ openSettingsChat: true })
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
               {{/if}}
                <div class='user-title'>
                   {{#if selectedChat}}
                    <span class='user-title__title'>${chat.title}</span>
                   {{/if}}
                </div>
            </div>
                {{#if selectedChat}}
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
