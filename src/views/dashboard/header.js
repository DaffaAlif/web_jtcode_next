import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { Paper, Typography } from '@mui/material'

import Icon from 'src/@core/components/icon'


const DashboardHeader = () => {
    return (
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Button variant='contained' color='info' sx={{ '& svg': { mr: 2 }, m: 2 }}>
          <Icon icon='tabler:ad-2' fontSize='1.125rem' />
          4
        </Button>
        <Typography sx={{ m: 2 }}>Actions</Typography>
        <Button variant='contained' color='error' sx={{ '& svg': { mr: 2 }, m: 2 }}>
          <Icon icon='tabler:alert-triangle' fontSize='1.125rem' />2
        </Button>
        <Button variant='contained' color='warning' sx={{ '& svg': { mr: 2 }, m: 2 }}>
          <Icon icon='tabler:alert-triangle' fontSize='1.125rem' />6
        </Button>
        <Typography sx={{ m: 2 }}>Alerts</Typography>
      </Box>
    )
}

export default DashboardHeader
