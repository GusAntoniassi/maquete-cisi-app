import { combineReducers } from 'redux'
import SensorReducer from './SensorReducer'
import UserReducer from './UserReducer'

export default combineReducers({
    SensorReducer: SensorReducer,
    UserReducer: UserReducer
})
