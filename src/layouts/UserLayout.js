import useMediaQuery from '@mui/material/useMediaQuery'
import { Box, Typography } from '@mui/material'
import Cookies from 'universal-cookie'
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'
import { useEffect, useState } from 'react'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const UserLayout = ({ children, contentHeightFixed }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()
  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  const [userDataPermission, setUserDataPermission] = useState(() => {
    const initialPermission = {}
    return initialPermission
  })
  useEffect(() => {
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .get('https://dev.iotaroundyou.my.id/api/user', {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        const userPermission = []
        console.log(response.data)
        response.data.role.role_permissions.map(data => {
          userPermission.push(data)
        })
        setUserDataPermission(userPermission)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const items = VerticalNavItems()

  const filteredNavbar = items[3].children.filter(navbarItem => {
    const filter = Array.isArray(userDataPermission)
      ? userDataPermission.find(userDataPermission => userDataPermission.name === navbarItem.title)
      : null
    return filter?.pivot?.role_permission[0] === 'v'
  })

  const NavbarItemsFiltered = filteredNavbar => {
    if (filteredNavbar.length < 5) {
      items[3].children = filteredNavbar
      delete items[4]
      return items
    } else {
      return items
    }
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: NavbarItemsFiltered(filteredNavbar)

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems()

            // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
            // navItems: horizontalMenuItems
          },
          appBar: {
            content: () => (
              <HorizontalAppBarContent
                settings={settings}
                saveSettings={saveSettings}
                horizontalNavItems={HorizontalNavItems()}
              />
            )
          }
        }
      })}
      footerProps={{
        content: () => 'Developed by daffalif02@gmail.com and muaz.abdlr@gmail.com'
      }}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
