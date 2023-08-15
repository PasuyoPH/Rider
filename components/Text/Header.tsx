import { Constants } from 'app-types'
import { Text } from 'react-native'

interface HeaderProps {
  font?: string
  children?: string[] | string
  size?: number
  color?: string
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
}

const Header = (props: HeaderProps) => (
  <Text
    style={
      {
        fontFamily: props.font,
        fontSize: props.size ?? 32,
        color: props.color ?? Constants.Colors.Text.primary,
        fontWeight: props.weight ?? 'normal'
      }
    }
  >
    {props.children}
  </Text>
)

export default Header