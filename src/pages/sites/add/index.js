// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import { Select } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { useRouter } from 'next/router'

import Cookies from 'universal-cookie'

// ** Config
import authConfig from 'src/configs/auth'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

//component from view
import SnackbarAlert from 'src/views/snackbar/snackbarAlert'

const initialState = {
  code: '',
  name: '',
  address: '',
  location: '',
  notes: '',
  customer_id: '',
  status: 6,
  user_type: 2,
  role_type: 3
}

const FormLayoutsIcons = () => {
  const [formData, setFormData] = useState(initialState)
  const [message, setMessage] = useState('')

  const router = useRouter()

  const handleFormChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // customers data
  const [dataCustomers, setDataCustomers] = useState([])
  useEffect(() => {
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .get('https://dev.iotaroundyou.my.id/api/customers', {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setDataCustomers(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .post('https://dev.iotaroundyou.my.id/api/site/create', formData, {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        handleSuccess(response)
        router.push('/sites?add_success=true')
      })
      .catch(error => {
        handleError(error.response.data.errors)
      })
  }

  //snackbar
  const [openSnackbarAlert, setOpenSnackbarAlert] = useState(false)
  const [error, setError] = useState(false)
  const handleSnackbarAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbarAlert(false)
  }
  const handleError = errors => {
    const error = []
    Object.keys(errors).map(keys => {
      error.push(errors[keys])
    })
    setOpenSnackbarAlert(true)
    setError(true)
    const allErrors = error.join('\n')
    setMessage(allErrors)
  }
  const handleSuccess = response => {
    setError(false)
    setOpenSnackbarAlert(true)
    setMessage(response.data.message)
  }

  return (
    <>
      <Card>
        <CardHeader title='Add' />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label='Code'
                  name='code'
                  value={formData.code}
                  onChange={handleFormChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon fontSize='1.25rem' icon='tabler:hash' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  name='name'
                  label='Name'
                  value={formData.name}
                  onChange={handleFormChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon fontSize='1.25rem' icon='tabler:hash' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id='demo-simple-select-label'>Customer</InputLabel>
                <Select
                  fullWidth
                  name='customer_id'
                  value={formData.customer_id}
                  onChange={handleFormChange}
                  startAdornment={
                    <InputAdornment position='start'>
                      <Icon fontSize='1.25rem' icon='tabler:user' />
                    </InputAdornment>
                  }
                >
                  {dataCustomers.map(dataCustomers => {
                    return (
                      <MenuItem key={dataCustomers.role_id} value={dataCustomers.role_id}>
                        {dataCustomers.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  multiline
                  minRows={3}
                  label='Address'
                  name='address'
                  value={formData.address}
                  onChange={handleFormChange}
                  sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon fontSize='1.25rem' icon='tabler:home' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  name='location'
                  label='Location'
                  value={formData.location}
                  onChange={handleFormChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon fontSize='1.25rem' icon='tabler:home' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                <Select
                  fullWidth
                  name='status'
                  value={formData.status}
                  onChange={handleFormChange}
                  startAdornment={
                    <InputAdornment position='start'>
                      <Icon fontSize='1.25rem' icon='tabler:user' />
                    </InputAdornment>
                  }
                >
                  <MenuItem value={6}>Active</MenuItem>
                  <MenuItem value={7}>Non Active</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  multiline
                  minRows={3}
                  label='Notes'
                  name='notes'
                  value={formData.notes}
                  onChange={handleFormChange}
                  sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon fontSize='1.25rem' icon='tabler:user' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type='submit' variant='contained'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <SnackbarAlert open={openSnackbarAlert} message={message} handleClose={handleSnackbarAlertClose} error={error} />
    </>
  )
}

export default FormLayoutsIcons
