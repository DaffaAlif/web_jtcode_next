// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
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

// ** SNACKBAR
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
// import { status } from 'nprogress'

const FormEditCustomer = () => {
  const router = useRouter()
  const { alarm_id,printer_id, parameter_id, name, condition, status, notes } = router.query

  const initialState = {
    alarm_id: alarm_id,
    printer_id : printer_id,
    parameter_id: parameter_id,
    name: name,
    condition:condition,
    status: status,
    notes: notes
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleFormChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  //SnackBar
  const [open, setOpen] = useState(false)
  const [snackPack, setSnackPack] = useState([])
  const [messageInfo, setMessageInfo] = useState(undefined)
  const [dataParameter, setDataParameter] = useState([])
  const [dataPrinters, setDataPrinters] = useState([])

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setOpen(true)
      setSnackPack(prev => prev.slice(1))
      setMessageInfo({ ...snackPack[0] })
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false)
    }
  }, [snackPack, messageInfo, open])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    // Make the Axios PUT request to update data
    axios
      .post(`https://dev.iotaroundyou.my.id/api/alarm/update`, formData, {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setSuccess(true)
        setError('Update Success! Redirecting you to Alarm Set Page')
        const message = 'success'
        setSnackPack(prev => [...prev, { message, key: new Date().getTime() }])
        router.push('/alarmset')
      })
      .catch(error => {
        setSuccess(false)
        const message = 'error'
        setSnackPack(prev => [...prev, { message, key: new Date().getTime() }])
        setError('An error occurred while updating the data. Please try again.')
        console.error(error)
      })
  }

   useEffect(() => {
     const cookies = new Cookies()
     const storedToken = cookies.get(authConfig.storageTokenKeyName)
     axios
       .get('https://dev.iotaroundyou.my.id/api/user/devicelist', {
         headers: {
           Authorization: 'Bearer ' + storedToken
         }
       })
       .then(response => {
         setDataPrinters(response.data.data)
       })
       .catch(error => {
         console.error('Error fetching data:', error)
       })
   }, [])

   useEffect(() => {
     const cookies = new Cookies()
     const storedToken = cookies.get(authConfig.storageTokenKeyName)
     axios
       .get('https://dev.iotaroundyou.my.id/api/parameters', {
         headers: {
           Authorization: 'Bearer ' + storedToken
         }
       })
       .then(response => {
         setDataParameter(response.data.data)
       })
       .catch(error => {
         console.error('Error fetching data:', error)
       })
   }, [])

  return (
    <Card>
      <CardHeader title='Update' />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                name='parameter_id'
                value={formData.parameter_id}
                onChange={handleFormChange}
                select
                defaultValue=''
                label='parameter id'
                id='parameter_id'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {dataParameter.map(dataParameter => {
                  return <MenuItem value={dataParameter.parameter_id}>{dataParameter.name}</MenuItem>
                })}
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                name='printer_id'
                value={formData.printer_id}
                onChange={handleFormChange}
                select
                defaultValue=''
                label='printer id'
                id='pprinter_id'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {dataPrinters.map(dataPrinters => {
                  return <MenuItem value={dataPrinters.printer_id}>{dataPrinters.name}</MenuItem>
                })}
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Name'
                name='name'
                value={formData.name}
                onChange={handleFormChange}
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
              <CustomTextField
                fullWidth
                label='Condition'
                name='condition'
                value={formData.condition}
                onChange={handleFormChange}
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
              <CustomTextField
                fullWidth
                name='status'
                value={formData.status}
                onChange={handleFormChange}
                select
                defaultValue=''
                label='Status'
                id='status'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={6}>Active</MenuItem>
                <MenuItem value={7}>Inactive</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                multiline
                minRows={3}
                label=' Notes'
                name='notes'
                value={formData.notes}
                onChange={handleFormChange}
                placeholder='Notes'
                sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon fontSize='1.25rem' icon='tabler:ballpen' />
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
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        TransitionProps={{ onExited: handleExited }}
        key={messageInfo ? messageInfo.key : undefined}
        message={messageInfo ? messageInfo.message : undefined}
      >
        <Alert
          elevation={3}
          variant='filled'
          onClose={handleClose}
          sx={{ width: '100%' }}
          severity={messageInfo?.message === 'success' ? 'success' : 'error'}
        >
          {error}
        </Alert>
      </Snackbar>
    </Card>
  )
}

export default FormEditCustomer
