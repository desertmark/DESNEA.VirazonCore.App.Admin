import { Action } from 'redux';
import { push } from 'react-router-redux';
import axios from 'axios';
import { AppThunkAction } from "ClientApp/store";
import { KnownAction } from './interfaces';
import { IS_AUTHENTICATED } from './constantes';
declare var WEB_URL;

export const actionCreators = {
    isAuthenticated: ():AppThunkAction<KnownAction> => (dispatch, getState) => {
        let isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated") || "false");

        return dispatch({ type: IS_AUTHENTICATED, isAuthenticated });
    }        
}

