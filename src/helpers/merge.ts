type Indexed = {
    // eslint-disable-next-line no-tabs
    [key: string]: unknown
}

// eslint-disable-next-line max-params
export const merge = (
    lhs: Indexed,
    rhs: Indexed,
    mutant?: boolean,
    secMutable: boolean = false
): Indexed => {
    if (!mutant) {
        const result: Indexed = { ...lhs }

        // eslint-disable-next-line no-restricted-syntax
        for (const key in rhs) {
            if (!(key in result)) {
                result[key] = rhs[key]
            } else if (Array.isArray(rhs[key])) {
                lhs[key] = rhs[key]
            } else if (
                typeof result[key] === 'object' &&
                typeof rhs[key] === 'object'
            ) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                result[key] = merge(result[key], rhs[key])
            } else {
                result[key] = rhs[key]
            }
        }

        return result
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const key in rhs) {
        if (!(key in rhs)) {
            lhs[key] = rhs[key]
        } else if (Array.isArray(rhs[key])) {
            lhs[key] = rhs[key]
        } else if (
            typeof lhs[key] === 'object' &&
            typeof rhs[key] === 'object'
        ) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            lhs[key] = merge(lhs[key], rhs[key], secMutable)
        } else {
            lhs[key] = rhs[key]
        }
    }

    return lhs
}
