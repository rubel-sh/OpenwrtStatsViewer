import * as actionTypes from './actionTypes'
import axios from 'axios'

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