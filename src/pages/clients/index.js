import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'
import ClientTable from 'src/views/clients/clientTable'

import Cookies from 'universal-cookie'

import axios from 'axios'

import authConfig from 'src/configs/auth'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

//Component
import FormLayoutsEditClient from 'src/views/clients/edit-form/clientEditForm'
import DialogConfirmationDelete from 'src/views/delete-confirmation/deleteConfirmation'
import SnackbarAlert from 'src/views/snackbar/snackbarAlert'
import Loaders from 'src/views/loaders/loaders'

const ClientPage = () => {
  const [fetchData, setFetchData] = useState(false)
  //loading state
  const [loading, setLoading] = useState(false)
   //message state
   const [message, setMessage] = useState('')

   //check success add data
   const router = useRouter()
   const { add_success } = router.query
  
   useEffect(() => {
     console.log(add_success)
     if (add_success){
       setError(false)
       setOpenSnackbarAlert(true)
       setMessage('data berhasil ditambahkan')
     }else{
       console.log(add_success)
     }
   }, [])

  //check permission
  const [userDataPermission, setUserDataPermission] = useState([])
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
        const userPermission = response.data.role.role_permissions
        console.log(response.data)
        const filteredPermission = Object.keys(userPermission).filter(keys => {
          return userPermission[keys].name == 'Client'
        })
        setUserDataPermission(userPermission[filteredPermission].pivot.role_permission)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])


  //fetch data
  const [data, setData] = useState([])
  useEffect(() => {
    setLoading(true)
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
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [fetchData])

  //take data from selected row
  const [selectedData, setSelectedData] = useState({
    role_id: 'selectedData.role_id',
    code: 'selectedData.code',
    full_name: 'selectedData.name',
    address: 'selectedData.address',
    status: 'selectedData.status',
    notes: 'selectedData.notes'
  })
  const handleSelectedData = (row, edit = false, del = false) => {
    setSelectedData(row)
    if (edit) {
      handleClickOpenEditDialog()
    }
    if (del) {
      handleClickDeleteConfirmation()
    }
  }

  //delete data
  const handleDelete = () => {
    setFetchData(true)
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    if (!selectedData.role_id) {
      setMessage('Please enter an ID to delete.')
      return
    }
    axios
      .post(
        `https://dev.iotaroundyou.my.id/api/role/delete`,
        { role_id: selectedData.role_id },
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      .then(response => {
        setFetchData(false)
        handleCloseDeleteConfirmation()
        setOpenSnackbarAlert(true)
        setMessage(response.data.message)
      })
      .catch(error => {
        setMessage(`An error occurred while deleting data with ID.`)
        console.log(error.response.data.errors)
      })
  }

  //edit data
  const handleEdit = () => {
    setFetchData(true)
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    console.log(selectedData)
    axios
      .post(`https://dev.iotaroundyou.my.id/api/role/update`, selectedData, {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setFetchData(false)
        handleCloseEditDialog()
        handleSuccess(response)
      })
      .catch(error => {
        handleError(error.response.data.errors)
      })
  }
  const handleEditFormChange = e => {
    const { name, value } = e.target
    setSelectedData({ ...selectedData, [name]: value })
  }

  //dialogBox
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const handleClickOpenEditDialog = () => setOpenEditDialog(true)
  const handleCloseEditDialog = () => setOpenEditDialog(false)

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
  const handleClickDeleteConfirmation = () => setOpenDeleteConfirmation(true)
  const handleCloseDeleteConfirmation = () => setOpenDeleteConfirmation(false)

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

  return loading == false ? (
    <>
      <ApexChartWrapper>
        <KeenSliderWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ClientTable permission={userDataPermission} selectData={handleSelectedData} tableData={data} />
            </Grid>
          </Grid>
        </KeenSliderWrapper>
      </ApexChartWrapper>
      <FormLayoutsEditClient
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        selectedData={selectedData}
        handleFormChange={handleEditFormChange}
        handleEdit={handleEdit}
      />
      <DialogConfirmationDelete
        open={openDeleteConfirmation}
        handleClose={handleCloseDeleteConfirmation}
        handleDelete={handleDelete}
      />
      <SnackbarAlert open={openSnackbarAlert} message={message} handleClose={handleSnackbarAlertClose} error={error} />
    </>
  ) : <Loaders/>
}

export default ClientPage
