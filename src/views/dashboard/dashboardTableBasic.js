// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'

import { useRouter } from 'next/router'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'full_name',
    headerName: 'Printer Type'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'Amount',
    headerName: 'Amount'
  }
]

const DashboardTableBasic = () => {
  const router = useRouter()

  return (
    <Card sx={{ maxHeight: 400 }}>
      <CardHeader title='Printers' />
      <Box align='right' sx={{ p: 3 }}>
        <Button onClick={() => router.push('/printers')} variant='contained'>Edit</Button>
      </Box>
      <Box sx={{ height: 500 }}>
        <DataGrid columns={columns} rows={rows.slice(0, 10)} />
      </Box>
    </Card>
  )
}

export default DashboardTableBasic
