import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import auth from '@react-native-firebase/auth'
import { User } from '../data/models'
import { useTranslation } from 'react-i18next'

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

function useFirebaseAuth(t) {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  function signUp(
    email: string,
    name: string,
    lastName: string,
    password: string
  ): Promise<any> {
    return auth().createUserWithEmailAndPassword(email, password)
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
    // return userApi
    //   .savePushToken(user!.id, null)
    //   .then(() => auth().signOut())
    // .then(() => {
    //   userSubscriptionRef.current?.()
    //   userSubscriptionRef.current = undefined
    // })
  }

  return { user: user!, initializing, signUp, signInWithEmail, signOut }
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }: any) {
  const { t } = useTranslation()

  const firebaseAuth = useFirebaseAuth(t)
  return (
    <AuthContext.Provider value={firebaseAuth}>{children}</AuthContext.Provider>
  )
}
