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

const FormLayoutsEditUser = ({ handleClose, open, selectedData, dataClients, dataCustomers, handleFormChange, handleEdit }) => {
 
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
                    label='Username'
                    name='username'
                    value={selectedData.username}
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
                    label='Password'
                    name='password'
                    value={selectedData.password}
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
                    label='Email'
                    name='email'
                    value={selectedData.email}
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
                  <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                  <Select
                    fullWidth
                    name='role'
                    value={selectedData.role}
                    onChange={handleFormChange}
                    startAdornment={
                      <InputAdornment position='start'>
                        <Icon fontSize='1.25rem' icon='tabler:user' />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value={2}>Client</MenuItem>
                    <MenuItem value={1}>Customer</MenuItem>
                  </Select>
                </Grid>
                {selectedData.role == 1 ? (
                  <Grid item xs={12}>
                    <InputLabel id='demo-simple-select-label'>Customer</InputLabel>
                    <Select
                      fullWidth
                      name='user_role_id'
                      value={selectedData.user_role_id}
                      onChange={handleFormChange}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Icon fontSize='1.25rem' icon='tabler:user' />
                        </InputAdornment>
                      }
                    >
                      {dataCustomers.map(dataCustomers => {
                        return (
                          <MenuItem key={dataCustomers.role_id} value={dataCustomers.role_id}>
                            {dataCustomers.name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </Grid>
                ) : selectedData.role == 2 ? (
                  <Grid item xs={12}>
                    <InputLabel id='demo-simple-select-label'>Client</InputLabel>
                    <Select
                      fullWidth
                      name='user_role_id'
                      value={selectedData.user_role_id}
                      onChange={handleFormChange}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Icon fontSize='1.25rem' icon='tabler:user' />
                        </InputAdornment>
                      }
                    >
                      {dataClients.map(dataClients => {
                        return (
                          <MenuItem key={dataClients.role_id} value={dataClients.role_id}>
                            {dataClients.name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    multiline
                    minRows={3}
                    label='Notes'
                    name='Notes'
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

export default FormLayoutsEditUser
