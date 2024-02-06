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
function DatePicker(props: DatePickerProps) {
  return <DateTimePicker {...props} />
}

export default DatePicker
