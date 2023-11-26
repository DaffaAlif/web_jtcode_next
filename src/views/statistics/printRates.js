import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

const PrintRates = () => {
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
      <Typography sx={{ mb: 2 }}>Print Rates</Typography>

      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography fontWeight='bold'>null</Typography>
            <Typography sx={{ fontSize: 10 }}>average prints per hour</Typography>
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
            <Typography fontWeight='bold'>null</Typography>
            <Typography sx={{ fontSize: 10 }}>total prints per hour</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' color='red'></Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PrintRates
