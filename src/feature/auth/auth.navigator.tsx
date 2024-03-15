import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from 'src/feature/auth/login/screens/login.screen'
import RegisterScreen from 'src/feature/auth/register/screens/register.screen'
import WelcomeScreen from 'src/feature/auth/register/screens/welcome.screen'
import PasswordScreen from 'src/feature/auth/login/screens/password.screen'

const AuthStack = createNativeStackNavigator()

interface AuthLayoutProps {
  padding: number
  paddingTop: number
  mainSpacing: string
  logoH: number
  logoW: number
}

const AuthNavigator = () => {
  const authLayoutProps: AuthLayoutProps = {
    padding: 24,
    paddingTop: 8,
    mainSpacing: 'xl',
    logoH: 55,
    logoW: 55
  }

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={'WelcomeScreen'} component={WelcomeScreen} />
      <AuthStack.Screen
        name={'RegisterScreen'}
        component={RegisterScreen}
        initialParams={{ authLayoutProps }}
      />
      <AuthStack.Screen
        name={'LoginScreen'}
        component={LoginScreen}
        initialParams={{ authLayoutProps }}
      />
      <AuthStack.Screen
        name={'PasswordScreen'}
        component={PasswordScreen}
        initialParams={{ authLayoutProps }}
      />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator
