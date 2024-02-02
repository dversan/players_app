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
