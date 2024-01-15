import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigator/main.navigator'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import AuthProvider from './lib/auth/auth.context'
import gluestackCustomUIConfig from './ui/ui-theme.provider'

function App() {
  return (
    <AuthProvider>
      <GluestackUIProvider config={gluestackCustomUIConfig}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </GluestackUIProvider>
    </AuthProvider>
  )
}

export default App
