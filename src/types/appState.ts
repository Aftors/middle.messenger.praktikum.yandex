import { User } from './user.ts'

export type AppState = {
    error: string | null
    user: User | null
    openModal: boolean
}
