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

const speedUsageReducer = (speedUsageState = { isLoading: true, state: ['default'] }, action) => {
    switch (action.type) {
        case actionTypes.SPEED_USAGE_LOADING:
            return {
                ...speedUsageState,
                isLoading: true,
                state: []
            }
        case actionTypes.SPEED_USAGE_LOADED:
            return {
                ...speedUsageState,
                isLoading: false,
                state: action.payload
            }

        default:
            return speedUsageState
    }
}
export const Reducer = combineReducers({ totalUsageState: totalUsageReducer, speedUsageState: speedUsageReducer })
