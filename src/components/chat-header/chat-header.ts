import Block from '../../core/Block.ts'

export class ChatHeader extends Block {
    protected render() {
        return `
        <div class='chat-header'>
            <div class='chat-header-dialog'>
                <div class='avatar'>
                    <img src='man2.png' alt='avatar photo'>
                </div>
                <div class='user-title'>
                    <span class='user-title__title'>Buy / Sell</span>
                </div>
            </div>
            <object type='image/svg+xml' data='dots.svg' class='dots'></object>
        </div>

        `
    }
}
