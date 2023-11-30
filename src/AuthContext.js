// user authentication
import {createContext, useContext, useEffect, useState} from 'react';
import {signInWithEmailAndPassword, 
        signOut, 
        onAuthStateChanged
        } from 'firebase/auth';
import {auth} from '../firebase';

const userContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = userState ({});

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, [])
    
    return (
        <userContext.Provider>
            {children}
        </userContext.Provider>
    )
}

export const UserAuth = () => {
    return userContext(UserContext)
}