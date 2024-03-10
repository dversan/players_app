import React from 'react'
import renderer from 'react-test-renderer'
import { afterEach, describe, expect, jest, test } from '@jest/globals'
import gluestackCustomUIConfig from '../src/ui/ui-theme.provider'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from '../src/navigation/main.navigator'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { waitFor } from '@testing-library/react-native'

describe('App', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  test('renders correctly', async () => {
    const tree = renderer
      .create(
        <GluestackUIProvider config={gluestackCustomUIConfig}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </GluestackUIProvider>
      )
      .toJSON()

    await waitFor(() => {
      expect(tree).toMatchSnapshot()
    })
  })
})
