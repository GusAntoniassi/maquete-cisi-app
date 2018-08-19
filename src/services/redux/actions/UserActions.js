export const setUser = (data) => {
    return {
        type: 'setUser',
        ...data
    }
}
