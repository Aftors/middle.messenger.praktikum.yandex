import { UserDTO } from '../api/dto/user-dto.ts'
import { User } from '../types/user.ts'
// import constants from '../api/constants.ts'

export const transformUser = (data: UserDTO): User => ({
    id: data.id,
    login: data.login,
    first_name: data.first_name,
    second_name: data.second_name,
    display_name: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
})
