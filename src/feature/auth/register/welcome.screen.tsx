import * as React from 'react'
import { View, Text } from 'react-native'
import ScreenLayout from '../../../ui/layout/screen.layout'

export default function WelcomeScreen() {
  return (
    <ScreenLayout>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome Screen</Text>
      </View>
    </ScreenLayout>
  )
}
