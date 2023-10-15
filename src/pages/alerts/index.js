import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Grid from '@mui/material/Grid'

import AlertsContentHeader from 'src/views/alerts/alertsContentHeader'
import PrintRates from 'src/views/alerts/printRates'
import PrintProgress from 'src/views/alerts/printProgress'
import TimeBetweenAlerts from 'src/views/alerts/timeBetweenAlerts'

const Alerts = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AlertsContentHeader />
          </Grid>
          <Grid item xs={12} lg={4}>
            <PrintRates />
          </Grid>
          <Grid item xs={12} lg={4}>
            <PrintProgress />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TimeBetweenAlerts />
          </Grid>
          <Grid item xs={12} lg={8}></Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default Alerts
