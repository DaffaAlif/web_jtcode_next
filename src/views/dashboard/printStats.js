// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Hook Import
import UseBgColor from 'src/@core/hooks/useBgColor'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const data = [
  {
    amount: '0',
    trendNumber: 0,
    title: 'Print Count',
    avatarColor: 'primary',
    subtitle: '12.4k Sales',
    avatarIcon: 'tabler:chart-pie-2'
  },
  {
    amount: '0',
    trendNumber: 0,
    title: 'Print Times',
    avatarColor: 'success',
    subtitle: '',
    avatarIcon: 'tabler:currency-dollar'
  },
  {
    amount: '0',
    trendNumber: 0,
    title: 'Print Hours',
    avatarColor: 'secondary',
    subtitle: 'ADVT, Marketing',
    avatarIcon: 'tabler:credit-card'
  }
]

const PrintStats = () => {
  // ** Hooks
  const theme = useTheme()
  const bgColors = UseBgColor()

  return (
    <Card sx={{minHeight:200}}>
      <CardHeader align='center'
        title='Print Statistic Overview'
      />
      <CardContent>
        {data.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                '& img': { mr: 4 },
                alignItems: 'center',
                mb: index !== data.length - 1 ? 4 : undefined
              }}
            >
              <Box
                sx={{
                  rowGap: 1,
                  columnGap: 4,
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'space-between' }}>
                  <Typography variant='h6'>{item.title}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 4 }} variant='body2'>
                    {item.amount}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '& svg': { mr: 1, color: item.trend === 'negative' ? 'error.main' : 'success.main' }
                    }}
                  >
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>{`${item.trendNumber}%`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default PrintStats
