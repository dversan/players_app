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
