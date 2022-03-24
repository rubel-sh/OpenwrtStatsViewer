import { combineReducers } from 'redux'
import * as actionTypes from './actionTypes'


const totalUsageReducer = (totalUsageState = { isLoading: true, state: [] }, action) => {
    switch (action.type) {
        case actionTypes.USAGE_LOADING:
            return {
                ...totalUsageState,
                isLoading: true,
                state: []
            }
        case actionTypes.LOAD_USAGE:
            return {
                ...totalUsageState,
                isLoading: false,
                state: action.payload
            }

        default:
            return totalUsageState
    }
}
export const Reducer = combineReducers({ totalUsageState: totalUsageReducer })
