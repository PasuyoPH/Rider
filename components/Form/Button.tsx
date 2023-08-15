import { Pressable, Text } from 'react-native'

interface ButtonProperties {
  children?: React.ReactNode | string
  onPress?: () => void
}

const Button = (props: ButtonProperties) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={
        {
          borderWidth: 1
        }
      }
    >
      {
        typeof props.children === 'string' ?
          (
            <Text>
              {props.children}
            </Text>
          ) : props.children
      }
    </Pressable>
  )
}

export default Button