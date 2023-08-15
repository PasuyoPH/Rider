import { Constants } from 'app-types'
import { View } from 'react-native'

interface DividerProps {
  color?: string
  width?: number
}

const Divider = (props: DividerProps) => (
  <View
    style={
      {
        width: '100%',
        borderWidth: props.width ?? .3,
        borderColor: props.color ?? Constants.Colors.Layout.secondary
      }
    }
  />
)

export default Divider