import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import Icon from 'src/@core/components/icon'

const UnprintedProducts = () => {
  return (
    <Paper
      sx={{
        boxShadow: 2,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 200,
        justifyContent: 'space-around'
      }}
    >
      <Typography sx={{ mb: 2 }}>Total Active Alerts</Typography>
      <Box sx={{ display: 'flex', p: 2, m: 2, width: '100%' }}>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Typography align='center' sx={{ fontSize: 20, fontWeight: 'bold' }}>
              8
            </Typography>
            <Typography align='center' sx={{ fontSize: 10 }}>
              products detected but not printed
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align='right'>0%</Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ width: '100%', m: '0 !important' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          p: 2,
          m: 2
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 6 }}>
          <Typography color='orange'>NaN%</Typography>
          <Typography>Total Print</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right', ml: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 6 }}>
            <Icon align='center' fontSize='1 rem' icon='tabler:point-filled' color='red' />
            <Typography sx={{ fontSize: 10 }}>Unprintred</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 6 }}>
            <Icon align='center' fontSize='1 rem' icon='tabler:point-filled' color='green' />
            <Typography sx={{ fontSize: 10 }}>Printed</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default UnprintedProducts
