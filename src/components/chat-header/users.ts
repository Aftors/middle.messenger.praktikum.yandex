import Block from '../../core/Block.ts'
import { connect } from '../../core/connect.ts'

interface IProps {
    users: Users[]
    onClick: (e: Event) => void
    events: {
        click: (e: Event) => void
    }
}

export class Users extends Block<IProps> {
    constructor(props: IProps) {
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
        const url = 'https://ya-praktikum.tech/api/v2/resources/'
        return `
        <div class='users-conteiner'>
        {{#if selectedChat}}
        {{#each users}} 
                <div class='users' id={{this.id}}>
                      <div class='user-title' id={{this.id}}>
                         <span class='user-title__title' id={{this.id}}>
                         {{#if (isdefined this.displayName)}}
                             {{this.displayName}}
                         {{else}}
                            ID: {{this.id}}
                         {{/if}}</span>
                     </div>
                     <div class='avatar' id={{this.id}}>
                        {{#if (isdefined this.avatar)}}
                            <img src=${url}{{this.avatar}} alt='avatar photo' id={{this.id}}>
                        {{else}}
                            <img src='man.png' alt='avatar photo' id={{this.id}}>
                        {{/if}}
                     </div>
                     <p class='user-title__title' id={{this.id}}>delete</p>
                </div>
         {{/each}}
         {{/if}}
        </div>
        `
    }
}

export default connect(({ selectedChat, users }) => ({
    selectedChat,
    users,
}))(Users)
