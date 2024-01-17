import { navigate } from './core/navigate.ts'
import * as Components from './components/index.ts'
import { registerComponent } from './core/regComponent.ts'

registerComponent('Headline', Components.HeadLine)
registerComponent('Button', Components.Button)
registerComponent('Link', Components.Link)
registerComponent('Input', Components.Input)
registerComponent('ErrorLine', Components.ErrorLine)
registerComponent('InputAuth', Components.InputAuth)
registerComponent('InputMessage', Components.InputMessage)

registerComponent('Dialogs', Components.Dialogs)
registerComponent('DialogListHeader', Components.DialogListHeader)
registerComponent('Search', Components.Search)
registerComponent('DialogItem', Components.DialogItem)

registerComponent('ChatConteiner', Components.ChatConteiner)
registerComponent('ChatHeader', Components.ChatHeader)
registerComponent('ChatBody', Components.ChatBody)
registerComponent('ChatFooter', Components.ChatFooter)
registerComponent('InputMessage', Components.InputMessage)
registerComponent('ChatMessage', Components.ChatMessage)

document.addEventListener('DOMContentLoaded', () => navigate('nav'))
