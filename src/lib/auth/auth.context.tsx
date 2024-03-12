import React, { createContext, useContext, useEffect, useState } from 'react'
import { t } from 'i18next'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import * as userApi from '../api/users.api'
import { User } from '../data/models'

interface Auth {
  user: User
  initializing: boolean
  signUp: (
    email: string,
    name: string,
    lastName: string,
    password: string
  ) => Promise<any>
  signInWithEmail: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  recoverPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<Auth>({} as Auth)

const useFirebaseAuth = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged)
  }, [])

  const onAuthStateChanged = async (
    firebaseUser: FirebaseAuthTypes.User | null
  ) => {
    if (firebaseUser) {
      const userData = await userApi.getUser(firebaseUser.uid)
      setUser(userData)
    } else {
      setUser(null)
    }
    if (initializing) {
      setInitializing(false)
    }
  }

  const signUp = (
    email: string,
    name: string,
    lastName: string,
    password: string
  ): Promise<any> => {
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then(credential => userApi.createUser(credential.user, name, lastName))
  }

  const signInWithEmail = (email: string, password: string) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .catch(({ message }) => {
        if (message.includes('auth/invalid-email')) {
          throw t('common.error.invalidMail')
        }
        if (message.includes('auth/invalid-credential')) {
          throw t('common.error.userNotFound')
        }
        throw t('common.error.generic')
      })
  }

  const recoverPassword = (email: string) => {
    return auth()
      .sendPasswordResetEmail(email)
      .catch(({ message }) => {
        if (message.includes('auth/invalid-email')) {
          throw t('common.error.invalidMail')
        }
        if (message.includes('auth/invalid-credential')) {
          throw t('common.error.userNotFound')
        }
        throw t('common.error.generic')
      })
  }

  const signOut = () => {
    return userApi.savePushToken(user!.id, null).then(() => auth().signOut())
  }

  return {
    user: user!,
    initializing,
    signUp,
    signInWithEmail,
    signOut,
    recoverPassword
  }
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }: any) => {
  const firebaseAuth = useFirebaseAuth()
  return (
    <AuthContext.Provider value={firebaseAuth}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
