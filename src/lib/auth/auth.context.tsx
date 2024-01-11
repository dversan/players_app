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
}

const AuthContext = createContext<Auth>({} as Auth)

function useFirebaseAuth() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged)
  }, [])

  async function onAuthStateChanged(
    firebaseUser: FirebaseAuthTypes.User | null
  ) {
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

  function signUp(
    email: string,
    name: string,
    lastName: string,
    password: string
  ): Promise<any> {
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then(credential => userApi.createUser(credential.user, name, lastName))
  }

  function signInWithEmail(email: string, password: string) {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .catch(({ message }) => {
        if (message.includes('auth/invalid-email')) {
          throw t('common.error.invalidMail')
        }
        if (
          message.includes('auth/user-not-found') ||
          message.includes('auth/wrong-password')
        ) {
          throw t('common.error.userNotFound')
        }
        throw t('common.error.generic')
      })
  }

  function signOut() {
    return userApi.savePushToken(user!.id, null).then(() => auth().signOut())
  }

  return { user: user!, initializing, signUp, signInWithEmail, signOut }
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }: any) {
  const firebaseAuth = useFirebaseAuth()
  return (
    <AuthContext.Provider value={firebaseAuth}>{children}</AuthContext.Provider>
  )
}
