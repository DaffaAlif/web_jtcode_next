// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const SnackbarAlert = ({message, handleClose, open, error}) => {

  // ** Hook & Var
  const { settings } = useSettings()
  const { skin } = settings

  return (
    <Fragment>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
        <Alert
          variant='filled'
          severity={error ? 'error' : 'success'}
          onClose={handleClose}
          sx={{ width: '100%' }}
          elevation={skin === 'bordered' ? 0 : 3}
        >
          {message}
        </Alert>
      </Snackbar>
    </Fragment>
  )
}

export default SnackbarAlert
