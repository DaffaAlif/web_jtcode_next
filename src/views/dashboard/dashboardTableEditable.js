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
    flex: 0.1,
    field: 'id',
    minWidth: 100,
    headerName: 'Series'
  },
  {
    flex: 0.25,
    minWidth: 100,
    editable: true,
    field: 'full_name',
    headerName: ' Printer Name'
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'email',
    editable: true,
    headerName: 'Serial Number'
  },
  {
    flex: 0.15,
    type: 'date',
    minWidth: 100,
    editable: true,
    headerName: 'Print Count',
    field: 'start_date',
    valueGetter: params => new Date(params.value)
  },
  {
    flex: 0.15,
    minWidth: 100,
    editable: true,
    field: 'experience',
    headerName: 'AGE'
  }
]

const DashboardTableEditable = () => {


  
  const router = useRouter()
  console.log(rows)
  return (
    <Card sx={{maxHeight:400}}>
      <CardHeader title='Fleet Management' />
    
      <Box align='right' sx={{p: 3}}><Button onClick={() => router.push('/users')} variant='contained'>Edit</Button></Box>
      <Box sx={{ height: 500 }}>
        <DataGrid columns={columns} rows={rows.slice(0, 10)} />
      </Box>
    </Card>
  )
}

export default DashboardTableEditable
