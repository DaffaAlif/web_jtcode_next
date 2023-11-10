// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import CustomChip from 'src/@core/components/mui/chip'
import FormEditCustomer from 'src/pages/customer/edit'

import Cookies from 'universal-cookie'

// ** Config
import authConfig from 'src/configs/auth'


import { useEffect } from 'react'
import axios from 'axios'

import Link from 'next/link'

import { useRouter } from 'next/router'

// ** Custom Components
import Icon from 'src/@core/components/icon'

import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'


// ** SNACKBAR
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const ClientPrintersTableFilter = () => {
  // ** States
  const [message, setMessage] = useState('')
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  console.log(message)

  const router = useRouter()

  const columns = [
    {
      flex: 0.2,
      minWidth: 110,
      field: 'code',
      headerName: 'client code',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.code}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'full_name',
      headerName: 'full_name',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.full_name}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'email',
      headerName: 'email',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.email}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'address',
      headerName: 'address',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.address}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'status',
      align: 'center',
      headerName: 'status',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <Typography variant='body2' align='center' sx={{ color: 'text.primary' }}>
            {row.status}
          </Typography>
        </Box>
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
            <IconButton aria-label='edit' size='small'>
              <Icon align='center' fontSize='1 rem' icon='tabler:ballpen' onClick={() => handleEdit(row)} />
            </IconButton>
            <IconButton aria-label='delete' size='small' onClick={() => handleDelete(row.user_id)}>
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
      .get('https://dev.iotaroundyou.my.id/api/clients', {
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


  const handleEdit = row => {
    const editUrl = `/clients/edit?user_id=${row.user_id}&code=${row.code}&full_name=${row.full_name}&email=${row.email}&address=${row.address}&status=${row.status}`
    router.push(editUrl)
  }

  const handleDelete = idToDelete => {
     const cookies = new Cookies()
     const storedToken = cookies.get(authConfig.storageTokenKeyName)
    if (!idToDelete) {
      setMessage('Please enter an ID to delete.')
      return
    }
    axios
      .post(
        `https://dev.iotaroundyou.my.id/api/user/deletereg`,
        { user_id: idToDelete },
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

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  function getRowId(data) {
    return data.user_id
  }

  console.log(data)

  return data ? (
    <Card>
      <CardHeader title='Clients' />
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button variant='outlined' component={Link} href={'/clients/add'}>
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
    </Card>
  ) : null
}

export default ClientPrintersTableFilter
