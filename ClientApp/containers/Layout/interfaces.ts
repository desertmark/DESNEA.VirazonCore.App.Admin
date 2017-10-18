import { IS_AUTHENTICATED } from './constantes';

export type KnownAction = {
    type: typeof IS_AUTHENTICATED,
    isAuthenticated?: boolean,
}

export interface LayoutState {
    isAuthenticated?:boolean,
}