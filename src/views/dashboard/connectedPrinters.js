import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { Paper, Typography } from '@mui/material'

const ConnectedPrinters = () => {
    return (
      <Paper sx={{ boxShadow: 2, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight:200 }}>
        <Typography sx={{ mb: 2 }}>Connected Printers</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, m: 2 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>8</Typography>
        </Box>
        <Divider sx={{ width: '100%', m: '0 !important' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            p: 2,
            m: 2
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 6 }}>
            <Typography>6</Typography>
            <Typography color='red'>Offline</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 6 }}>
            <Typography>2</Typography>
            <Typography color='green'>Online</Typography>
          </Box>
        </Box>
      </Paper>
    )
}

export default ConnectedPrinters