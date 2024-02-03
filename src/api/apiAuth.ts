import { Fetch } from '../core/fetch.ts'
import { UserDTO } from './dto/user-dto.ts'

export type APIError = {
    reason: string
}

export type SignUpResponse = {
    id: number
}

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'> & {
    password: string
}

export type LoginRequestData = {
    login: string
    password: string
}

const authApi = new Fetch('/auth')

export default class AuthApi {
    async getMe(): Promise<UserDTO | APIError> {
        return authApi.get('/user')
    }

    async create(data: CreateUser): Promise<SignUpResponse> {
        return authApi.post<SignUpResponse>('/signup', { data })
    }

    async login(data: LoginRequestData): Promise<void | APIError> {
        return authApi.post('/signin', { data })
    }

    async logout(): Promise<void | APIError> {
        return authApi.post('/logout')
    }
}
