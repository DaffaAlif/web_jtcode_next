import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Grid from '@mui/material/Grid'

import Cookies from 'universal-cookie'

import axios from 'axios'

import authConfig from 'src/configs/auth'

import { useEffect, useState } from 'react'

import UserLogTable from 'src/views/user-log/UserLogTable'
import Loaders from 'src/views/loaders/loaders'


const AlertsPage = () => {
  //loading state
  const [loading, setLoading] = useState(false)

  //fetch data
  const [message, setMessage] = useState('')
  const [data, setData] = useState([])
  useEffect(() => {
    setLoading(true)

    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .get('https://dev.iotaroundyou.my.id/api/user/logs', {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setLoading(false)
        setData(response.data.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [message])

  console.log(data)

  return loading == false ?  (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={12}>
            <UserLogTable 
               tableData={data}
            />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  ) : <Loaders/>
}

export default AlertsPage
