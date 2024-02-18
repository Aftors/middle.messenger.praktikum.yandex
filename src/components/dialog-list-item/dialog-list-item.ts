import Block from '../../core/Block.ts'
import { connect } from '../../core/connect.ts'

interface IPropsItem {
    avatar?: string
    title?: string
    time?: string
    subtitle?: string
    badge?: string
    id: number
    selectedChat: number
    onClick: (e: Event) => void
    events: {
        click: (e: Event) => void
    }
}

export class DialogItem extends Block<IPropsItem> {
    constructor(props: IPropsItem) {
        super({
            ...props,
            events: {
                click: e => {
                    if (props.onClick) {
                        props.onClick(e)
                    }
                },
            },
        })
    }

    protected render() {
        const { avatar, title, time, subtitle, badge, id, selectedChat } =
            this.props
        let selected = ''
        if (id === selectedChat) {
            selected = 'selected'
        }
        let img = ''
        if (!avatar || avatar === null) {
            img = 'man2'
        }
        if (avatar) {
            img = `https://ya-praktikum.tech/api/v2/resources/${avatar}`
        }
        return `
        <a class='dialog-item ${selected}' id='${id}'>
            <div class='avatar'>
                <img src='${img}.png' alt='avatar photo'>
             </div>
            <div class='dialog-body'>
                <div class='dialog-title-row'>
                    <div class='user-title'>
                        <span class='user-title__title'>${title}</span>
                    </div>
                    <div class='dialog-title-details'>
                        <span class='message-status'></span>
                        {{#if time}}
                            <span class='message-time'>${time}</span>
                        {{/if}}
                    </div>
                </div>
                <div class='dialog-subtitle'>
                    <div class='dialog-subtitle-row'>
                        {{#if subtitle}}
                            <span class='dialog-subtitle__span'>
                               ${subtitle}
                            </span>
                        {{/if}}
                        {{#if badge}}
                            <div class='dialog-subtitle-badge'>${badge}</div>
                        {{/if}}
                    </div>
                </div>
            </div>
        </a>

                `
    }
}

export default connect(({ selectedChat, chats }) => ({
    selectedChat,
    chats,
}))(DialogItem)
