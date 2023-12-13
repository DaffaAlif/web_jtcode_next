import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

import Cookies from 'universal-cookie'

import axios from 'axios'

import authConfig from 'src/configs/auth'

import { useEffect, useState } from 'react'

//Component
import UserGroupTable from 'src/views/user-group/userGroupTable'
import FormLayoutsEditUserGroup from 'src/views/user-group/edit-form/userGroupEditForm'
import DialogConfirmationDelete from 'src/views/delete-confirmation/deleteConfirmation'
import SnackbarAlert from 'src/views/snackbar/snackbarAlert'
import Loaders from 'src/views/loaders/loaders'

const UserGroupPage = () => {
  const [loading, setLoading] = useState(false)
  const [fetchData, setFetchData] = useState(false)
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
  const [message, setMessage] = useState('')
  const [data, setData] = useState([])
  useEffect(() => {
    setLoading(true)
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .get('https://dev.iotaroundyou.my.id/api/children', {
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
  }, [fetchData])
 


  //take data from selected row
  const [selectedData, setSelectedData] = useState(['----', '----', '----', '----', '----', '----']);
  const [selectedDataRow, setSelectedDataRow] = useState([]);

const handleSelectedData = async (row, edit = false, del = false) => {
  try {
    const cookies = new Cookies();
    const storedToken = cookies.get(authConfig.storageTokenKeyName);

    const response = await axios.post(
      'https://dev.iotaroundyou.my.id/api/permission',
      { role_id: row.role_id },
      {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      }
    );
    const initialValues = response.data.data.role_permissions.map(row => row.pivot.role_permission || '----');
    setSelectedDataRow(response.data.data);
    setSelectedData(initialValues)
    if (edit && initialValues.length > 0) {
      console.log(initialValues);
      handleClickOpenEditDialog();
    }
    if (del) {
      handleClickDeleteConfirmation();
    }
  } catch (error) {
    console.error('Error handling selected data:', error);
  }
};


  //delete data
  const handleDelete = () => {
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    if (!selectedDataRow.role_id) {
      setMessage('Please enter an ID to delete.')
      return
    }
    axios
      .post(
        `https://dev.iotaroundyou.my.id/api/role/delete`,
        { role_id: selectedDataRow.role_id },
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      .then(response => {
        setMessage(`Data with ID  deleted successfully.`)
        handleCloseDeleteConfirmation()
        setFetchData(true)
        setOpenSnackbarAlert(true)
        setMessage(response.data.message)
      })
      .catch(error => {
        setMessage(`An error occurred while deleting data with ID.`)
        console.log(error.response.data.errors)
      })
  }

  //edit data
  const [finalValue, setFinalValue] = useState({})
  const handleEdit = () => {
    setFetchData(true)
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios
      .post(`https://dev.iotaroundyou.my.id/api/role/permission`, finalValue, {
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
  const handleCheckboxChange = (rowIndex, column) => {
    const updatedValues = [...selectedData];
    updatedValues[rowIndex] = updatedValues[rowIndex].split('');
    if(column == 0 ){
      updatedValues[rowIndex][column] = updatedValues[rowIndex][column] === '-' ? 'v' : '-';
    }else if( column == 1){
      updatedValues[rowIndex][column] = updatedValues[rowIndex][column] === '-' ? 'a' : '-';
    }
    else if( column == 2){
      updatedValues[rowIndex][column] = updatedValues[rowIndex][column] === '-' ? 'e' : '-';
    }
    else if( column == 3){
      updatedValues[rowIndex][column] = updatedValues[rowIndex][column] === '-' ? 'd' : '-';
    }
    updatedValues[rowIndex] = updatedValues[rowIndex].join('');
    const newValue = updatedValues.map((updatedValues, index) => {
      return {
        user_group_id : selectedDataRow.role_permissions[index].user_group_id,
        role_permission : updatedValues
      }})
    setSelectedData(updatedValues);
    setFinalValue({
      role_id : selectedDataRow.role_id,
      role_permissions : newValue})
  };

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
    setMessage(response.data.data)
  }

  return loading == false ?  (
    <>
      <ApexChartWrapper>
        <KeenSliderWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <UserGroupTable permission={userDataPermission} selectData={handleSelectedData} tableData={data} />
            </Grid>
          </Grid>
        </KeenSliderWrapper>
      </ApexChartWrapper>
      <FormLayoutsEditUserGroup
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        selectedData={selectedData}
        selectedDataRow={selectedDataRow}
        handleCheckboxChange={handleCheckboxChange}
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

export default UserGroupPage
