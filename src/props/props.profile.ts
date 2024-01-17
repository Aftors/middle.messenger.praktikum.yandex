import * as validators from '../core/validator.ts'

const validate = {
    login: validators.login,
    password: validators.password,
    passwordTwo: validators.passwordTwo,
    email: validators.email,
    phone: validators.phone,
    name: validators.name,
}

export const list = [
    {
        label: 'Email',
        value: 'white@yandex.ru',
        type: 'text',
        name: 'email',
        disabled: true,
        validate: validate.email,
        ref: 'email',
    },
    {
        label: 'Login',
        value: 'whiteBlack',
        type: 'text',
        name: 'login',
        disabled: true,
        validate: validate.login,
        ref: 'login',
    },
    {
        label: 'Name',
        value: 'White',
        type: 'text',
        name: 'first_name',
        disabled: true,
        validate: validate.name,
        ref: 'firstName',
    },
    {
        label: 'Second name',
        value: 'Black',
        type: 'text',
        name: 'second_name',
        disabled: true,
        validate: validate.name,
        ref: 'secondName',
    },
    {
        label: 'Display name',
        value: 'Cucumber',
        type: 'text',
        name: 'display_name',
        disabled: true,
        ref: 'displayName',
    },
    {
        label: 'Phone',
        value: '+798184543223',
        type: 'text',
        name: 'phone',
        disabled: true,
        validate: validate.phone,
        ref: 'phone',
    },
]
