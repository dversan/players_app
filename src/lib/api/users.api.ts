import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'
import { Gender, Notification, User } from '../data/models'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { t } from 'i18next'

function getUser(userId: string): Promise<User> {
  return firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then(userDoc => parseUser(userId, userDoc))
}

function createUser(
  firebaseUser: FirebaseAuthTypes.User,
  name: string,
  lastName: string
): Promise<any> {
  const creationDate = firebaseUser.metadata.creationTime!

  return firestore()
    .collection('users')
    .doc(firebaseUser.uid)
    .set({
      email: firebaseUser.email,
      name,
      lastName,
      createdAt: new Date(creationDate),
      notifications: [
        {
          title: t('welcomeNotificationTitle'),
          createdAt: new Date(creationDate)
        }
      ],
      subscribedAt: null
    })
    .catch(async reason => {
      await firestore().collection('users').doc(firebaseUser.uid).delete()
      await firebaseUser.delete()
      throw reason
    })
}

function savePushToken(userId: string, token: string | null): Promise<void> {
  return firestore()
    .collection('users')
    .doc(userId)
    .update({ pushToken: token })
}

function saveUser(
  userId: string,
  name: string,
  lastName: string
): Promise<void> {
  return firestore()
    .collection('users')
    .doc(userId)
    .update({ name: name, lastName: lastName })
}

function updateEmail(userId: string, email: string): Promise<void> {
  return firestore().collection('users').doc(userId).update({ email: email })
}

function saveDisabledNotifications(
  userId: string,
  options: string[]
): Promise<void> {
  return firestore()
    .collection('users')
    .doc(userId)
    .update({ disabledNotifications: options })
}

function mapUserNotifications(notifications: any): Notification[] {
  return notifications
    .map((n: any) => {
      return {
        title: n.title,
        description: n.description,
        createdAt: n.createdAt.toDate(),
        link: n.link
      }
    })
    .sort(
      (a: Notification, b: Notification) =>
        b.createdAt.getTime() - a.createdAt.getTime()
    )
}

function parseUser(
  userId: string,
  userDoc: FirebaseFirestoreTypes.DocumentSnapshot
): User {
  const gender = userDoc.get('gender')
    ? Gender[
        (userDoc.get('gender') as string).toUpperCase() as keyof typeof Gender
      ]
    : undefined

  return {
    id: userId,
    email: userDoc.get('email'),
    name: userDoc.get('name'),
    lastName: userDoc.get('lastName'),
    notifications: mapUserNotifications(userDoc.data()?.notifications || []),
    disabledNotifications: userDoc.get('disabledNotifications'),
    birthDate: userDoc.get('birthDate')
      ? (userDoc.get('birthDate') as string)
      : undefined,
    gender,
    subscribedAt: userDoc.get('subscribedAt')
      ? (userDoc.get('subscribedAt') as any)!.toDate()
      : undefined,
    subscriptionId: userDoc.get('subscriptionId'),
    subscriptionProductId: userDoc.get('subscriptionProductId'),
    subscriptionTransactionId: userDoc.get('subscriptionTransactionId'),
    subscriptionTransactionReceipt: userDoc.get(
      'subscriptionTransactionReceipt'
    )
  }
}

export {
  getUser,
  createUser,
  savePushToken,
  saveUser,
  updateEmail,
  saveDisabledNotifications
}
