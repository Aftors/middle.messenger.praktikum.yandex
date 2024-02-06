import { UserDTO } from '../api/dto/user-dto.ts'

export type ChangeUser = {
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
}

export type ChangePass = {
    oldPassword: string
    newPassword: string
}

export type ChangePassResponse = {
    oldPassword: string
    newPassword: string
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
