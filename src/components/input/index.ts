export { default as Input } from './input.hbs?raw';

document.addEventListener('input', e => {
    //@ts-ignore
    if( e.target.name == 'password') {
    //@ts-ignore
      e.target.className = 'input__error input__element'
    const node = document.querySelector('input[name=password]')
    //@ts-ignore
    node.closest('label').className = 'input__container input__error'
    }
    //@ts-ignore
    if(e.target.value.length === 0) {
    const node = document.querySelector('input[name=password]')
    //@ts-ignore
    node.closest('label').className = 'input__container'
    }
  })
