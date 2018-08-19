const INITIAL_STATE = {
    
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'setUser':
            delete action.type
            return {
              ...action
            }
        default:
          return state
    }
    
}