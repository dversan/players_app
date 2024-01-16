import React from 'react'
import {
  ChevronLeftIcon,
  CloseIcon,
  Icon,
  Pressable
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'

interface Props {
  isModal?: boolean
}

export default function HeaderBackButton(props: Props) {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.goBack()}>
      {props.isModal ? (
        <Icon color={'white'} as={CloseIcon} w={'$10'} h={'$10'} />
      ) : (
        <Icon color={'white'} as={ChevronLeftIcon} size={'xl'} />
      )}
    </Pressable>
  )
}
