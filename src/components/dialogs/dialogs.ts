import Block from '../../core/Block.ts'

export class Dialogs extends Block {
    protected render() {
        return `
        <div class='dialog-conteiner'>
            {{{ DialogListHeader }}}
            {{{ Search }}}
            {{#each listDialog}} 
                {{{ DialogItem title=this.title avatar=this.avatar time=this.time subtitle=this.subtitle badge=this.badge }}}  
            {{/each}}
        </div>

        `
    }
}
