import Block from '../core/Block.ts'

export const renderComponent = (query: string, component: Block) => {
    const root = document.getElementById(query)

    if (root) {
        root.appendChild(component.getContent()!)
    }

    component.dispatchComponentDidMount()

    return root
}
