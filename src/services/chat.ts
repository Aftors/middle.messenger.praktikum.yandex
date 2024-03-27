import ApiChat from '../api/apiChat.ts'
import { apiHasError } from '../core/apiHasError.ts'
import { transformChats, transformUsers } from '../helpers/apiTransform.ts'
import { User } from '../types/user.ts'

const chatApi = new ApiChat()

type Message = {
    id: number
    user_id: number
    chat_id: number
    type: string
    time: string
    content: string
    is_read: boolean
    file: string | null
}

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

    let pingInterval: number

    socket.addEventListener('open', () => {
        pingInterval = window.setInterval(() => {
            if (window.store.getState('selectedChat') !== chatid) {
                socket.close()
            }
            socket.send(
                JSON.stringify({
                    type: 'ping',
                })
            )
        }, 10000)
        const body = document.getElementById('chat-body') as HTMLDivElement
        body.innerText = ''
        console.log('Соединение установлено')
        socket.send(
            JSON.stringify({
                content: '0',
                type: 'get old',
            })
        )
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
            clearInterval(pingInterval)
        } else {
            console.log('Обрыв соединения')
            clearInterval(pingInterval)
        }
        clearInterval(pingInterval)
        console.log(`Код: ${event.code} | Причина: ${event.reason}`)
    })

    socket.addEventListener('message', event => {
        console.log('Получены данные', event.data)
        let data: Message
        try {
            data = JSON.parse(event.data)
        } catch (error) {
            console.log(error)
            return
        }
        if (data.type === 'pong') {
            return
        }
        const me = window.store.getStateByID('user', 'id')
        const messages = document.getElementById('chat-body')
        if (messages) {
            if (Array.isArray(data)) {
                data.reverse().map((message: Message) => {
                    const div = document.createElement('div')
                    div.classList.add('chat-message')
                    div.classList.add('message_me')
                    if (message.user_id === me) {
                        div.classList.add('send')
                    } else {
                        false
                    }
                    div.innerText = message.content
                    messages.append(div)
                    messages.scrollTop = messages.scrollHeight
                    return true
                })
                return
            }
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
            messages.scrollTop = messages.scrollHeight
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
