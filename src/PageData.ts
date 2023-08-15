import { App } from 'app-types'
import LoginPage from './pages/auth/Login'
import HomePage from './pages/main/Home'
import ProfilePage from './pages/main/Profile'
import MapPage from './pages/main/Map'

const LoginPageData: App.PageItem[] = [
    {
      component: LoginPage,
      name: 'Login'
    }
  ],
  MainPageData: App.PageItem[] = [
    {
      component: HomePage,
      name: 'Home',
      hideHeader: true,
      statusBarColor: 'light'
    },

    {
      component: MapPage,
      name: 'Map',
      hideHeader: true
    },

    {
      component: HomePage,
      name: 'Jobs'
    },

    {
      component: ProfilePage,
      name: 'Profile',
      hideHeader: true,
      statusBarColor: 'light'
    }
  ]

export {
  LoginPageData,
  MainPageData
}