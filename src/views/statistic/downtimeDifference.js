import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

const DowntimeDifference = () => {
  return (
    <Paper
      sx={{
        boxShadow: 2,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 220,
        justifyContent: 'space-around'
      }}
    >
      <Typography sx={{ mb: 2 }}>Downtime Difference (in hour)</Typography>
      <Box sx={{ display: 'flex', p: 2, m: 2, width: '100%' }}>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Typography align='center' sx={{ fontSize: 20, fontWeight: 'bold' }}>
              -3
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
          <Typography>671</Typography>
          <Typography align='center' sx={{ fontSize: 10 }}>
            21 August 2023 - 28 August 2023
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 6 }}>
          <Typography>674</Typography>
          <Typography align='center' sx={{ fontSize: 10 }}>
            14 August 2023 - 21 August 2023
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default DowntimeDifference
