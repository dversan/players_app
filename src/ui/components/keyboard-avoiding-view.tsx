import React from 'react'
import { KeyboardAvoidingView as GSKeyboardAvoidingView } from '@gluestack-ui/themed'
import { Platform } from 'react-native'

export default function KeyboardAvoidingView(props) {
  return (
    <GSKeyboardAvoidingView
      {...props}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 1 })}
    />
  )
}
