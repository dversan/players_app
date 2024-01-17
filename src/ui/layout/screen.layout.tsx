import React, { ReactNode, useEffect, useState } from 'react'
import BoxLayout from './box.layout'
import HeaderBackButton from '../components/header-back-button'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from '@gluestack-ui/themed'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { customColors } from '../ui-theme.provider'

interface ScreenProps {
  fullscreen?: boolean
  backgroundColor?: string
  isModal?: boolean
  children: ReactNode
}

export default function ScreenLayout(props: ScreenProps) {
  const {
    fullscreen,
    backgroundColor = customColors.backgroundDark500,
    children
  } = props
  const navigation = useNavigation()
  const [showBack, setShowBack] = useState<boolean>(false)

  const insets = useSafeAreaInsets()

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setShowBack(navigation.canGoBack)
    })
  }, [])

  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle={'light-content'} />
      <BoxLayout
        height={'100%'}
        backgroundColor={backgroundColor}
        paddingTop={!fullscreen ? insets.top + 10 : 0}
        paddingBottom={!fullscreen ? insets.bottom : 0}
      >
        <BoxLayout
          position={'absolute'}
          left={24}
          top={insets.top + 30}
          zIndex={100}
        >
          {showBack && <HeaderBackButton isModal={props.isModal || false} />}
        </BoxLayout>
        {children}
      </BoxLayout>
    </>
  )
}
