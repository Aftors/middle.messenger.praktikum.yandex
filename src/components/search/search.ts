import Block from '../../core/Block.ts'

export class Search extends Block {
    protected render() {
        return `
        <form class='search'>
            <input type='search' placeholder='Search'>
        </form>

        `
    }
}
