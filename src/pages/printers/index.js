import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

import Cookies from 'universal-cookie'

import axios from 'axios'

import authConfig from 'src/configs/auth'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'


//Component
import PrinterTable from 'src/views/printers/printerTable'
import FormLayoutsEditPrinter from 'src/views/printers/edit-form/printerEditForm'
import DialogConfirmationDelete from 'src/views/delete-confirmation/deleteConfirmation'
import SnackbarAlert from 'src/views/snackbar/snackbarAlert'
import Loaders from 'src/views/loaders/loaders'

const SitePage = () => {
  const [fetchData, setFetchData] = useState()
  //message state
  const [message, setMessage] = useState('')
  //loading state
  const [loading, setLoading] = useState(false)
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
        console.log(response.data)
        const filteredPermission = Object.keys(userPermission).filter(keys => {
          return userPermission[keys].name == 'Printer'
        })
        setUserDataPermission(userPermission[filteredPermission].pivot.role_permission)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  //fetch data
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
        setLoading(false)
        setDataPrinters(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [fetchData])
  //sites data
  const [dataSites, setDataSites] = useState([])
  useEffect(() => {
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .get('https://dev.iotaroundyou.my.id/api/sites', {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setDataSites(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [fetchData])
  //instruments data
  const [dataInstruments, setDataInstruments] = useState([])
  useEffect(() => {
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .get('https://dev.iotaroundyou.my.id/api/instruments', {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      })
      .then(response => {
        setDataInstruments(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [fetchData])


  //take data from selected row
  const [selectedData, setSelectedData] = useState({
    printer_id: 'selectedData.customer_id',
    printer_id: 'selectedData.printer_id',
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
    if (!selectedData.printer_id) {
      setMessage('Please enter an ID to delete.')
      return
    }
    axios
      .post(
        `https://dev.iotaroundyou.my.id/api/printer/delete`,
        { printer_id: selectedData.printer_id },
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      .then(response => {
        setFetchData(false)
        setMessage(`Data with ID  deleted successfully.`)
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
      .post(`https://dev.iotaroundyou.my.id/api/printer/update`, selectedData, {
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

  return loading == false ?  (
    <>
      <ApexChartWrapper>
        <KeenSliderWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <PrinterTable permission={userDataPermission} selectData={handleSelectedData} tableData={dataPrinters} />
            </Grid>
          </Grid>
        </KeenSliderWrapper>
      </ApexChartWrapper>
      <FormLayoutsEditPrinter
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        selectedData={selectedData}
        dataSites={dataSites}
        dataInstruments={dataInstruments}
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
  ) : <Loaders/>
}

export default SitePage
