import { AuthState, AuthAction } from './auth.types';

export const initialAuthState: AuthState = {
    user: null,
    isAuthenticated: false,
};

export function authReducer(
    state: AuthState,
    action: AuthAction
): AuthState {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};
