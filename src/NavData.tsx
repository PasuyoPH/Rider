import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faHouse, faCog, faMap, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { NavItem } from 'app-types/src/app'

const NavData: NavItem[] = [
  {
    label: 'Home',
    to: 'Home',
    icon: faHouse
  },

  {
    label: 'Map',
    to: 'Map',
    icon: faMap
  },

  {
    label: 'Jobs',
    to: 'Jobs',
    icon: faBriefcase
  },

  {
    label: 'Profile',
    to: 'Profile',
    icon: faUserCircle
  }
]

export default NavData