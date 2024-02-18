import { Fetch } from '../core/fetch.ts'
import { APIError } from '../types/apiError.ts'
import { UserDTO } from './dto/user-dto.ts'
import { UsersDTO } from './dto/users-dto.ts'

export type CreateChat = {
    title: string
}

export type CreateChatResponse = {
    title: string
}

type LastMessage = {
    user: UserDTO
    time: string
    content: string
}
export type ChatDTO = {
    id: number
    title: string
    avatar: string | null
    unread_count: number
    last_message: LastMessage | null
}

type ResultDelete = {
    id: number
    title: string
    avatar: string
    created_by: number
}

export type DeleteChatResponse = {
    userId: number
    result: ResultDelete
}

export type DeleteData = {
    chatId: number
}

export type addUserData = {
    users: number[]
    chatId: number
}

export type addUserDataResponse = {
    reason: string
}

export type tokenResponse = {
    token: string
}

const apiChat = new Fetch('/chats')

export default class ApiChat {
    async getChats(): Promise<ChatDTO[] | APIError> {
        return apiChat.get<ChatDTO[]>('')
    }

    async createChat(data: CreateChat): Promise<void | APIError> {
        return apiChat.post<void>('/', { data })
    }

    async deleteChat(data: DeleteData): Promise<DeleteChatResponse | APIError> {
        return apiChat.delete<DeleteChatResponse>('/', { data })
    }

    async addUsers(data: addUserData): Promise<addUserDataResponse | APIError> {
        return apiChat.put<addUserDataResponse>('/users', { data })
    }

    async deleteUsers(
        data: addUserData
    ): Promise<addUserDataResponse | APIError> {
        return apiChat.delete<addUserDataResponse>('/users', { data })
    }

    async getChatUsers(data: number): Promise<UsersDTO[] | APIError> {
        return apiChat.get<UsersDTO[]>(`/${data}/users`)
    }

    async getToken(data: number): Promise<tokenResponse | APIError> {
        return apiChat.post<tokenResponse>(`/token/${data}`)
    }
}
