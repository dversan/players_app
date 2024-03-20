import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ContentsNavigator from './contents/contents.navigator'
import NotificationsNavigator from './notifications/notifications.navigator'
import ProfileNavigator from './profile/profile.navigator'
import { customColors as colors } from '@ui/ui-theme.provider'
import { BellIcon, HomeIcon, UserIcon } from 'lucide-react-native'
import { t } from 'i18next'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'red' }}
      backBehavior={'none'}
      screenOptions={() => {
        return {
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.backgroundDark500,
            paddingVertical: 16
          },
          tabBarLabelStyle: { fontSize: 12, marginTop: 8 },
          tabBarActiveTintColor: colors.primary500
        }
      }}
    >
      <Tab.Screen
        name={t('common.text.home')}
        component={ContentsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon name='home' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={t('common.text.notifications')}
        component={NotificationsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <BellIcon name='home' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={t('common.text.profile')}
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <UserIcon name='home' color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
