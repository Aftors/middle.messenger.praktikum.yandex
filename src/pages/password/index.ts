import Handlebars from 'handlebars';
export { default as PasswordPage } from './password.hbs?raw';

Handlebars.registerHelper('passwordList', () => {
    return [
        { label: 'Old password', value: 'dfdf', type: 'password', name: 'oldPassword' },
        { label: 'New password', value: 'qwerty', type: 'password', name: 'newPassword' },
        { label: 'Password again', value: 'qwerty', type: 'password', name: 'newPasswordAgain' }
    ]
})
