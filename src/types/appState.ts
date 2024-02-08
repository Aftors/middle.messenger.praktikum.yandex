import { User } from './user.ts'

export type AppState = {
    error: string | null
    user: User | null
    openModal: boolean
    openSettingsChat: boolean
    chats: Chat[]
    selectedChat: number | null
    chatRun: boolean
    users: Users[]
}

export type Users = {
    id: number
    firstName: string
    secondName: string
    displayName: string
    login: string
    avatar: string
    role: string
}

export type Nullable<T> = T | null

export type Keys<T extends Record<string, unknown>> = keyof T
export type Values<T extends Record<string, unknown>> = T[Keys<T>]

type LastMessage = {
    user: User
    time: string
    content: string
}

export type Chat = {
    id: number
    title: string
    avatar: Nullable<string>
    unreadCount: number
    lastMessage: LastMessage | null
}
