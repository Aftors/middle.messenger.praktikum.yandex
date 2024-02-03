import { Fetch } from '../core/fetch.ts'
import { APIError } from '../types/apiError.ts'
import { UserDTO } from './dto/user-dto.ts'

const apiSettings = new Fetch('/user/')

export interface ChangeUser {
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
}

export type ChangeResponse = {
    id: number
    first_name: string
    second_name: string
    display_name: string
    phone: string
    login: string
    avatar: string
    email: string
}

export default class ApiSettings {
    async get(): Promise<UserDTO | APIError> {
        const { id } = window.store.getState('user')
        return apiSettings.get(String(id))
    }

    async change(data: ChangeUser): Promise<ChangeResponse> {
        return apiSettings.put<ChangeResponse>('profile', { data })
    }
}
