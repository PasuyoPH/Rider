import * as Types from 'app-types'
import { View, Pressable } from 'react-native'
import { Text } from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Display from '../../../components/Display'
import { faWallet, faCog } from '@fortawesome/free-solid-svg-icons'

const SettingsPage = (rider: Types.App.RiderAppData) => {
  return (
    <SafeAreaView
      style={
        {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: Types.Constants.Colors.Layout.main,
          flexGrow: 1
        }
      }
    >
      { /* Profile Section */ }
      <Pressable
        onPress={
          () => console.log('aaa')
        }
        style={
          {
            display: 'flex',
            flexDirection: 'row',
            gap: 12,
            marginVertical: 16,
            paddingVertical: 16,
            paddingHorizontal: 32
          }
        }
        android_ripple={
          { color: '#5B81B3' }
        }
      >
        { /* This should be profile pic */ }
        <View
          style={
            {
              backgroundColor: Types.Constants.Colors.Layout.primary,
              width: 76,
              height: 76,
              borderRadius: 100
            }
          }
        />

        <View
          style={
            {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              gap: 8
            }
          }
        >
          <Text.Label
            weight='bold'
            size={18}
            color={Types.Constants.Colors.Text.alt}
          >
            Alexander Jose Montoya
          </Text.Label>

          <Text.Label
            color={Types.Constants.Colors.Text.alt}
            size={14}
            style='italic'
          >
            +63{rider.data.phone.slice(1)}
          </Text.Label>
        </View>

        <View
          style={
            { alignSelf: 'center' }
          }
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            color={Types.Constants.Colors.Text.alt}
          />
        </View>
      </Pressable>

      <Display.Divider />

      <View
        style={
          {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 16
          }
        }
      >
        <Display.SettingsItem
          label='Wallet'
          to='Wallet'
          icon={faWallet}
        />
        
        <Display.SettingsItem
          label='Settings'
          to='Settings'
          icon={faCog}
        />
      </View>
    </SafeAreaView>
  )
}

export default SettingsPage