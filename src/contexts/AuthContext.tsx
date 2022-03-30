import { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoading } from '../hooks/useLoading';
import UserService from '../services/UserService';


export const AuthContext = createContext({} as AuthContextRype);

type User = {
    id: string;
    name: string;
    avatar: string;
    email: string | null;
    isProvided: boolean;
    position: string;
    expiresAt: any;
    profile: any;
    notifications: any;
    userSquads: any;
}

type AuthContextRype = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    setUserNotification: (value: any) => void;
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
        const unsubscribe = auth.onAuthStateChanged(async user => {
            showLoading();
            if (user) {
                const { displayName, photoURL, uid, email } = user;

                if (!displayName || !photoURL) {
                    throw new Error('Missing information from google account.');
                }

                const fetchedUser = await UserService.create(user);

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    email: email,
                    isProvided: fetchedUser.data.data.isProvided,
                    position: fetchedUser.data.data.position,
                    expiresAt: fetchedUser.data.data.expires_at,
                    profile: fetchedUser.data.data.profile,
                    notifications: fetchedUser.data.data.notifications,
                    userSquads: fetchedUser.data.data.userSquads
                });

                navigate(location.pathname === '/login' ? '/' : location.pathname);
            } else {
                navigate('/login');
            }
            setTimeout(() => {
                hideLoading();
            }, 500);

        });
        
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

            const fetchedUser = await UserService.create(result.user)

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
                email: email,
                isProvided: fetchedUser.data.data.isProvided,
                position: fetchedUser.data.data.position,
                expiresAt: fetchedUser.data.data.expires_at,
                profile: fetchedUser.data.data.profile,
                notifications: fetchedUser.data.data.notifications,
                userSquads: fetchedUser.data.data.userSquads
            });
        }
    }

    function setUserNotification(notification: any){
        setUser(Object.assign({}, user, {notifications: notification}));
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, logout, setUserNotification }}>
            {props.children}
        </AuthContext.Provider>
    );
}