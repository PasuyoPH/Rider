import * as Types from 'app-types'
import { Text } from '../../../components'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { FloatingCard, JobHistoryCard } from '../../../components/Display'
import { faMotorcycle, faCoins } from '@fortawesome/free-solid-svg-icons'
import QuickNavigation from '../../QuickNavigation'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { Http } from 'app-structs'

const http = new Http.Client()

const HomePage = (rider: Types.App.RiderAppData) => {
  const [history, setHistory] = useState<Types.Job.Job[]>([]),
    [job, setJob] = useState<Types.Job.Job>(undefined)

  useFocusEffect(
    useCallback(
      () => {
        const getHistory = async () => {
            const res = await http.request<Types.Job.Job[]>(
              {
                method: 'get',
                url: Types.Constants.Url.Routes.RIDER_HISTORY,
                headers: {
                  Authorization: rider.token
                }
              }
            )

            setHistory(res.value ?? [])
          },
          getCurrentJob = async () => {
            const res = await http.request<Types.Job.Job>(
              {
                method: 'get',
                url: Types.Constants.Url.Routes.RIDER_CURRENT_JOB,
                headers: {
                  Authorization: rider.token
                }
              }
            )

            setJob(res.value ?? null)
          }

        // get history
        getHistory()
          .catch(console.error)

        getCurrentJob()
          .catch(console.error)
      },
      []
    )
  )

  return (
    <>
      <SafeAreaView
        style={
          {
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            paddingHorizontal: 32,
            paddingVertical: 16,
            backgroundColor: Types.Constants.Colors.Layout.tertiary 
          }
        }
      >
        <FloatingCard
          color={
            job === undefined ?
              Types.Constants.Colors.Layout.main : (
                job ?
                  Types.Constants.Colors.Layout.green :
                  Types.Constants.Colors.Layout.danger
              )
          }
        >
          <Text.Label
            color={Types.Constants.Colors.Text.alt}
            weight='bold'
            size={20}
          >
            Welcome back, {rider.data.fullName.split(/ +/g)[0]}
          </Text.Label>  

          {
            job !== undefined ? (
              <Text.Label
                color={Types.Constants.Colors.Text.alt}
                style='italic'
                size={14}
              >
                {
                  job ?
                    'Click here to view your current job.' :
                    'You currently don\'t have a job.'
                }
              </Text.Label>
            ) : (
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <ActivityIndicator />
              </View>
            )
          }
        </FloatingCard>

        <View
          style={
            {
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }
          }
        >
          <Text.Label
            color={Types.Constants.Colors.Text.alt}
            font='Century Gothic Bold'
          >
            Quick Navigation
          </Text.Label>

          <ScrollView
            contentContainerStyle={
              {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',   
                gap: 32,
                justifyContent: 'flex-start'
              }
            }
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {
              QuickNavigation.map(
                (item, idx) => (
                  <Text.LabelIcon
                    icon={item.icon}
                    key={idx}
                  >
                    {item.label}
                  </Text.LabelIcon>
                )
              )
            }

{
              QuickNavigation.map(
                (item, idx) => (
                  <Text.LabelIcon
                    icon={item.icon}
                    key={idx}
                  >
                    {item.label}
                  </Text.LabelIcon>
                )
              )
            }

{
              QuickNavigation.map(
                (item, idx) => (
                  <Text.LabelIcon
                    icon={item.icon}
                    key={idx}
                  >
                    {item.label}
                  </Text.LabelIcon>
                )
              )
            }
          </ScrollView>
        </View>
      </SafeAreaView>

      <View
        style={
          {
            display: 'flex',
            flexDirection: 'column',
            paddingHorizontal: 32,
            paddingVertical: 16
          }
        }
      >
        <Text.Header
          font='Century Gothic Bold'
          color={Types.Constants.Colors.Text.main}
          size={28}
        >
          History
        </Text.Header>

        <ScrollView
          contentContainerStyle={
            {
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
              padding: 8
            }
          }
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <FloatingCard
            color={Types.Constants.Colors.Layout.secondary}
            style={
              {
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
                justifyContent: 'center',
                alignItems: 'center'
              }
            }
            radius={4}
          >
            <View
              style={
                {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }
              }
            >
              <Text.Header
                size={24}
                font='Century Gothic Bold'
                color='#56996b'
              >
                Total
              </Text.Header>

              <Text.Label
                style='italic'
              >
                Rides
              </Text.Label>
            </View>

            <View
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
                icon={faMotorcycle}
                size={32}
                color={Types.Constants.Colors.Layout.tertiary}
              />

              <Text.Label>
                16 Rides
              </Text.Label>
            </View>
          </FloatingCard>

          <FloatingCard
            color={Types.Constants.Colors.Layout.secondary}
            style={
              {
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
                justifyContent: 'center',
                alignItems: 'center'
              }
            }
            radius={4}
          >
            <View
              style={
                {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }
              }
            >
              <Text.Header
                size={24}
                font='Century Gothic Bold'
                color='#56996b'
              >
                Total
              </Text.Header>

              <Text.Label
                style='italic'
              >
                Paid
              </Text.Label>
            </View>

            <View
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
                icon={faCoins}
                size={32}
                color={'#FFD700'}
              />

              <Text.Label>
                Php279.32
              </Text.Label>
            </View>
          </FloatingCard>
        </ScrollView>

        <View
          style={
            { marginTop: 8 }
          }
        >
          <Text.Label
            color={Types.Constants.Colors.Layout.main}
            font='Century Gothic Bold'
          >
            Jobs finished today
          </Text.Label>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={
          {
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            paddingHorizontal: 32,
            paddingBottom: 8
          }
        }
      >
        {
          history.map(
            (job, idx) => (
              <JobHistoryCard
                key={idx}
                {...job}
              />
            )
          )
        }
      </ScrollView>
    </>
  )
}

export default HomePage