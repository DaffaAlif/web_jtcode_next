import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Grid from '@mui/material/Grid'

import PrintersPrintersTableFilter from 'src/views/printers/printersTableFilter'
import ParameterTableFilter from 'src/views/parameter/parameterTableFilter'

const Printers = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ParameterTableFilter />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default Printers
