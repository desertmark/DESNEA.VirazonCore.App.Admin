import { Action } from 'redux';
import axios from 'axios';
import { AppThunkAction } from "ClientApp/store";
import { KnownAction, LoginForm } from './interfaces';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constantes';
declare var WEB_URL;

export const actionCreators = {
    login: (form: LoginForm): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: LOGIN_REQUEST });
        return axios({
            url: `${WEB_URL}/api/usuario/login`,
            headers: {
                'Content-Type':'application/json'
            },
            method: 'POST',
            data: JSON.stringify(form)
        })
        .then(response => response.data)
            .then(data => {                
                return dispatch({ type: LOGIN_SUCCESS })
            })
        .catch(error => dispatch({ type: LOGIN_ERROR, error: error.response }));
    }    
}

