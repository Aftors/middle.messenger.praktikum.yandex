import Block from '../../core/Block.ts'
import { connect } from '../../core/connect.ts'
import { createWebSocket, getChatUsers } from '../../services/chat.ts'
import { initChatPage } from '../../services/initApp.ts'

interface Props {
    openDialog: () => void
    onSelectChat: (e: Event) => void
    chats: []
    selectedChat: number
}

export class Dialogs extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            openDialog: () => window.store.set({ openModal: true }),
            onSelectChat: e => {
                const { id } = e.currentTarget as HTMLAnchorElement
                if (id) {
                    try {
                        const me = window.store.getState('user')
                        createWebSocket(Number(id), me)
                        window.store.set({ selectedChat: Number(id) })
                        getChatUsers(Number(id))
                        window.store.set({ chatRun: true })
                    } catch (error) {
                        console.log('не удалось установить соединение')
                    }
                }
            },
        })
        initChatPage()
    }
    protected render() {
        return `
        <div class='dialog-conteiner'>
            {{{ DialogListHeader }}}
            {{{ Button label='Create chat' type='edit' onClick=openDialog}}}
            {{#if openModal}}
                {{{ Modal }}}
            {{/if}}
            {{#each chats}} 
                {{{ DialogItem id=this.id 
                    title=this.title 
                    avatar=this.avatar 
                    time=this.time 
                    subtitle=this.lastMessage.content 
                    badge=this.badge  
                    onClick=../onSelectChat 
                    selectedChat=../selectedChat}}}  
            {{/each}}
        </div>

        `
    }
}

export default connect(({ openModal, chats, selectedChat }) => ({
    openModal,
    chats,
    selectedChat,
}))(Dialogs)
