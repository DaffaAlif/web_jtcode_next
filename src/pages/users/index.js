import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

import Cookies from 'universal-cookie'

import axios from 'axios'

import authConfig from 'src/configs/auth'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

//Component
import UserTable from 'src/views/users/userTable'
import FormLayoutsEditUser from 'src/views/users/edit-form/userEditForm'
import DialogConfirmationDelete from 'src/views/delete-confirmation/deleteConfirmation'
import SnackbarAlert from 'src/views/snackbar/snackbarAlert'
import Loaders from 'src/views/loaders/loaders'


const ClientPage = () => {
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
        const userPermission = response.data.role.role_permissions
        const filteredPermission = Object.keys(userPermission).filter(keys => {
          return userPermission[keys].name == 'Site'
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
      .get('https://dev.iotaroundyou.my.id/api/users', {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setLoading(false)
        setData(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [message])
  const [dataClients, setDataClients] = useState([])
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
        setLoading(false)
        setDataClients(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [message])
  //customers data
  const [dataCustomers, setDataCustomers] = useState([])
  useEffect(() => {
    setLoading(true)
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .get('https://dev.iotaroundyou.my.id/api/customers', {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setLoading(false)
        setDataCustomers(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [message])

  //take data from selected row
  const [selectedData, setSelectedData] = useState({
    username: 'selectedData.role_id',
    email: 'selectedData.code',
    name: 'selectedData.name',
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
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    if (!selectedData.user_id) {
      setMessage('Please enter an ID to delete.')
      return
    }
    axios
      .post(
        `https://dev.iotaroundyou.my.id/api/user/delete`,
        { user_id: selectedData.user_id },
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      .then(response => {
        setMessage(`Data with ID  deleted successfully.`)
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
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    console.log(selectedData)
    axios
      .post(`https://dev.iotaroundyou.my.id/api/user/update`, selectedData, {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
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
              <UserTable permission={userDataPermission} selectData={handleSelectedData} tableData={data} />
            </Grid>
          </Grid>
        </KeenSliderWrapper>
      </ApexChartWrapper>
      <FormLayoutsEditUser
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        selectedData={selectedData}
        dataClients={dataClients}
        dataCustomers={dataCustomers}
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
