import { merge } from './merge.ts'

type Indexed = {
    // eslint-disable-next-line no-tabs
    [key: string]: unknown
}

// eslint-disable-next-line max-params
export const set = (
    object: Indexed | unknown,
    key: string,
    value: unknown,
    mutableSecond?: boolean
): Indexed | unknown => {
    if (typeof object !== 'object' || object === null) {
        return object
    }

    const pathArr = key.split('.')

    const additionalObj = createObjectByPath(pathArr, value)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return merge(object, additionalObj, true, mutableSecond)
}

export default set

function createObjectByPath(pathArr: string[], value: unknown): Indexed {
    const result = {}

    if (!pathArr.length) {
        return result
    }
    if (pathArr.length === 1) {
        return { [pathArr[0]]: value }
    }
    return { [pathArr[0]]: createObjectByPath(pathArr.slice(1), value) }
}
