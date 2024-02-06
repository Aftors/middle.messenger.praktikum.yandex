import Block, { TypeRef } from './Block.ts'
import { StoreEvents } from './Store.ts'
import { AppState } from '../types/appState.ts'
import isEqual from '../helpers/isEqual.ts'

export function connect(
    mapStateToProps: (state: AppState) => Partial<AppState>
) {
    return function <P extends object, R extends TypeRef>(
        Component: typeof Block<P, R>
    ) {
        return class extends Component {
            private onChangeStoreCallback: () => void
            constructor(props: P) {
                const { store } = window
                let state = mapStateToProps(store.getState())

                super({ ...props, ...state })

                this.onChangeStoreCallback = () => {
                    const newState = mapStateToProps(store.getState())
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState })
                    }
                    state = newState
                }
                store.on(StoreEvents.Updated, this.onChangeStoreCallback)
            }

            componentWillUnmount() {
                super.componentWillUnmount()
                window.store.off(
                    StoreEvents.Updated,
                    this.onChangeStoreCallback
                )
            }
        }
    }
}
