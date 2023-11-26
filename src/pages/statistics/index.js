import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Cookies from 'universal-cookie'

import axios from 'axios'

import authConfig from 'src/configs/auth'

import { useEffect, useState } from 'react'

// * MUI 
import Grid from '@mui/material/Grid'

import AlertsContentHeader from 'src/views/statistics/alertsContentHeader'
import PrintRates from 'src/views/statistics/printRates'
import PrintProgress from 'src/views/statistics/printProgress'
import TimeBetweenAlerts from 'src/views/statistics/timeBetweenAlerts'

const StatisticsPage = () => {




  
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

export default StatisticsPage
