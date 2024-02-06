import ApiChat from '../api/apiChat.ts'
import { User } from '../types/user.ts'

const chatApi = new ApiChat()

export const createWebSocket = async (chatid: number, user: User) => {
    const resp = await getToken(chatid)
    const socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatid}/${resp.token}`
    )

    socket.addEventListener('open', () => {
        console.log('Соединение установлено')

        const sendBtn = document.getElementById('send-message')
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                const textArea = document.getElementById('type-messages')
                socket.send(
                    JSON.stringify({
                        content: textArea.value,
                        type: 'message',
                    })
                )
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

        const messages = document.getElementById('chats')
        const div = document.createElement('div')

        div.classList.add('message')

        // eslint-disable-next-line no-undef
        if (data.user_id === me.id) {
            div.classList.add('message_me')
        }
        div.innerText = data.content

        messages.append(div)
    })

    socket.addEventListener('error', event => {
        console.log('Ошибка', event.message)
    })
}
function getToken(chatid: number) {
    throw new Error('Function not implemented.')
}
