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
        type: 'text',
        name: 'email',
        disabled: true,
        validate: validate.email,
        ref: 'email',
    },
    {
        label: 'Login',
        type: 'text',
        name: 'login',
        disabled: true,
        validate: validate.login,
        ref: 'login',
    },
    {
        label: 'Name',
        type: 'text',
        name: 'firstName',
        disabled: true,
        validate: validate.name,
        ref: 'firstName',
    },
    {
        label: 'Second name',
        type: 'text',
        name: 'secondName',
        disabled: true,
        validate: validate.name,
        ref: 'secondName',
    },
    {
        label: 'Display name',
        type: 'text',
        name: 'displayName',
        disabled: true,
        ref: 'displayName',
    },
    {
        label: 'Phone',
        type: 'text',
        name: 'phone',
        disabled: true,
        validate: validate.phone,
        ref: 'phone',
    },
]
