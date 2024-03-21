import { Center } from '@gluestack-ui/themed'
import { customColors as colors } from '@ui/ui-theme.provider'
import { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'

interface PlayerInfoChipProps extends PropsWithChildren<ViewProps> {}

const PlayerInfoChip = (props: PlayerInfoChipProps) => {
  return (
    <Center
      {...props}
      bg={colors.backgroundDark300}
      borderRadius={16}
      p={8}
      borderWidth={2}
      borderColor={colors.primary500}
      h={40}
    >
      {props.children}
    </Center>
  )
}

export default PlayerInfoChip
