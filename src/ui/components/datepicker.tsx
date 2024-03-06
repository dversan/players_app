import React from 'react'
import DateTimePicker, {
  AndroidNativeProps,
  IOSNativeProps,
  BaseProps
} from '@react-native-community/datetimepicker'

interface DatePickerProps
  extends AndroidNativeProps,
    IOSNativeProps,
    BaseProps {}
export default function DatePicker(props: DatePickerProps) {
  return <DateTimePicker {...props} />
}
