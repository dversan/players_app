import React, { PropsWithChildren } from 'react'
import { Center, Image, Pressable } from '@gluestack-ui/themed'
import Text from './text'
import HStackLayout from '../layout/hstack.layout'
import VStackLayout from '../layout/vstack.layout'
import { ViewProps } from 'react-native'
import { customColors as colors } from '../../ui/ui-theme.provider'

interface CardProps extends PropsWithChildren<ViewProps> {
  title: string
  text: string
  imageUrl: string
  onPress?: () => void
}

export default function ButtonCard(props: CardProps) {
  return (
    <Pressable
      onPress={props.onPress}
      {...props}
      p={8}
      bg={colors.backgroundDark800}
      borderRadius={8}
    >
      <HStackLayout space={'md'}>
        <Center>
          <Image source={props.imageUrl} alt={'player option card img'} />
        </Center>
        <VStackLayout flex={1} space={'xs'}>
          <Text size={'lg'} bold>
            {props.title}
          </Text>
          <Text
            numberOfLines={3}
            isTruncated
            lineHeight={20}
            color={colors.lightSecondaryText300}
          >
            {props.text}
          </Text>
        </VStackLayout>
      </HStackLayout>
    </Pressable>
  )
}
