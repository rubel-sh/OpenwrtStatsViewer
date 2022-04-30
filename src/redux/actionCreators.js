import * as actionTypes from './actionTypes'
import axios from 'axios'
import { GRAPHDATA_API } from '../jsonAPI/jsonAPI'
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

// SliderDateSelector.js Creator
export const sliderLoading = () => ({
    type: actionTypes.SLIDER_SELECTOR_LOADING,
})

export const sliderLoaded = (stateJSON, sliderDate) => ({
    type: actionTypes.SLIDER_SELECTOR_LOADED,
    payload: stateJSON,
    datePayload: sliderDate
})

export const fetchSlider = (sliderValue) => dispatch => {
    // Loading Dispatch
    dispatch(sliderLoading());
    // Async Dispatch
    const currentEPOCH = Math.floor(Date.now() / 1000);
    // in perm Slider value must be inserted after 86400
    const fromEPOCH = currentEPOCH - (86400 * sliderValue);
    const postEPOCH = { "fromdate": fromEPOCH, "todate": currentEPOCH }
    console.log(postEPOCH);
    axios.post(GRAPHDATA_API, postEPOCH)
        .then(response => response.data)
        .then(sliderSelectorState => dispatch(sliderLoaded(sliderSelectorState, sliderValue)))
        .catch(error => console.log(error))

}


