import { TextInput, View } from 'react-native'

interface FormProperties {
  placeholder?: string
  value?: string
  onValue?: (value: string) => void

  // checks
  numberOnly?: boolean
  maxLength?: number
  password?: boolean
}

const Form = (props: FormProperties) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      value={props.value}
      style={
        {
          borderWidth: 1
        }
      }
      keyboardType={
        props.numberOnly ?
          'number-pad' :
          'default'
      }
      onChangeText={
        (text: string) => {
          if (typeof props.onValue !== 'function' || isNaN(text as any)) return
          else props.onValue(text)
        }
      }
      maxLength={props.maxLength}
      secureTextEntry={props.password}
    />
  )
}

export default Form