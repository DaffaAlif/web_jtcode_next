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
  const { site_id, code, name, address, location, status, notes } = router.query

  const initialState = {
    site_id: site_id,
    code: code,
    name: name,
    status: status,
    address: address,
    location: location,
    notes : notes
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
      .post(`https://dev.iotaroundyou.my.id/api/site/update`, formData, {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setSuccess(true)
        setError('Update Success! Redirecting you to Sites Page')
        const message = 'success'
        setSnackPack(prev => [...prev, { message, key: new Date().getTime() }])
        router.push('/sites')
      })
      .catch(error => {
        setSuccess(false)
        const message = 'error'
        setSnackPack(prev => [...prev, { message, key: new Date().getTime() }])
        setError('An error occurred while updating the data. Please try again.')
        console.error(error)
      })
  }

  return (
    <Card>
      <CardHeader title='Update' />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='site_id'
                name='site_id'
                disabled='true'
                value={formData.site_id}
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
              name='status'
              value={formData.status}
              onChange={handleFormChange}
              select
              defaultValue=''
              label='status'
              id='status'
            >
              <MenuItem value={6}>Active</MenuItem>
              <MenuItem value={7}>Inactive</MenuItem>
            </CustomTextField>
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
                placeholder='Address'
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
                label='location'
                name='location'
                value={formData.location}
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
                multiline
                minRows={3}
                label='Notes'
                name='notes'
                value={formData.notes}
                onChange={handleFormChange}
                placeholder='notes'
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
