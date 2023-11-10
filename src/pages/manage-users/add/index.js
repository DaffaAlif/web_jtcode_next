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

const initialState = {
  code: '',
  parent_id: '',
  full_name: '',
  email: '',
  phone_num: '',
  address: '',
  password: '',
  user_type: 3
}


const FormLayoutsIcons = () => {
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState([])

  const router = useRouter()

  const handleFormChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
     console.log(formData)
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
    axios
      .post('https://dev.iotaroundyou.my.id/api/user/newreg', formData, {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setSuccess(true)
        setError('Data Insertion Success! Redirecting you')
        setFormData(initialState)
         const message = 'success'
         setSnackPack(prev => [...prev, { message, key: new Date().getTime() }])
        router.replace('/customer')
      })
      .catch(error => {
        setSuccess(false)
        setError('An error occurred while submitting the form. Please try again.')
         const message = 'error'
         setSnackPack(prev => [...prev, { message, key: new Date().getTime() }])
        console.error(error)
      })
  }

  
  

  return (
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
                name='parent_id'
                value={formData.client_id}
                onChange={handleFormChange}
                select
                defaultValue=''
                label='Client ID'
                id='parent_id'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {data.map(data => {
                  return <MenuItem value={data.user_id}>{data.full_name}</MenuItem>
                })}
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Name'
                name='full_name'
                value={formData.full_name}
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
                label='email'
                name='email'
                value={formData.email}
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
                label='password'
                name='password'
                value={formData.password}
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
                label='phonenum'
                name='phone_num'
                value={formData.phone_num}
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

export default FormLayoutsIcons
