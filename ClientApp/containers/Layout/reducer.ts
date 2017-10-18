import { IS_AUTHENTICATED } from './constantes';

import { KnownAction, LayoutState } from './interfaces';
import { Reducer } from "redux";

const defaultState = {
    isAuthenticated:null,
}


export const reducer: Reducer<LayoutState> = (state: LayoutState = defaultState, action: KnownAction) => {

    switch (action.type) {
        case IS_AUTHENTICATED:
            return Object.assign({}, state, {
                isAuthenticated: action.isAuthenticated,
            })        
        default:
            return state;
    }

    
};
