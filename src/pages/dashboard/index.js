import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'
import Icon from 'src/@core/components/icon'

import Grid from '@mui/material/Grid'

import DashboardContentHeader from 'src/views/dashboard/dashboardContentHeader'
import ConnectedPrinters from 'src/views/dashboard/connectedPrinters'
import UptimeAndDowntime from 'src/views/dashboard/uptimeAndDowntime'
import PrintStats from 'src/views/dashboard/printStats'
import DashboardTableEditable from 'src/views/dashboard/dashboardTableEditable'
import DashboardTableBasic from 'src/views/dashboard/dashboardTableBasic'



const Dashboard = ({ hidden }) => {
  console.log(hidden)
    return (
      <ApexChartWrapper>
        
        <KeenSliderWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <DashboardContentHeader />
            </Grid>
            <Grid item xs={12} lg={4}>
              <ConnectedPrinters />
            </Grid>
            <Grid item xs={12} lg={4}>
              <UptimeAndDowntime />
            </Grid>
            <Grid item xs={12} lg={4}>
              <PrintStats />
            </Grid>
            <Grid item xs={12} lg={8}>
              <DashboardTableEditable />
            </Grid>
            <Grid item xs={12} lg={4}>
              <DashboardTableBasic />
            </Grid>
          </Grid>
        </KeenSliderWrapper>
      </ApexChartWrapper>
    )
}

export default Dashboard
