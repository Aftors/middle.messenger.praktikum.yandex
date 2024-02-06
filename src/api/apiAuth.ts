import { Fetch } from '../core/fetch.ts'
import { APIError } from '../types/apiError.ts'
import {
    CreateUser,
    LoginRequestData,
    SignUpResponse,
} from '../types/apiTipes.ts'
import { UserDTO } from './dto/user-dto.ts'

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
