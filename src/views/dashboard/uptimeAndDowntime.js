import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

const UptimeAndDowntime = () => {
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
      <Typography sx={{ mb: 2 }}>Uptime and Downtime</Typography>

      <Grid container>
        <Grid item xs={3}>
          <Typography>Uptime</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography>0</Typography>
            <Typography>100%</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' color='green'>
            +10%
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ width: '100%', m: '0 !important' }} />

      <Grid container>
        <Grid item xs={3}>
          <Typography>Downtime</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'space-between' }}>
            <Typography>0</Typography>
            <Typography>100%</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' color='red'>
            -10%
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default UptimeAndDowntime
