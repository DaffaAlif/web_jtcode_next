import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

import Cookies from 'universal-cookie'

import axios from 'axios'

import authConfig from 'src/configs/auth'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

//Component
import AlarmsetTable from 'src/views/alarmset/alarmsetTable'
import FormLayoutsEditAlarmset from 'src/views/alarmset/edit-form/alarmsetEditForm'
import DialogConfirmationDelete from 'src/views/delete-confirmation/deleteConfirmation'
import SnackbarAlert from 'src/views/snackbar/snackbarAlert'
import Loaders from 'src/views/loaders/loaders'

const AlarmsetPage = () => {
  const [fetchData, setFetchData] = useState()
  //loading state
  const [loading, setLoading] = useState(false)
  
  //message state
  const [message, setMessage] = useState('')

  //check success add data
  const router = useRouter()
  const { add_success } = router.query
  useEffect(() => {
    if (add_success){
      setError(false)
      setOpenSnackbarAlert(true)
      setMessage('data berhasil ditambahkan')
    }else{
      null
    }
  }, [])

  //check permission
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
          return userPermission[keys].name == 'Alarm'
        })
        setUserDataPermission(userPermission[filteredPermission].pivot.role_permission)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  
  //Alarms data
  const [dataAlarms, setDataAlarms] = useState([])
  useEffect(() => {
    setLoading(true)
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .get('https://dev.iotaroundyou.my.id/api/alarms', {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setDataAlarms(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [fetchData])
  // Printers data
  const [dataPrinters, setDataPrinters] = useState([])
  useEffect(() => {
    setLoading(true)
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
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [fetchData])
  //Parameter data
  const [dataParameters, setDataParameters] = useState([])
  useEffect(() => {
    setLoading(true)
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .get('https://dev.iotaroundyou.my.id/api/parameters', {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setDataParameters(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [fetchData])

  //take data from selected row
  const [selectedData, setSelectedData] = useState({
    parameter_id: 'selectedData.parameter_id',
    printer_id: 'selectedData.printer_id',
    alarm_id: 'selectedData.alarm_id',
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
    if (!selectedData.alarm_id) {
      setMessage('Please enter an ID to delete.')
      return
    }
    axios
      .post(
        `https://dev.iotaroundyou.my.id/api/alarm/delete`,
        { alarm_id: selectedData.alarm_id },
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
        console.error(error)
      })
  }

  //edit data
  const handleEdit = () => {
    setFetchData(true)
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    console.log(selectedData)
    axios
      .post(`https://dev.iotaroundyou.my.id/api/alarm/update`, selectedData, {
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
        console.error(error)
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
              <AlarmsetTable permission={userDataPermission} selectData={handleSelectedData} tableData={dataAlarms} />
            </Grid>
          </Grid>
        </KeenSliderWrapper>
      </ApexChartWrapper>
      <FormLayoutsEditAlarmset
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        selectedData={selectedData}
        dataPrinters={dataPrinters}
        dataParameters={dataParameters}
        handleFormChange={handleEditFormChange}
        handleEdit={handleEdit}
      />
      <DialogConfirmationDelete
        open={openDeleteConfirmation}
        handleClose={handleCloseDeleteConfirmation}
        handleDelete={handleDelete}
      />
      <SnackbarAlert open={openSnackbarAlert} message={message} error={error} handleClose={handleSnackbarAlertClose} />
    </>
  ) : <>
    <Loaders/>
  </>
}

export default AlarmsetPage
