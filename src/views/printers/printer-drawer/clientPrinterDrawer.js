// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} label='Occured' {...props} />
})

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ClientPrinterDrawer = ({ open, toggle }) => {
  // ** State
  const [date, setDate] = useState(new Date())

  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={toggle}
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: [300, 400] } }}
    >
      <Header>
        <Typography variant='h5'>Add Alarm</Typography>
        <IconButton
          size='small'
          onClick={toggle}
          sx={{
            p: '0.375rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <Box sx={{ mb: 5 }}>
          <CustomTextField fullWidth type='number' label='Alarm Code' />
        </Box>
        <Box sx={{ mb: 5 }}>
          <CustomTextField fullWidth label='Alarm name' />
        </Box>
        <Box sx={{ mb: 5 }}>
          <CustomTextField fullWidth label='Site Name' />
        </Box>
        <Box sx={{ mb: 5 }}>
          <CustomTextField fullWidth label='Printer Name' />
        </Box>

        <Box sx={{ mb: 5 }}>
          <CustomTextField
            select
            fullWidth
            label='Status'
            id='payment-method-select'
            defaultValue='select-method'
          >
            <MenuItem value='select-method' disabled>
              Select Status
            </MenuItem>
            <MenuItem value='Cash'>Issued</MenuItem>
            <MenuItem value='Bank Transfer'>Acknowledge</MenuItem>
            <MenuItem value='Credit'>Solved</MenuItem>
          
          </CustomTextField>
        </Box>
        <Box sx={{ mb: 5 }}>
          <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
            <DatePicker
              selected={date}
              id='invoice-payment-date'
              customInput={<CustomInput />}
              onChange={date => setDate(date)}
            />
          </DatePickerWrapper>
        </Box>


        <div>
          <Button variant='contained' onClick={toggle} sx={{ mr: 4 }}>
            Send
          </Button>
          <Button variant='tonal' color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </div>
      </Box>
    </Drawer>
  )
}

export default ClientPrinterDrawer
