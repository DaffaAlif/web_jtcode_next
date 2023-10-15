import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Grid from '@mui/material/Grid'

import StatisticContentHeader from 'src/views/statistic/statisticContentHeader'
import TotalActiveAlerts from 'src/views/statistic/totalActiveAlerts'
import FaultRecovery from 'src/views/statistic/faultRecovery'
import WarningRecovery from 'src/views/statistic/warningRecovery'
import UnprintedProducts from 'src/views/statistic/unprintedProducts'
import OEECompared from 'src/views/statistic/oeeCompared'
import DowntimeDifference from 'src/views/statistic/downtimeDifference'


const Statistic = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <StatisticContentHeader />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TotalActiveAlerts />
          </Grid>
          <Grid item xs={12} lg={4}>
            <FaultRecovery />
          </Grid>
          <Grid item xs={12} lg={4}>
            <WarningRecovery />
          </Grid>
          <Grid item xs={12} lg={4}>
            <UnprintedProducts />
          </Grid>
          <Grid item xs={12} lg={4}>
            <OEECompared />
          </Grid>
          <Grid item xs={12} lg={4}>
            <DowntimeDifference />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default Statistic
