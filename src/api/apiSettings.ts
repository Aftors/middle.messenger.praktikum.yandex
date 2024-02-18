import { Fetch } from '../core/fetch.ts'
import { APIError } from '../types/apiError.ts'
import {
    ChangePass,
    ChangePassResponse,
    ChangeResponse,
    ChangeUser,
} from '../types/apiTipes.ts'
import { UserDTO } from './dto/user-dto.ts'

const apiSettings = new Fetch('/user/')

export default class ApiSettings {
    async get(): Promise<UserDTO | APIError> {
        const { id } = window.store.getState('user')
        return apiSettings.get(String(id))
    }

    async change(data: ChangeUser): Promise<ChangeResponse> {
        return apiSettings.put<ChangeResponse>('profile', { data })
    }

    async changePass(data: ChangePass): Promise<ChangePassResponse> {
        return apiSettings.put<ChangePassResponse>('password', { data })
    }

    async changeAvatar(data: object): Promise<UserDTO> {
        return apiSettings.put<UserDTO>('profile/avatar', { data })
    }
}
