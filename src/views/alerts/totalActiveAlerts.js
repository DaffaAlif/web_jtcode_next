import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

const TotalActiveAlerts = () => {
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
          <Typography color='red'>2</Typography>
          <Typography color='red'>Faults</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 6 }}>
          <Typography color='orange'>6</Typography>
          <Typography color='orange'>Warning</Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default TotalActiveAlerts
