// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box, Paper } from '@mui/material'

import Icon from 'src/@core/components/icon'

// ** Custom Components Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const FaultRecovery = () => {
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [hexToRGBA(theme.palette.warning.main, 1)],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '64%' },
        track: {
          strokeWidth: '40%',
          background: hexToRGBA(theme.palette.customColors.trackBg, 1)
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: -3,
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.h4.fontSize
          }
        }
      }
    },
    grid: {
      padding: {
        bottom: 15
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 200 }
        }
      },
      {
        breakpoint: 960,
        options: {
          chart: { height: 160 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { height: 190 }
        }
      },
      {
        breakpoint: 660,
        options: {
          chart: { height: 160 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          chart: { height: 150 }
        }
      },
      {
        breakpoint: 425,
        options: {
          chart: { height: 130 }
        }
      }
    ]
  }

  return (
    <Card sx={{ minHeight: 200, maxHeight: 200 }}>
      <CardContent>
        <Typography variant='h5' align='center'>Fault Recovery</Typography>

        <ReactApexcharts type='radialBar' height={157} series={[0]} options={options} />
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', mt: 3 }}>
          <Paper sx={{ display: 'flex', flexDirection: 'row', boxShadow: 2, p: 1 }}>
            <Icon align='center' fontSize='1 rem' icon='tabler:point-filled' color='green' />
            <Typography sx={{ fontSize: 10 }}>&lt; 15m</Typography>
          </Paper>
          <Paper sx={{ display: 'flex', flexDirection: 'row', boxShadow: 2, p: 1 }}>
            <Icon align='center' fontSize='1 rem' icon='tabler:point-filled' color='blue' />
            <Typography sx={{ fontSize: 10 }}>&lt; 1h</Typography>
          </Paper>
          <Paper sx={{ display: 'flex', flexDirection: 'row', boxShadow: 2, p: 1 }}>
            <Icon align='center' fontSize='1 rem' icon='tabler:point-filled' color='orange' />
            <Typography sx={{ fontSize: 10 }}>&lt; 24h</Typography>
          </Paper>
          <Paper sx={{ display: 'flex', flexDirection: 'row', boxShadow: 2, p: 1 }}>
            <Icon align='center' fontSize='1 rem' icon='tabler:point-filled' color='red' />
            <Typography sx={{ fontSize: 10 }}>&gt; 24h</Typography>
          </Paper>
        </Box>
      </CardContent>
    </Card>
  )
}
export default FaultRecovery
