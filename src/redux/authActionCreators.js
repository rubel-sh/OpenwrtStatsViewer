import * as actionTypes from './actionTypes';
import axios from 'axios';

export const auth = (email, password) => dispatch => {
    const authData = {
        email: email,
        password: password,
    }
}
