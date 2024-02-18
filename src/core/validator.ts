import {
    EMAIL,
    PASSWORD,
    ONLY_NUMBERS,
    PHONE,
    LOGIN,
} from '../helpers/regexp.ts'

export const login = (value: string) => {
    if (value.length === 0) {
        return 'Field can not be empty'
    }
    if (value.length < 3 || value.length > 20) {
        return `Length of login must be less 3 to 20 letters.`
    }
    if (ONLY_NUMBERS.test(value)) {
        return "It's not acceptable to use only numbers"
    }
    if (!LOGIN.test(value)) {
        return 'Impermissible symbols'
    }
    return false
}

export const password = (value: string) => {
    if (value.length === 0) {
        return 'Field can not be empty'
    }
    if (value.length < 8 || value.length > 40) {
        return `Length of password must be 8 to 40 letters.`
    }
    if (!PASSWORD.test(value)) {
        return 'Use at leaste one upercase letter and one number in your password'
    }
    return false
}

export const passwordTwo = (value: string) => {
    if (value.length === 0) {
        return 'Field can not be empty'
    }
    if (value.length < 8 || value.length > 40) {
        return `Length of password must be 8 to 40 letters.`
    }
    if (!PASSWORD.test(value)) {
        return 'Use at leaste one upercase letter and one number in your password'
    }
    return false
}

export const email = (value: string) => {
    if (value.length === 0) {
        return 'Field can not be empty'
    }
    if (!EMAIL.test(value)) {
        return 'Invalide email address'
    }
    return false
}

export const phone = (value: string) => {
    if (value.length === 0) {
        return 'Field can not be empty'
    }
    if (value.length <= 10 || value.length >= 15) {
        return 'Length of phone must be 10 to 15 letters.'
    }

    if (!PHONE.test(value)) {
        return 'Invalide phone number'
    }
    return false
}

export const name = (value: string) => {
    if (value.length === 0) {
        return 'Field can not be empty'
    }
    return ''
}

export const message = (value: string) => {
    console.log(value)
    if (value.length === 0) {
        return 'Field can not be empty'
    }
    return false
}
