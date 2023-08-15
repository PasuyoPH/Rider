import * as Types from 'app-types'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Http } from 'app-structs'
import { DeviceEventEmitter, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { LoginPageData, MainPageData } from './PageData'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Nav } from '../components'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import useState from 'react-usestateref'

const http = new Http.Client(),
  NativeStack = createNativeStackNavigator(),
  Tab = createBottomTabNavigator()

function App() {
  const [rider, setRider, riderRef] = useState<Types.App.RiderAppData>(
      {
        token: null,
        appState: Types.App.AppState.LOADING,
        gatewayState: Types.App.GatewayState.CLOSED
      }
    ),
    [fontsLoaded] = useFonts(
      {
        'Century Gothic': require('../assets/fonts/Century-Gothic.ttf'),
        'Century Gothic Bold': require('../assets/fonts/Century-Gothic-Bold.ttf'),
        'Roboto Condensed Italic': require('../assets/fonts/RobotoCondensed-Italic.ttf')
      }
    )
  
  const fetchRiderData = async (token: string) => {
    console.log('[INFO]: Fetching account data with token:', token)
    const res = await http.request<Types.Account.RiderAccountData>(
      {
        method: 'get',
        url: Types.Constants.Url.Routes.RIDER,
        headers: {
          Authorization: token
        }
      }
    )

    console.log(
      res.value ?
        '[INFO]: Received account data with id: ' + res.value?.uid :
        '[INFO]: Failed to fetch account with associated token.'
    )

    setRider(
      (latestRider) => (
        res.value ? (
          {
            ...latestRider,
            data: res.value,
            appState: Types.App.AppState.LOGGED_IN,
            token
          }
        ) : (
          {
            ...latestRider,
            appState: Types.App.AppState.LOGGED_OUT,
            token
          }
        )
      )
    )

    // Save new value to async storage
    await AsyncStorage.setItem('token', token)
  }

  useEffect(
    () => {
      console.log('[INFO]: Initial load.')
      console.log('[INFO]: Running App:init()')

      const init = async () => {
        console.log('[INFO]: Fetching user token from storage.')
        
        if (rider.token && rider.data) return console.log('[INFO]: User already logged in. Nothing to do.')

        const token = await AsyncStorage.getItem('token') ?? undefined
        console.log('[INFO]: AsyncStorage.getItem(\'token\') returned:', token)

        if (!token)
          return setRider(
            (latestRider) => (
              {
                ...latestRider,
                appState: Types.App.AppState.LOGGED_OUT
              }
            )
          )

        await fetchRiderData(token)
      }

      init()
        .catch(console.error)

      DeviceEventEmitter.addListener( // event should be triggered when we receive token
        'token',
        async (token: string) => {
          if (token) await fetchRiderData(token)
          else { // logout
            await AsyncStorage.setItem('token', null)
            setRider(
              (latestRider) => (
                {
                  ...latestRider,
                  token: null,
                  appState: Types.App.AppState.LOGGED_OUT
                }
              )
            )
          }
        }
      )

      DeviceEventEmitter.addListener(
        'location',
        (geo: Types.App.Geo) => {
          console.log('[INFO]: Location update:', geo)
          setRider(
            (latestRider) => (
              {
                ...latestRider,
                geo
              }
            )
          )
        }
      )

      return () => {
        DeviceEventEmitter.removeAllListeners('token')
        DeviceEventEmitter.removeAllListeners('location')

        // close websocket here
        if (riderRef.current.websocket)
          riderRef.current.websocket.close()

        const init = async () => {
          console.log('[INFO]: Stopping all background location trackers.')
          await TaskManager.unregisterAllTasksAsync()
        }

        init()
          .catch(console.error)

        console.log('[INFO]: App:unmount()')
      }
    },
    []
  )

  useEffect(
    () => {
      if (rider.data === undefined) return

      const init = async () => {
        console.log('[INFO]: RiderApp:data got updated:', rider.data)
        if (rider.data?.optInLocation) { // check necessary permissions
          const foregroundPermissions = await Location.requestForegroundPermissionsAsync()
          if (foregroundPermissions.granted) {
            const backgroundPermissions = await Location.requestBackgroundPermissionsAsync()
            console.log('[INFO]: Background permissions:', backgroundPermissions.granted)

            if (backgroundPermissions.granted) {
              const hasStartedLocationCheck = await Location.hasStartedLocationUpdatesAsync('LOCATION_TRACKER')
              if (hasStartedLocationCheck) return
              else await Location.startLocationUpdatesAsync(
                'LOCATION_TRACKER',
                {
                  accuracy: Location.Accuracy.BestForNavigation,
                  timeInterval: 2500,
                  mayShowUserSettingsDialog: true,
                  foregroundService: {
                    notificationTitle: 'Pasuyo Rider',
                    notificationBody: 'Tracking your location'
                  }
                }
              )
            }
          }
        }
      }

      init()
        .catch(console.error)
    },
    [rider.data]
  )

  if (!fontsLoaded) return null

  switch (rider.appState) {
    case Types.App.AppState.LOGGED_OUT: {
      return (
        <NavigationContainer>
          <NativeStack.Navigator
            screenOptions={
              { headerShown: false }
            }
          >
            {
              LoginPageData.map(
                (page, idx) => (
                  <NativeStack.Screen
                    key={idx}
                    name={page.name}
                    component={page.component}
                  />
                )
              )
            }
          </NativeStack.Navigator>
        </NavigationContainer>
      )
    }

    case Types.App.AppState.LOGGED_IN: {
      switch (rider.gatewayState) {
        case Types.App.GatewayState.CLOSED: {
          if (rider.websocket && rider.websocket.readyState === WebSocket.OPEN) // close if existing connection
            rider.websocket.close()

          if (
            !rider.websocket ||
            rider.websocket.readyState !== WebSocket.OPEN
          ) {
            if (rider.websocket?.readyState !== WebSocket.CONNECTING) {
              console.log('[INFO]: Creating connection to gateway:', Types.Constants.Url.Gateway)
              const connection = new WebSocket(Types.Constants.Url.Gateway)

              connection.onopen = () => {
                console.log('[INFO]: Gateway connection opened.')
                setRider(
                  (latestRider) => (
                    {
                      ...latestRider,
                      gatewayState: Types.App.GatewayState.CONNECTED
                    }
                  )
                )
              }

              connection.onclose = () => {
                console.log('[INFO]: Gateway connection closed.')
                setRider(
                  (latestRider) => (
                    {
                      ...latestRider,
                      gatewayState: Types.App.GatewayState.CLOSED
                    }
                  )
                )
              }
              
              setRider(
                (latestRider) => (
                  {
                    ...latestRider,
                    websocket: connection
                  }
                )
              )
            }
          }

          return (
            <SafeAreaView>
              <Text>
                Connecting...
              </Text>
            </SafeAreaView>
          )
        }

        case Types.App.GatewayState.CONNECTED: {
          return (
            <NavigationContainer>
              <Tab.Navigator
                tabBar={Nav.BottomBar}
                sceneContainerStyle={
                  { backgroundColor: Types.Constants.Colors.Layout.primary }
                }
                screenOptions={
                  {
                    headerStyle: { backgroundColor: Types.Constants.Colors.Layout.secondary }
                  }
                }
              >
                {
                  MainPageData.map(
                    (page, idx) => (
                      <Tab.Screen
                        key={idx}
                        name={page.name}
                        options={
                          {
                            headerShown: !page.hideHeader,
                            unmountOnBlur: true
                          }
                        }
                      >
                        {
                          () => (
                            <>
                              <StatusBar
                                style={page.statusBarColor ?? 'dark'}
                              />

                              <page.component
                                {...rider}
                              />
                            </>
                          )
                        }
                      </Tab.Screen>
                    )
                  )
                }
              </Tab.Navigator>
            </NavigationContainer>
          )
        }

        default: {} break
      }
    }

    default: {
      return null
    }
  }
}

export default App

TaskManager.defineTask(
  'LOCATION_TRACKER',
  (body) => {
    const [location] = (body.data as any).locations as any[]
    if (!location.coords) return
    
    DeviceEventEmitter.emit(
      'location',
      {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
    )
  }
)