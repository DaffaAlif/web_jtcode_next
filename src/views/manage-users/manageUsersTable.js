// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

import Cookies from 'universal-cookie'

// ** Config
import authConfig from 'src/configs/auth'

import { useEffect } from 'react'
import axios from 'axios'

import Link from 'next/link'

import { useRouter } from 'next/router'

// ** Custom Components
import Icon from 'src/@core/components/icon'

// ** SNACKBAR
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const ManageUsersTable = () => {
  // ** States
  const [message, setMessage] = useState('')
  const [dataCustomers, setDataCustomers] = useState([])
  const [dataClients, setDataClients] = useState([])
  const [data, setData] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  console.log(data)

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

  const [openDialog, setOpenDialog] = useState(false)
  const handleClickOpen = (data) => {
    setOpenDialog(true)
    setSelectedData(data)
  }
  const handleDialogClose = () => setOpenDialog(false)

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  const router = useRouter()

  const columns = [
    {
      flex: 0.2,
      minWidth: 110,
      field: 'name',
      headerName: 'name',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.full_name}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'notes',
      headerName: 'notes',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.notes}
        </Typography>
      )
    },
  

    {
      flex: 0.2,
      minWidth: 140,
      field: 'actions',
      headerName: 'actions',
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton aria-label='delete' size='small' onClick={() => handleClickOpen(row)}>
              <Icon align='center' fontSize='1 rem' icon='tabler:trash' color='red' />
            </IconButton>
          </Box>
        )
      }
    }
  ]

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
        setDataClients(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [message])

   useEffect(() => {
     const cookies = new Cookies()
     const storedToken = cookies.get(authConfig.storageTokenKeyName)
     axios
       .get('https://dev.iotaroundyou.my.id/api/clients', {
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
   }, [message])
  
  useEffect(() => {
    setData(dataCustomers.concat(dataClients)) 
  }, [dataCustomers, dataClients])

  const handleDelete = idToDelete => {
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    if (!idToDelete) {
      setMessage('Please enter an ID to delete.')
      return
    }
    axios
      .post(
        `https://dev.iotaroundyou.my.id/api/user/delete`,
        { alarm_id: idToDelete },
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      .then(response => {
        setMessage(`Data with ID  deleted successfully.`)
        const message = 'success'
        setSnackPack(prev => [...prev, { message, key: new Date().getTime() }])
      })
      .catch(error => {
        setMessage(`An error occurred while deleting data with ID.`)
        const message = 'error'
        setSnackPack(prev => [...prev, { message, key: new Date().getTime() }])
        console.error(error)
      })
  }

  function getRowId(data) {
    return data.user_id
  }

  return data ? (
    <Card>
      <CardHeader title='Alarm Set' />
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button variant='outlined' component={Link} href={'/alarmset/add'}>
          Add Data
        </Button>
      </CardActions>

      <DataGrid
        getRowId={getRowId}
        autoHeight
        pagination
        rows={data}
        rowHeight={62}
        columns={columns}
        checkboxSelection
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
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
          {message}
        </Alert>
      </Snackbar>
      {/* <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>WARNING!</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Anda akan menghapus data ini! Yakin akan melanjutkan?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleDialogClose}>tidak</Button>
          <Button onClick={handleDelete(selectedData.user_id)}>yakin</Button>
        </DialogActions>
      </Dialog> */}
    </Card>
  ) : null
}

export default ManageUsersTable
