import Handlebars from 'handlebars';
export { default as NavigationPage } from './navigation.hbs?raw';

Handlebars.registerHelper('nav', () => {
    return [
        { page: 'login', pageName: 'Login page'},
        { page: 'create', pageName: 'Registration page'},
        { page: 'chat', pageName: 'Chat page'},
        { page: 'profile', pageName: 'Profile page'},
        { page: 'password', pageName: 'Change password page'},
        { page: 'page404', pageName: '404 page'},
        { page: 'page500', pageName: '50* page'},
    ]
})
