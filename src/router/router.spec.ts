import sinon from 'sinon'
import { expect } from 'chai'
import Block from '../core/Block.ts'
import Router from './router.ts'

export interface IPages {
    [key: string]: any
}

describe('Router', () => {
    let TestRouter: Router
    const clock = sinon.useFakeTimers()

    before(() => {
        const router = new Router('app')
        class InitPage extends Block {
            protected render() {
                return "<div id='init-page'></div>"
            }
        }
        class HomePage extends Block {
            protected render() {
                return "<div id='home-page'></div>"
            }
        }
        class ChatPage extends Block {
            protected render() {
                return "<div id='404-page'></div>"
            }
        }

        const pages: IPages = {
            init: InitPage,
            home: HomePage,
            chat: ChatPage,
        }

        router
            .use('/', pages.init)
            .use('/home', pages.home)
            .use('/chat', pages.chat)
            .start()

        TestRouter = router
    })

    beforeEach(() => {
        window.location.assign('')
        clock.restore()
    })

    it('Router go to page', () => {
        TestRouter.go('/chat')
        const expectedPathnameOne = '/chat'
        expect(window.location.pathname).to.be.eq(expectedPathnameOne)

        clock.next()

        TestRouter.go('/home')
        const expectedPathnameTwo = '/home'
        expect(window.location.pathname).to.be.eq(expectedPathnameTwo)
    })

    it('Router change history', () => {
        const historyBefore = window.history.length
        TestRouter.go('/home')
        const historyAfter = window.history.length

        expect(historyAfter).to.be.eq(historyBefore + 1)
    })

    it('Router navigate back', () => {
        TestRouter.go('/')
        clock.next()
        TestRouter.go('/home')
        clock.next()
        TestRouter.back()
        clock.next()

        const expectedPathname = '/home'

        expect(window.location.pathname).to.be.eq(expectedPathname)
    })

    it('Router navigate forward', () => {
        TestRouter.go('/home')
        clock.next()
        TestRouter.back()
        clock.next()
        TestRouter.forward()
        clock.next()

        const expectedPathname = '/home'

        expect(window.location.pathname).to.be.eq(expectedPathname)
    })
})
