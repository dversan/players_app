import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ContentsNavigator from './contents/contents.navigator'
import NotificationsNavigator from './notifications/notifications.navigator'
import ProfileNavigator from './profile/profile.navigator'
import { customColors as colors } from '@ui/ui-theme.provider'
import { BellIcon, HomeIcon, UserIcon } from 'lucide-react-native'

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
        name={'Home'}
        component={ContentsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon name='home' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={'Notifications'}
        component={NotificationsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <BellIcon name='home' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={'Profile'}
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
