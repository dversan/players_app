import React, { ReactNode, useEffect, useState } from 'react'
import BoxLayout from './box.layout'
import HeaderBackButton from '../components/HeaderBackButton'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from '@gluestack-ui/themed'

interface ScreenProps {
  fullscreen?: boolean
  backgroundColor?: string
  isModal?: boolean
  children: ReactNode
}

export default function ScreenLayout(props: ScreenProps) {
  const { fullscreen, backgroundColor = 'white', children } = props
  const navigation = useNavigation()
  const [showBack, setShowBack] = useState<boolean>(false)

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setShowBack(navigation.canGoBack)
    })
  }, [])

  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle={'dark-content'} />
      <BoxLayout
        height={'100%'}
        backgroundColor={backgroundColor}
        safeAreaTop={!fullscreen}
      >
        <BoxLayout
          position={'absolute'}
          left={5}
          top={5}
          zIndex={100}
          safeAreaTop
        >
          {showBack && <HeaderBackButton isModal={props.isModal || false} />}
        </BoxLayout>
        {children}
      </BoxLayout>
    </>
  )
}
