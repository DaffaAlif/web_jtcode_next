// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import { Select } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// Form CheckBox
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const createData = (page, view, add, edit, del) => {
  return { page, view, add, edit, del }
}

const rows = [
  createData('Clients', false, false, false, false),
  createData('Customers', false, false, false, false),
  createData('Sites', false, false, false, false),
  createData('Printers', false, false, false, false),
  createData('Alarmset', false, false, false, false),
  createData('Instruments', false, false, false, false),
  createData('Parameters', false, false, false, false),
  createData('Users', false, false, false, false),
  createData('User Group', false, false, false, false)
]


// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const FormLayoutsEditUserGroup
  = ({ handleClose, open, selectedData, handleFormChange, handleEdit }) => {
    console.log(selectedData)
    console.log(rows)
  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <Card>
          <CardHeader title='Edit Data' />
          <CardContent>
            <form
              onSubmit={e => {
                e.preventDefault()
                handleEdit()
              }}
            >
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Pages</TableCell>
                          <TableCell align='center'>View</TableCell>
                          <TableCell align='center'>Add</TableCell>
                          <TableCell align='center'>Edit</TableCell>
                          <TableCell align='center'>Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow
                            key={row.page}
                            sx={{
                              '&:last-of-type td, &:last-of-type th': {
                                border: 0
                              }
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {row.page}
                            </TableCell>
                            <TableCell align='center'>
                              <FormControlLabel control={<Checkbox checked={row.view} />} />
                            </TableCell>
                            <TableCell align='center'>
                              <FormControlLabel control={<Checkbox checked={row.add} />} />
                            </TableCell>
                            <TableCell align='center'>
                              <FormControlLabel control={<Checkbox checked={row.edit} />} />
                            </TableCell>
                            <TableCell align='center'>
                              <FormControlLabel control={<Checkbox checked={row.delete} />} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      gap: 5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Button type='submit' variant='contained'>
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Dialog>
    </>
  )
}

export default FormLayoutsEditUserGroup
