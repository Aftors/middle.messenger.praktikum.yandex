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
        const state = this.state[key]
        return state[value]
    }

    public set(nextState: Partial<State>) {
        const prevState = { ...this.state }

        this.state = { ...this.state, ...nextState }

        this.emit(StoreEvents.Updated, prevState, nextState)
    }
}
