import * as actionTypes from './actionTypes'
import stateJSON from '../components/body/state_updated.json'


export const usageLoading = () => ({
    type: actionTypes.USAGE_LOADING,
})

export const loadUsage = stateJSON => ({
    type: actionTypes.LOAD_USAGE,
    payload: stateJSON
})

export const fetchUsage = () => {
    console.log('vai help');
    return dispatch => {
        dispatch(usageLoading());
        setTimeout(() => { dispatch(loadUsage(stateJSON)) }, 5000
        );
    }
}