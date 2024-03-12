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
  QUARTER,
  HALF,
  THREE_QUARTERS,
  ALL
}

export enum OnboardingSteps {
  POSITION = 'positionStep',
  FITNESS = 'fitnessStep',
  PARAMETERS = 'parametersStep'
}

export interface PositionFormData {
  playerNumber: number
  playerNickname: string
  mainPosition: Positions | ''
  secondPosition: Positions | ''
}

export interface FitnessFormData {
  playerHeight: number
  playerWeight: number
  birthday: Date | string
  gamesPerYearIndex: GamesPerYearOptions
  competitionGamesIndex: CompetitionGamesOptions
}

export interface ParametersFormData {
  attack: number
  defense: number
  fitness: number
  goal: number
  pass: number
  teamWork: number
}

export interface PlayerData
  extends PositionFormData,
    FitnessFormData,
    ParametersFormData {}

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

export interface RegisterFormFields {
  email: string
  name: string
  lastName: string
  password: string
  confirmPassword: string
}

export type FormType = 'onboarding' | 'register'

export interface SelectValuesProps {
  inMainPosition: boolean
  inSecondPosition: boolean
  birthday: boolean
  gamesPerYearIndex: boolean
  competitionGamesIndex: boolean
}

export enum OnboardingPlayerOptions {
  JOIN_A_CLUB = 'joinClub',
  CREATE_CLUB = 'createNewClub',
  GO_TO_PROFILE = 'goToProfile'
}

interface Stadium {
  mapsLocation: { lat: number; lng: number }
  name: string
  collaborator: boolean
  pricePerMatch: number
}

enum GameMode {
  FOOTBALL_7 = 'football7',
  FUTSAL = 'futsal'
}

export interface Club {
  clubName: string
  level: number
  stadium: Stadium
  otherStadiums: Stadium[]
  gameMode: GameMode
  members: string[]
}
