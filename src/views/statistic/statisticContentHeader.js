import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {  Typography } from '@mui/material'

import Icon from 'src/@core/components/icon'

const StatisticContentHeader = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
        <Typography sx={{m:2, p:2}}>Faults and Optimisation</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant='contained' sx={{ '& svg': { mr: 2 }, m: 2 }}>
            <Icon icon='tabler:arrow-bar-to-down' /> Export
          </Button>
          <Button variant='contained' sx={{ '& svg': { mr: 2 }, m: 2 }}>
            <Icon icon='tabler:archive' /> Last 7 days
          </Button>
        </Box>
      </Box>
    )
}

export default StatisticContentHeader