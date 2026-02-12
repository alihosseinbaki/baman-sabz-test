import { useReducer, ReactNode, useMemo, useContext } from 'react';
import { AuthContext } from './auth.context';
import { authReducer, initialAuthState } from './auth.reducer';

interface Props {
    children: ReactNode;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};


export function AuthProvider({ children }: Props) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    const value = useMemo(() => ({
        state,
        dispatch,
    }), [state]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
