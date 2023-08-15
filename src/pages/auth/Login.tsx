import { useState } from 'react'
import { DeviceEventEmitter, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Form } from '../../../components'
import Button from '../../../components/Form/Button'
import { Http } from 'app-structs'
import * as Types from 'app-types'

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>(null),
    [pinCode, setPinCode] = useState<string>(null),
    [
      [error, message],
      setResult
    ] = useState([false, '']),
    [http, _] = useState(
      new Http.Client()
    )


  const onPressLogin = async () => {
    setResult([false, ''])

    const res = await http.request<string>(
      {
        method: 'post',
        url: Types.Constants.Url.Routes.AUTH_TOKEN,
        data: {
          phone: phoneNumber,
          pin: pinCode,
          rider: true
        }
      }
    )

    setResult(
      [res.error, res.message]
    )

    if (!res.error)
      DeviceEventEmitter.emit('token', res.value)
  }

  return (
    <SafeAreaView>
      <Text>
        Login PAGE
      </Text>
      
      <View
        style={
          {
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 8
          }
        }
      >
        <Form.Input
          value={phoneNumber}
          onValue={setPhoneNumber}
          placeholder='Phone Number'
          numberOnly
        />

        <Form.Input
          value={pinCode}
          onValue={setPinCode}
          placeholder='Pin Code'
          numberOnly
          maxLength={4}
          password
        />

        <Button
          onPress={onPressLogin}
        >
          Login
        </Button>

        {
          message ? (
            <Text>
              Error: {message}
            </Text>
          ) : null
        }
      </View>
    </SafeAreaView>
  )
}

export default LoginPage