import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Types from 'app-types'
import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Http } from 'app-structs'
import { ActivityIndicator, View } from 'react-native'
import { Text } from '../../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FloatingCard } from '../../../components/Display'
import SelectDropdown from 'react-native-select-dropdown'
import { JobStatusAsText } from 'app-types/src/job'

const http = new Http.Client()

const MapPage = (rider: Types.App.RiderAppData) => {

  return rider.geo ? (
    true ? (
      (
        <View
          style={
            {
              position: 'relative',
              flexGrow: 1
            }
          }
        >
          <MapView
            style={{ flex: 1 }}
            initialRegion={
              {
                latitude: rider.geo.lat,
                longitude: rider.geo.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
              }
            }
            region={
              {
                latitude: rider.geo.lat,
                longitude: rider.geo.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
              }
            }
            showsUserLocation
            showsMyLocationButton={false}
            zoomEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            provider={PROVIDER_GOOGLE}
          />
        </View>
      )
    ) : (
      <SafeAreaView>
        {
          true === undefined ?
            <ActivityIndicator /> :
            (
              <Text.Label>
                You must have a job to view this page
              </Text.Label>
            )
        }
      </SafeAreaView>
    )
  ) : null
}

export default MapPage