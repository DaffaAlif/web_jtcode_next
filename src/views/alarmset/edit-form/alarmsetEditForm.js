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

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const FormLayoutsEditAlarmset = ({ handleClose, open, selectedData, dataPrinters, dataParameters, handleFormChange, handleEdit }) => {
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
                  <CustomTextField
                    fullWidth
                    name='name'
                    label='Name'
                    value={selectedData.name}
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
                    name='condition'
                    label='Condition'
                    value={selectedData.condition}
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
                  <InputLabel id='demo-simple-select-label'>Printer</InputLabel>
                  <Select
                    fullWidth
                    name='printer_id'
                    value={selectedData.printer_id}
                    onChange={handleFormChange}
                    startAdornment={
                      <InputAdornment position='start'>
                        <Icon fontSize='1.25rem' icon='tabler:user' />
                      </InputAdornment>
                    }
                  >
                    {dataPrinters.map(dataPrinters => {
                      return (
                        <MenuItem key={dataPrinters.printer_id} value={dataPrinters.printer_id}>
                          {dataPrinters.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='demo-simple-select-label'>Parameter</InputLabel>
                  <Select
                    fullWidth
                    name='parameter_id'
                    value={selectedData.parameter_id}
                    onChange={handleFormChange}
                    startAdornment={
                      <InputAdornment position='start'>
                        <Icon fontSize='1.25rem' icon='tabler:user' />
                      </InputAdornment>
                    }
                  >
                    {dataParameters.map(dataParameters => {
                      return (
                        <MenuItem key={dataParameters.parameter_id} value={dataParameters.parameter_id}>
                          {dataParameters.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                  <Select
                    fullWidth
                    name='status'
                    value={selectedData.status}
                    onChange={handleFormChange}
                    startAdornment={
                      <InputAdornment position='start'>
                        <Icon fontSize='1.25rem' icon='tabler:user' />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value={6}>Active</MenuItem>
                    <MenuItem value={7}>Non Active</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    multiline
                    minRows={3}
                    name='notes'
                    label='Notes'
                    value={selectedData.notes}
                    onChange={handleFormChange}
                    sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
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

export default FormLayoutsEditAlarmset
