import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constantes';

import { KnownAction, LoginState } from './interfaces';
import { Reducer } from "redux";

const defaultState = {
    isLoading: false,
    error:null,
}


export const reducer: Reducer<LoginState> = (state: LoginState = defaultState, action: KnownAction) => {

    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state,{
                isLoading:true,
            })
        case LOGIN_SUCCESS:
            localStorage.setItem("isAuthenticated", "true");
            window.location.href = '/';
            return Object.assign({}, state,{
                isLoading: false,
            })
        case LOGIN_ERROR:
            return Object.assign({}, state,{
                isLoading: false,
                error: action.error
            })
        default:
            return state;
    }

    
};
