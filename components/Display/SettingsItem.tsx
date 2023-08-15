import { Pressable, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Text } from '../'
import { Constants } from 'app-types'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

interface SettingsItemProps {
  icon?: any
  label: string
  to: string
}

const SettingsItem = (props: SettingsItemProps) => (
  <Pressable
    style={
      {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 32
      }
    }
    android_ripple={
      { color: '#5B81B3' }
    }
  >
    <View
      style={
        {
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          gap: 16
        }
      }
    >
      {
        props.icon ? (
          <FontAwesomeIcon
            color={Constants.Colors.Text.alt}
            icon={props.icon}
            size={28}
          />
        ) : null
      }

      <Text.Label
        color={Constants.Colors.Text.alt}
        size={20}
      >
        {props.label}
      </Text.Label>
    </View>

    <View
      style={
        { alignSelf: 'center' }
      }
    >
      <FontAwesomeIcon
        icon={faAngleRight}
        color={Constants.Colors.Text.alt}
      />
    </View>
  </Pressable>
)

export default SettingsItem