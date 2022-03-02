import React, { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from '../firebase'
const AuthContext = createContext()

const useAuthContext = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const register = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

    useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
            setLoading(false)
		})
	}, [])

    const values = {
        currentUser,
        register,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={ values }>
            {loading && <div>Loading...</div>}
            {!loading && props.children}
        </AuthContext.Provider>
    )
}

export { useAuthContext, AuthContextProvider as default }