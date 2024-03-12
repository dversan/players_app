import React from 'react'
import {
  ChevronLeftIcon,
  CloseIcon,
  Icon,
  Pressable,
  Center
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { customColors } from '../ui-theme.provider'

interface Props {
  isModal?: boolean
}

const HeaderBackButton = (props: Props) => {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Center
        style={{ borderRadius: 50 }}
        bg={customColors.backgroundDark700}
        p={4}
      >
        {props.isModal ? (
          <Icon color={'white'} as={CloseIcon} w={'$10'} h={'$10'} />
        ) : (
          <Icon color={'white'} as={ChevronLeftIcon} size={'xl'} />
        )}
      </Center>
    </Pressable>
  )
}

export default HeaderBackButton
