import Block from '../../core/Block.ts'

interface IPropsMessage {
    type?: string
    img?: string
    text?: string
}

export class ChatMessage extends Block<IPropsMessage> {
    constructor(props: IPropsMessage) {
        super({
            ...props,
        })
    }
    protected render() {
        const { type = '', img, text } = this.props
        return `
        <div class='chat-message ${type}'>
            {{#if img}}
                <img src='${img}' alt='send foto'>
            {{/if}}
            {{#if text}}
                <p>
                    ${text}
                </p>
            {{/if}}
            <span class='message-time'>14:44</span>
        </div>

        `
    }
}
