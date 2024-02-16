/* eslint-disable no-unused-vars */
export interface Notification {
  title: string
  description: string
  createdAt: Date
  link?: string
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum Positions {
  GOALKEEPER = 'goalkeeper',
  DEFENDER = 'defender',
  WINGER_R = 'winger_right',
  WINGER_L = 'winger_left',
  MIDFIELDER = 'midfielder',
  STRIKER = 'striker'
}

export enum GamesPerYearOptions {
  NO_GAMES = 1,
  FIRST_GAMES_RANGE,
  SECOND_GAMES_RANGE,
  THIRD_GAMES_RANGE,
  TOP_GAMES_RANGE
}

export enum CompetitionGamesOptions {
  NONE = 1,
  QUARTER = 25,
  HALF = 50,
  THREE_QUARTERS = 75,
  ALL = 100
}

export enum OnboardingSteps {
  POSITION = 'firstStep',
  FITNESS = 'secondStep',
  PARAMETERS = 'thirdStep'
}

export interface PlayerData {
  playerNumber: number
  playerNickname: string
  mainPosition: Positions | ''
  secondPosition: Positions | ''
  playerHeight: number
  playerWeight: number
  birthday: Date | string
  gamesPerYearIndex: GamesPerYearOptions
  competitionGamesIndex: CompetitionGamesOptions
  attack: number
  defense: number
  fitness: number
  goal: number
  pass: number
  teamWork: number
}

export interface User {
  id: string
  email: string
  name: string
  lastName: string
  playerData: PlayerData
  // notifications?: Notification[]
  // disabledNotifications?: string[]
  // gender?: Gender
  // subscribedAt?: Date
  // subscriptionId?: string
  // subscriptionProductId: string
  // subscriptionTransactionId: string
  // subscriptionTransactionReceipt: string
}

export type FormType = 'onboarding' | 'register'

export interface SelectValuesProps {
  inMainPosition: boolean
  inSecondPosition: boolean
  birthday: boolean
  gamesPerYearIndex: boolean
  competitionGamesIndex: boolean
}
