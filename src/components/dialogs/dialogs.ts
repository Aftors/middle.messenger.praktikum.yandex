import Block from '../../core/Block.ts'
import { connect } from '../../core/connect.ts'

interface Props {
    openDialog: () => void
}

export class Dialogs extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            openDialog: () => window.store.set({ openModal: true }),
        })
    }
    protected render() {
        return `
        <div class='dialog-conteiner'>
            {{{ DialogListHeader }}}
            {{{ Button label='Create chat' type='edit' onClick=openDialog}}}
            {{#if openModal}}
                {{{ Modal }}}
            {{/if}}
            {{{ Search }}}
            {{#each listDialog}} 
                {{{ DialogItem title=this.title avatar=this.avatar time=this.time subtitle=this.subtitle badge=this.badge }}}  
            {{/each}}
        </div>

        `
    }
}

export default connect(({ openModal }) => ({ openModal }))(Dialogs)
