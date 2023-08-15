import { Constants } from 'app-types'
import { Text, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

interface LabelIconProps {
  font?: string
  children?: string[] | string
  size?: number
  color?: string
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  style?: 'normal' | 'italic'
  icon: any
  iconSize?: number
}

const LabelIcon = (props: LabelIconProps) => (
  <Pressable
    style={
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
  >
    <FontAwesomeIcon
      icon={props.icon}
      size={props.iconSize ?? 24}
      color={props.color ?? Constants.Colors.Layout.primary}
    />

    <Text
      style={
        {
          fontFamily: props.font ?? 'Century Gothic Bold',
          fontSize: props.size ?? 12,
          color: props.color ?? Constants.Colors.Text.alt,
          fontWeight: props.weight ?? 'normal',
          fontStyle: props.style ?? 'normal'
        }
      }
    >
      {props.children}
    </Text>
  </Pressable>
)

export default LabelIcon