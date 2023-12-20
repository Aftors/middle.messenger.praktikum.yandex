import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'login': [ Pages.LoginPage ],
  'create': [ Pages.CreatePage ],
  'chat': [ Pages.ChatPage ]
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function route(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => route('login'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    route(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

document.addEventListener('click', e => {
  //@ts-ignore
  const href = e.target.getAttribute('href');
  if (href) {
    route(href);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

//  Хард-код для теста работы error input

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