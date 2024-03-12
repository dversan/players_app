import {
  Center,
  CloseIcon,
  Icon,
  Modal as GSModal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@gluestack-ui/themed'
import Text from '@ui/components/text'
import Button from '@ui/components/button'
import { ViewProps } from 'react-native'
import React from 'react'
import { customColors as colors } from '@ui/ui-theme.provider'
import HStackLayout from '@ui/layout/hstack.layout'

interface GSModalProps extends ViewProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full'
  isOpen?: boolean
  onClose?: () => any
  useRNModal?: boolean
  defaultIsOpen?: boolean
  initialFocusRef?: React.RefObject<any>
  finalFocusRef?: React.RefObject<any>
  avoidKeyboard?: boolean
  closeOnOverlayClick?: boolean
  isKeyboardDismissable?: boolean
  children?: any
  headerTitle?: string
  primaryButtonText?: string
  onClickPrimaryButton?: () => void
  secondaryButtonText?: string
  hideCloseButton?: boolean
}

const Modal = (props: GSModalProps) => {
  return (
    <Center h={300}>
      <GSModal {...props}>
        <ModalBackdrop />
        <ModalContent bg={colors.backgroundLight500}>
          <ModalHeader>
            <HStackLayout flex={1} justifyContent={'center'}>
              <Text bold color={colors.darkPrimaryText500} size='2xl'>
                {props.headerTitle}
              </Text>
            </HStackLayout>
            {!props.hideCloseButton && (
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            )}
          </ModalHeader>
          <ModalBody>{props.children}</ModalBody>
          <ModalFooter>
            <HStackLayout gap={16}>
              {props.secondaryButtonText && (
                <Button
                  flex={1}
                  variant={'outline'}
                  action={'secondary'}
                  onPress={props.onClose}
                  textColor={colors.darkPrimaryText300}
                >
                  {props.secondaryButtonText}
                </Button>
              )}
              {props.primaryButtonText && (
                <Button
                  action={'primary'}
                  onPress={props.onClickPrimaryButton}
                  flex={1}
                >
                  {props.primaryButtonText}
                </Button>
              )}
            </HStackLayout>
          </ModalFooter>
        </ModalContent>
      </GSModal>
    </Center>
  )
}

export default Modal
