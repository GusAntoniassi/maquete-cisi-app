const INITIAL_STATE = {
    
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'set_sensores':
            delete action.type
            return {
              ...action
            }
        default:
          return state
    }
    
}