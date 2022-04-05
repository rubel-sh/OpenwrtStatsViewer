import * as actionTypes from './actionTypes'
import axios from 'axios'
import { findDeviceObject } from '../customMethods/customMethods'

// TotalUsage.js Creator
export const usageLoading = () => ({
    type: actionTypes.USAGE_LOADING,
})

export const loadUsage = stateJSON => ({
    type: actionTypes.LOAD_USAGE,
    payload: stateJSON
})

export const fetchUsage = () => dispatch => {
    dispatch(usageLoading());
    axios.get('https://py.rexopenwrt.repl.co/rawdata')
        .then(response => response.data[response.data.length - 1])
        .then(totalUsageStats => dispatch(loadUsage(totalUsageStats)))
        .catch(error => console.log(error))
}

// Speed.js Creator
export const speedLoading = () => ({
    type: actionTypes.SPEED_USAGE_LOADING,
})

export const speedLoaded = stateJSON => ({
    type: actionTypes.SPEED_USAGE_LOADED,
    payload: stateJSON
})

export const fetchSpeed = () => dispatch => {
    dispatch(speedLoading());
    axios.get('https://py.rexopenwrt.repl.co/rawdata')
        .then(response => response.data)
        .then(speedUsageState => dispatch(speedLoaded(findDeviceObject(speedUsageState, "Desktop"))))
        .catch(error => console.log(error))
}
