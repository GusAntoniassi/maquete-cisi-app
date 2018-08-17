export const setSensores = (data) => {
    return {
        type: 'set_sensores',
        ...data
    }
}
