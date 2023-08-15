import * as Types from 'app-types'
import { faCog, faWallet } from '@fortawesome/free-solid-svg-icons'

const QuickNavigation: Types.App.QuickNavigationItem[] = [
  {
    icon: faWallet,
    label: 'Wallet',
    to: 'Wallet'
  },

  {
    icon: faCog,
    label: 'Settings',
    to: 'Settings'
  }
]

export default QuickNavigation