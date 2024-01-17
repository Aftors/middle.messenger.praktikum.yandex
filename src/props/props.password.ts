import * as validators from '../core/validator.ts'

const validate = {
    password: validators.password,
}

export const passwordList = [
    {
        label: 'Old password',
        value: '',
        type: 'password',
        name: 'oldPassword',
        validate: validate.password,
        ref: 'passwordOld',
    },
    {
        label: 'New password',
        value: '',
        type: 'password',
        name: 'newPassword',
        validate: validate.password,
        ref: 'password',
    },
    {
        label: 'Password again',
        value: '',
        type: 'password',
        name: 'newPasswordAgain',
        validate: validate.password,
        ref: 'passwordTwo',
    },
]
