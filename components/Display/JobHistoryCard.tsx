import { Constants, Job } from 'app-types'
import FloatingCard from './FloatingCard'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBurger, faTruck } from '@fortawesome/free-solid-svg-icons'
import { View } from 'react-native'
import { Text } from '..'

const StatusColors: string[] = []

StatusColors[3] = '#56996b'
StatusColors[-1] = Constants.Colors.Layout.danger

const JobHistoryCard = (job: Job.Job) => (
  <FloatingCard
    color={
      StatusColors[job.status] ?? Constants.Colors.Layout.main
    }
    style={
      {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
      }
    }
  >
    <FontAwesomeIcon
      icon={
        job.type === Job.JobTypes.DELIVERY ?
          faTruck :
          faBurger
      }
      color={Constants.Colors.Layout.primary}
      size={32}
    />

    <View
      style={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }
      }
    >
      <Text.Label
        color={Constants.Colors.Text.alt}
        weight='bold'
      >
        Alexander Montoya
      </Text.Label>

      <Text.Label
        color={'#b3b3b3'}
        style='italic'
        size={12  }
      >
        {'+639456282634'}
      </Text.Label>
    </View>
  </FloatingCard>
)

export default JobHistoryCard