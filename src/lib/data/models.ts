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
  NO_GAMES,
  FIRST_GAMES_RANGE,
  SECOND_GAMES_RANGE,
  THIRD_GAMES_RANGE,
  TOP_GAMES_RANGE
}

export enum CompetitionMatchesOptions {
  QUARTER,
  HALF,
  THREE_QUARTERS,
  ALL
}

export enum OnboardingSteps {
  POSITION = 'firstFormTitle',
  FITNESS = 'secondFormTitle',
  PARAMETERS = 'thirdFormTitle'
}

export interface User {
  id: string
  email: string
  name: string
  lastName: string
  notifications: Notification[]
  disabledNotifications: string[]
  birthDate?: string
  gender?: Gender
  subscribedAt?: Date
  subscriptionId: string
  // subscriptionProductId: string
  // subscriptionTransactionId: string
  // subscriptionTransactionReceipt: string
}

export type FormType = 'onboarding' | 'register'

export interface PositionValuesProps {
  inMainPosition: boolean
  inSecondPosition: boolean
  birthday: boolean
  gamesPerYearIndex: boolean
}

export interface OnboardingFormData {
  playerNumber: number
  playerNickname: string
  mainPosition: string
  secondPosition: string
  playerHeight: number
  playerWeight: number
  birthday: Date | string
  gamesPerYearIndex: number
}
