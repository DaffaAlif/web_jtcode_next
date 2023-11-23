// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'

import { useRouter } from 'next/router'

// ** Custom Components
import Icon from 'src/@core/components/icon'

const SiteTable = ({ permission, tableData, selectData }) => {
  console.log(tableData)
  // ** States
  const router = useRouter()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const columns = [
    {
      flex: 0.2,
      minWidth: 110,
      field: 'code',
      headerName: 'code',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.code}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'name',
      headerName: 'name',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'address',
      headerName: 'address',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.address}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'location',
      headerName: 'location',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.location}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'status',
      align: 'center',
      headerName: 'status',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.status == 6 ? 'Active' : 'Non Active'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'notes',
      align: 'center',
      headerName: 'notes',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <Typography variant='body2' align='center' sx={{ color: 'text.primary' }}>
            {row.notes}
          </Typography>
        </Box>
      )
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'actions',
      headerName: 'actions',
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton disabled={permission.includes('e') ? false : true} aria-label='edit' size='small'>
              <Icon
                align='center'
                fontSize='1 rem'
                icon='tabler:ballpen'
                onClick={() => selectData(row, true, false)}
              />
            </IconButton>
            <IconButton
              disabled={permission.includes('d') ? false : true}
              aria-label='delete'
              size='small'
              onClick={() => selectData(row, false, true)}
            >
              <Icon align='center' fontSize='1 rem' icon='tabler:trash' color='red' />
            </IconButton>
          </Box>
        )
      }
    }
  ]

  function getRowId(tableData) {
    return tableData.site_id
  }

  return tableData ? (
    <Card>
      <CardHeader title='Sites' />
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
          disabled={permission.includes('a') ? false : true}
          variant='outlined'
          onClick={() => router.push('/sites/add')}
        >
          Add Data
        </Button>
      </CardActions>
      <DataGrid
        getRowId={getRowId}
        autoHeight
        pagination
        rows={tableData}
        rowHeight={62}
        columns={columns}
        checkboxSelection
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  ) : (
    <Typography>no data</Typography>
  )
}

export default SiteTable
