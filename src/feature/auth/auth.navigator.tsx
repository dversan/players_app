import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './login/login.screen'
import RegisterScreen from './register/register.screen'
import WelcomeScreen from './register/welcome.screen'
import PasswordScreen from './login/password.screen'

const AuthStack = createNativeStackNavigator()

interface AuthLayoutProps {
  paddingTop: number
  mainSpacing: string
  logoH: number
  logoW: number
}

export default function AuthNavigator() {
  const authLayoutProps: AuthLayoutProps = {
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
