import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Pressable, Text, View } from 'react-native'
import NavData from '../../src/NavData'
import { Label } from '../Text'
import { Constants } from 'app-types'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const BottomBar = (props: BottomTabBarProps) => {
  return (
    <View
      style={
        {
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: Constants.Colors.Layout.secondary
        }
      }
    >
      {
        NavData.map(
          (item, idx) => {
            const focused = props.state.index === idx

            return (
              <Pressable
                onPress={
                  item.to ?
                    () => props.navigation.navigate(item.to) :
                    undefined
                }
                key={idx}
                style={
                  {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 16,
                    flex: 1
                  }
                }
              >
                {
                  item.icon ? (
                    <FontAwesomeIcon
                      icon={item.icon}
                      color={
                        focused ?
                          Constants.Colors.Text.main :
                          Constants.Colors.Text.secondary
                      }
                      size={20}
                    />
                  ) : null
                }

                <Label
                  color={
                    focused ?
                      Constants.Colors.Text.main :
                      Constants.Colors.Text.secondary
                  }
                  size={12}
                  weight='bold'
                >
                  {item.label}
                </Label>
              </Pressable>
            )
          }
        )
      }
    </View>
  )
}

export default BottomBar