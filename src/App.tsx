import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigator/main.navigator'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import AuthProvider from './lib/auth/auth.context'

function App() {
  return (
    <AuthProvider>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </GluestackUIProvider>
    </AuthProvider>
  )
}

export default App
