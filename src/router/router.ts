import Block from '../core/Block.ts'
import Route from './route.ts'

class Router {
    protected routes: Route[] = []

    private static __instance: Router

    protected history: History = window.history

    private _currentRoute: Route | null = null

    private readonly _rootQuery: string = ''

    constructor(rootQuery: string) {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance
        }

        this.routes = []
        this.history = window.history
        this._currentRoute = null
        this._rootQuery = rootQuery

        Router.__instance = this
    }

    public use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery })

        this.routes.push(route)
        return this
    }

    public start() {
        window.onpopstate = (event: Event) => {
            const target = event.currentTarget as Window
            this._onRoute(target.location.pathname)
        }

        this._onRoute(window.location.pathname)
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname)

        if (!route) {
            return
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave()
        }

        this._currentRoute = route

        sessionStorage.setItem('sessionRoute', window.location.pathname)

        route.render()
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname)
        this._onRoute(pathname)
    }

    public back() {
        this.history.back()
    }

    public forward() {
        this.history.forward()
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname))
    }
}

export default Router
