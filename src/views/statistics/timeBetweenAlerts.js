import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

const TimeBetweenAlerts = () => {
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
      <Typography sx={{ mb: 2 }}>Time Between Alerts (hours)</Typography>

      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography fontWeight='bold'>0</Typography>
            <Typography sx={{ fontSize: 10 }}>average</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' color='green'></Typography>
        </Grid>
      </Grid>

      <Divider sx={{ width: '100%', m: '0 !important' }} />

      <Grid container>
        <Grid item xs={3}>
          <Typography></Typography>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography fontWeight='bold'>0</Typography>
            <Typography sx={{ fontSize: 10 }}>total</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' color='red'></Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TimeBetweenAlerts
