import { Chat } from '../types/appState.ts'
import EventBus from './EventBus.ts'

// eslint-disable-next-line no-shadow
export enum StoreEvents {
    Updated = 'Updated',
}

export class Store<State extends Record<string, any>> extends EventBus {
    private state: State = {} as State

    constructor(defaultState: State) {
        super()

        this.state = defaultState
        this.set(defaultState)
    }

    public getState(key?: string) {
        if (key) {
            if (this.state[key] === undefined) {
                return this.state
            }
            return this.state[key]
        }
        return this.state
    }

    public getStateByID(key: string, value: string) {
        if (value === 'avatar') {
            const state = this.state[key]
            const avatar = `https://ya-praktikum.tech/api/v2/resources${state[value]}`
            return state[value] === null ? 'man.png' : avatar
        }
        const state = this.state[key]
        return state[value]
    }

    public getChatByID(id: number) {
        const state = this.state.chats
        if (id === null) {
            return ''
        }
        return state.find((chat: Chat) => chat.id === id)
    }

    public set(nextState: Partial<State>) {
        const prevState = { ...this.state }

        this.state = { ...this.state, ...nextState }

        this.emit(StoreEvents.Updated, prevState, nextState)
    }
}
