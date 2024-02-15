import { afterEach, describe, expect, it, jest } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react-native'
import { render } from '../../../../../__tests__/__utils__/test-utils'
import * as Auth from '../../../../lib/auth/auth.context'
import { User } from '../../../../lib/data/models'
import MainNavigator from '../../../../navigator/main.navigator'
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'

describe('OnboardingPlayerScreen', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should be shown if user is registered and the onboarding is unfinished.', async () => {
    (Auth.useAuth as jest.Mock).mockReturnValue({
      user: {
        email: 'test@gmail.com',
        playerData: { playerNickname: '' }
      } as User
    })

    render(
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    )

    await waitFor(() => {
      expect(screen.getByText('ONBOARDINGSCREEN.TITLE')).toBeTruthy()
    })
  })
})
