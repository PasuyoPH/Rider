import { Constants } from 'app-types'
import { StyleProp, Text, View, type ViewStyle } from 'react-native'

interface FloatingCardProps {
  color?: string // this should default to #main color
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  radius?: number
}

const FloatingCard = (props: FloatingCardProps) => (
  <View
    style={
      {
        backgroundColor: props.color ?? Constants.Colors.Layout.main,
        padding: 16,
        borderRadius: props.radius ?? 10,
        elevation: 4,
        ...(props.style as any ?? {})
      }
    }
  >
    {props.children}
  </View>
)

export default FloatingCard