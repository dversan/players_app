import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest
} from '@jest/globals'
import { act, fireEvent, screen, waitFor } from '@testing-library/react-native'
import { render } from '../../../../../__tests__/__utils__/test-utils'
import * as Auth from '../../../../lib/auth/auth.context'
import MainNavigator from '../../../../navigator/main.navigator'
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import sinon from 'sinon'
import OnboardingPlayerScreen from 'src/feature/onboarding/screens/onboarding-player.screen'
import { samplePlayerData, sampleUser } from '__tests__/__doubles__/doubles'

describe('OnboardingPlayerScreen test', () => {
  beforeEach(() => {
    sinon.stub(Auth, 'useAuth').returns({
      ...Auth.useAuth(),
      user: {
        ...sampleUser,
        playerData: {
          ...samplePlayerData,
          playerNickname: ''
        }
      }
    })
  })

  jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'android',
    select: () => null
  }))

  afterEach(() => {
    sinon.restore()
  })

  it('screen should be shown if user is registered and the onboarding is unfinished. First step is opened by default when a screen is loaded for the first time', async () => {
    await waitFor(() => {
      render(
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      )
    })

    expect(screen.getByText('onboardingScreen.playerNickname')).toBeTruthy()
  })

  it('should submit the form when all steps has been completed and create button is pressed', async () => {
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
      render(
        <OnboardingPlayerScreen route={mockRoute} navigation={mockNavigation} />
      )
    })

    fireEvent.changeText(screen.getByText('onboardingScreen.playerNumber'), 10)
    fireEvent.changeText(
      screen.getByText('onboardingScreen.playerNickname'),
      'Testing Player'
    )

    fireEvent(
      screen.getByText('onboardingScreen.mainPosition'),
      'onValueChange',
      'defense'
    )

    fireEvent(
      screen.getByText('onboardingScreen.secondPosition'),
      'onValueChange',
      'midfielder'
    )

    await act(async () => {
      fireEvent.press(screen.getByTestId('positionStepButton'))
    })

    fireEvent.changeText(screen.getByText('onboardingScreen.height'), 170)
    fireEvent.changeText(screen.getByText('onboardingScreen.weight'), 78)

    await act(async () => {
      fireEvent(
        screen.getByText('onboardingScreen.birthdayLabel'),
        'onPressIn',
        'test Date'
      )
    })

    await act(async () => {
      const picker = await screen.queryByTestId('datePicker')
      fireEvent(picker, 'onChange', { type: 'set' }, new Date())
    })

    fireEvent(
      screen.getByText('onboardingScreen.gamesLabel'),
      'onValueChange',
      '1'
    )

    fireEvent(
      screen.getByText('onboardingScreen.competitionGamesLabel'),
      'onValueChange',
      '1'
    )

    await act(async () => {
      fireEvent.press(screen.getByTestId('fitnessStepButton'))
    })

    fireEvent.changeText(screen.getByText('onboardingScreen.attack'), 50)
    fireEvent.changeText(screen.getByText('onboardingScreen.defense'), 50)
    fireEvent.changeText(screen.getByText('onboardingScreen.goal'), 50)
    fireEvent.changeText(screen.getByText('onboardingScreen.pass'), 50)
    fireEvent.changeText(screen.getByText('onboardingScreen.teamWork'), 50)

    await act(async () => {
      fireEvent.press(screen.getByTestId('parametersStepButton'))
    })

    await act(async () => {
      fireEvent.press(screen.getByText('onboardingScreen.createPlayerProfile'))
    })

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'OnboardingPlayerOptionsScreen'
    )
  })
})
