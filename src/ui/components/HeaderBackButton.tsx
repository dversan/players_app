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
        <Icon as={CloseIcon} size={'xl'} />
      ) : (
        <Icon as={ChevronLeftIcon} size={'xl'} />
      )}
    </Pressable>
  )
}
