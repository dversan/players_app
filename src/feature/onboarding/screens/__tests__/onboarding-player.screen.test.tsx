import { describe, afterEach, it, expect, jest } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react-native'
import { render } from '../../../../../__tests__/__utils__/test-utils'
import * as Auth from '../../../../lib/auth/auth.context'
import { User } from '../../../../lib/data/models'
import OnboardingPlayerScreen from '../../../../feature/onboarding/screens/onboarding-player.screen'

describe('OnboardingPlayerScreen test', () => {
  afterEach(() => {
    jest.resetAllMocks() // Reset mocks after each test
  })

  it('Should show the onboarding if user is registered and the onboarding is unfinished.', async () => {
    (Auth.useAuth as jest.Mock).mockReturnValue({
      user: {
        playerData: { playerNickname: 'New Player' }
      } as User
    })

    // Mock route and navigation props
    const mockRoute = {
      params: {
        onboardingLayoutProps: {
          padding: 24,
          paddingTop: 8,
          mainSpacing: 'xl',
          logoH: 55,
          logoW: 55
        }
      }
    }
    const mockNavigation = {
      navigate: jest.fn()
    }

    await waitFor(() => {
      // Pass the mocked props to your component when rendering
      render(
        <OnboardingPlayerScreen route={mockRoute} navigation={mockNavigation} />
      )
      screen.debug()

      expect(screen.getByText('ONBOARDINGSCREEN.TITLE')).toBeTruthy()
      // ace with actual expectation
    })
  })
})
