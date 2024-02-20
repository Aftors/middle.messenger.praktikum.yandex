import { JSDOM } from 'jsdom'
import * as Components from './src/components/index.ts'
import { registerComponent } from './src/core/regComponent.ts'
import { Store } from './src/core/Store.ts'

Object.entries(Components).forEach(([componentName, component]) =>
    registerComponent(componentName, component)
)

const jsdom = new JSDOM(`<body></body>`, { url: 'https://localhost:3000' })

global.history = jsdom.window.history
global.sessionStorage = jsdom.window.sessionStorage
global.window = jsdom.window
global.document = jsdom.window.document
global.Node = jsdom.window.Node
global.MouseEvent = jsdom.window.MouseEvent
global.XMLHttpRequest = window.XMLHttpRequest
global.FormData = jsdom.window.FormData
