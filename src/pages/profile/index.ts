import Handlebars from 'handlebars';
export { default as ProfilePage } from './profile.hbs?raw';


Handlebars.registerHelper('list', () => {
    return [
        { label: 'Email', value: 'white@yandex.ru', type: 'text', name: 'email', disabled: true },
        { label: 'Login', value: 'whiteBlack', type: 'text', name: 'login', disabled: true },
        { label: 'Name', value: 'white', type: 'text', name: 'first_name', disabled: true },
        { label: 'Second name', value: 'Black', type: 'text', name: 'second_name', disabled: true },
        { label: 'Display name', value: 'Cucumber', type: 'text', name: 'display_name', disabled: true },
        { label: 'Phone', value: '+7 (981) 955-85-28', type: 'text', name: 'phone', disabled: true },
    ]
})

addEventListener('click', e => {
    //@ts-ignore
    if(e.target.id == 'edit') {
      let inputs = document.querySelectorAll('.profile-form input[type="text"]'),
      flag = true;
      //@ts-ignore
      inputs.forEach(input => {
            //@ts-ignore
          if(input.disabled) {
            //@ts-ignore
            input.disabled = false;
            flag = !flag;
          } else {
            //@ts-ignore
            input.disabled = true;
            flag = !flag;
          }
      });
    }
 });
