import Block from '../../core/Block.ts'

interface IPropsItem {
    avatar?: string
    title?: string
    time?: string
    subtitle?: string
    badge?: string
}

export class DialogItem extends Block<IPropsItem> {
    constructor(props: IPropsItem) {
        super({
            ...props,
        })
    }

    protected render() {
        const { avatar, title, time, subtitle, badge } = this.props
        return `
        <a class='dialog-item'>
            <div class='avatar'>
                <img src='${avatar}.png' alt='avatar photo'>
             </div>
            <div class='dialog-body'>
                <div class='dialog-title-row'>
                    <div class='user-title'>
                        <span class='user-title__title'>${title}</span>
                    </div>
                    <div class='dialog-title-details'>
                        <span class='message-status'></span>
                        <span class='message-time'>${time}</span>
                    </div>
                </div>
                <div class='dialog-subtitle'>
                    <div class='dialog-subtitle-row'>
                        <span class='dialog-subtitle__span'>
                           ${subtitle}
                        </span>
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
