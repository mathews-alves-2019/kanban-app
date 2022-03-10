import { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../hooks/useLoading';

export const AuthContext = createContext({} as AuthContextRype);

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextRype = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            showLoading();
            if (user) {
                console.log('entrou')
                const { displayName, photoURL, uid } = user;

                if (!displayName || !photoURL) {
                    throw new Error('Missing information from google account.');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                });
                navigate('/home');
            } else {
                navigate('/login');
            }
            setTimeout(() => {
                hideLoading();
            }, 500);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if (result.user) {
            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
                throw new Error('Missing information from google account.');
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}