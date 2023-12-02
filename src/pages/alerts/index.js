import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Grid from '@mui/material/Grid'

import Cookies from 'universal-cookie'

import axios from 'axios'

import authConfig from 'src/configs/auth'

import { useEffect, useState } from 'react'

import StatisticContentHeader from 'src/views/alerts/statisticContentHeader'
import TotalActiveAlerts from 'src/views/alerts/totalActiveAlerts'
import FaultRecovery from 'src/views/alerts/faultRecovery'
import WarningRecovery from 'src/views/alerts/warningRecovery'
import UnprintedProducts from 'src/views/alerts/unprintedProducts'
import OEECompared from 'src/views/alerts/oeeCompared'
import DowntimeDifference from 'src/views/alerts/downtimeDifference'
import AlertTable from 'src/views/alerts/alertTable'
import Loaders from 'src/views/loaders/loaders'


const AlertsPage = () => {

  const [userDataPermission, setUserDataPermission] = useState('')
  useEffect(() => {
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .get('https://dev.iotaroundyou.my.id/api/user', {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        const userPermission = response.data.user_permissions
        const filteredPermission = Object.keys(userPermission).filter(keys => {
          return userPermission[keys].name == 'Printer'
        })
        setUserDataPermission(userPermission[filteredPermission].pivot.user_permission)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  //fetch data
  const [message, setMessage] = useState('')
  const [data, setData] = useState([])
  useEffect(() => {
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .get('https://dev.iotaroundyou.my.id/api/alerts', {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setData(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [message])

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
          <Grid item xs={12} lg={12}>
            <AlertTable 
              permission={userDataPermission} tableData={data}
            
            />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default AlertsPage
