import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constantes';

export type KnownAction = {
    type: typeof LOGIN_REQUEST | typeof LOGIN_SUCCESS | typeof LOGIN_ERROR,
    error?:any
}

export interface LoginForm {
    Usuario: string,
    Password:string,
}

export interface LoginState {
    isLoading?: boolean,
    error?:any,
}