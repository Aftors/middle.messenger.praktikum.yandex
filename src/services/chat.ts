import ApiChat from '../api/apiChat.ts'
import { apiHasError } from '../core/apiHasError.ts'
import { transformChats, transformUsers } from '../helpers/apiTransform.ts'
import { User } from '../types/user.ts'

const chatApi = new ApiChat()

const getChats = async () => {
    const responseChat = await chatApi.getChats()
    if (apiHasError(responseChat)) {
        throw Error(responseChat.reason)
    }

    return transformChats(responseChat)
}

const createChat = async (title: string) => {
    const response = await chatApi.createChat({ title })
    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    const responseChat = await chatApi.getChats()
    if (apiHasError(responseChat)) {
        throw Error(responseChat.reason)
    }

    const chats = await getChats()
    window.store.set({ chats })
}

const deleteChat = async (id: number) => {
    const response = await chatApi.deleteChat({ chatId: id })
    if (apiHasError(response)) {
        throw Error(response.reason)
    }

    const chats = await getChats()
    window.store.set({ chats })
}

const getChatUsers = async (id: number) => {
    const response = await chatApi.getChatUsers(id)
    if (apiHasError(response)) {
        throw Error(response.reason)
    }
    window.store.set({ users: transformUsers(response) })
}

const addUsersToChat = async (users: string, chat: number) => {
    const usersArray = users.split(' ').map(el => Number(el))
    const data = { users: usersArray, chatId: chat }
    const response = await chatApi.addUsers(data)
    if (apiHasError(response)) {
        window.store.set({ error: 'Failed to add users' })
        throw Error(response.reason)
    }
    const chats = await getChats()
    getChatUsers(chat)
    window.store.set({ openSettingsChat: false })
    window.store.set({ chats })
}

const deleteUsersToChat = async (usersID: number) => {
    const me = window.store.getState('user')
    if (me.id === usersID) {
        return
    }
    const selectedChat = window.store.getState('selectedChat')
    const data = { users: [usersID], chatId: selectedChat }
    const response = await chatApi.deleteUsers(data)
    if (apiHasError(response)) {
        throw Error(response.reason)
    }
    getChatUsers(selectedChat)
}

const createWebSocket = async (chatid: number, user: User) => {
    const response = await chatApi.getToken(chatid)
    if (apiHasError(response)) {
        throw Error(response.reason)
    }
    const socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatid}/${response.token}`
    )
    socket.addEventListener('open', () => {
        console.log('Соединение установлено')
        const sendBtn = document.getElementById('send-message')
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                const textArea = document.getElementById(
                    'areaMessages'
                ) as HTMLInputElement
                if (textArea && textArea.value !== '') {
                    socket.send(
                        JSON.stringify({
                            content: textArea.value,
                            type: 'message',
                        })
                    )
                    textArea.value = ''
                }
            })
        }
    })
    socket.addEventListener('close', event => {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто')
        } else {
            console.log('Обрыв соединения')
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`)
    })

    socket.addEventListener('message', event => {
        console.log('Получены данные', event.data)

        const data = JSON.parse(event.data)

        const me = window.store.getStateByID('user', 'id')

        const messages = document.getElementById('chat-body')
        if (messages) {
            const div = document.createElement('div')
            div.classList.add('chat-message')
            div.classList.add('message_me')
            if (data.user_id === me) {
                div.classList.add('send')
            } else {
                false
            }
            div.innerText = data.content
            messages.append(div)
        }
    })
}

export {
    createChat,
    getChats,
    deleteChat,
    addUsersToChat,
    deleteUsersToChat,
    createWebSocket,
    getChatUsers,
}
