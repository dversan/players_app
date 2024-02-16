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
import { PlayerData, Positions, User } from '../../../../lib/data/models'
import MainNavigator from '../../../../navigator/main.navigator'
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import sinon from 'sinon'
import OnboardingPlayerScreen from 'src/feature/onboarding/screens/onboarding-player.screen'

const samplePlayerData: PlayerData = {
  playerNumber: 12,
  playerNickname: 'Player Name',
  mainPosition: Positions.GOALKEEPER,
  secondPosition: Positions.DEFENDER,
  playerHeight: 156,
  playerWeight: 67,
  birthday: new Date(),
  gamesPerYearIndex: 1,
  competitionGamesIndex: 1,
  attack: 34,
  defense: 34,
  fitness: 34,
  goal: 34,
  pass: 34,
  teamWork: 34
}

const sampleUser: User = {
  id: 'string',
  email: 'string',
  name: 'string',
  lastName: 'string',
  playerData: samplePlayerData
}

describe('OnboardingPlayerScreen', () => {
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

  it('should be shown if user is registered and the onboarding is unfinished. First step is opened by default when a screen is loaded for the first time', async () => {
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
      fireEvent.press(screen.getByText('onboardingScreen.confirmStep'))
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
      fireEvent.press(screen.getByText('onboardingScreen.confirmStep'))
    })

    fireEvent.changeText(screen.getByText('onboardingScreen.attack'), 78)
    fireEvent.changeText(screen.getByText('onboardingScreen.defense'), 78)
    fireEvent.changeText(screen.getByText('onboardingScreen.fitness'), 78)
    fireEvent.changeText(screen.getByText('onboardingScreen.goal'), 78)
    fireEvent.changeText(screen.getByText('onboardingScreen.pass'), 78)
    fireEvent.changeText(screen.getByText('onboardingScreen.teamWork'), 78)

    await act(async () => {
      fireEvent.press(screen.getByText('onboardingScreen.confirmStep'))
    })

    await act(async () => {
      fireEvent.press(screen.getByText('Crear perfil'))

      screen.debug()
    })

    // expect(mockNavigation.navigate).toHaveBeenCalledWith('OnboardingClubScreen')
  })
})
