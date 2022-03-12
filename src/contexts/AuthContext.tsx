import { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoading } from '../hooks/useLoading';


export const AuthContext = createContext({} as AuthContextRype);

type User = {
    id: string;
    name: string;
    avatar: string;
    email: string | null;
    isLoggedByGoogle: boolean;
    position: string
}

type AuthContextRype = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            showLoading();
            if (user) {
                const { displayName, photoURL, uid, email } = user;

                if (!displayName || !photoURL) {
                    throw new Error('Missing information from google account.');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    email: email,
                    isLoggedByGoogle: true,
                    position: 'Desenvolvedor'
                });
                navigate(location.pathname === '/login' ? '/' : location.pathname);
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
    }, []);

    async function logout() {
        await firebase.auth().signOut().then(() => {
            navigate('/login');
        }).catch(error => {
            console.error(error);
            Object.keys(localStorage).forEach(key => {
                if (key.indexOf('firebase') !== -1) {
                    localStorage.removeItem(key);
                }
            });
        });
    }

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if (result.user) {
            const { displayName, photoURL, uid, email } = result.user;

            if (!displayName || !photoURL) {
                throw new Error('Missing information from google account.');
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
                email: email,
                isLoggedByGoogle: true,
                position: 'Desenvolvedor'
            })
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}