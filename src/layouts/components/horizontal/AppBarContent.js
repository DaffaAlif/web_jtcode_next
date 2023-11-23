// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import Navigation from 'src/@core/layouts/components/horizontal/navigation'
import DashboardHeader from 'src/views/dashboard/header'

const AppBarContent = props => {
  // ** Props
  const { settings, saveSettings, horizontalNavItems } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <DashboardHeader />
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      <UserDropdown settings={settings} />
    </Box>
  )
}

export default AppBarContent
