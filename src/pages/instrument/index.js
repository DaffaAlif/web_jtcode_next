import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Grid from '@mui/material/Grid'

import PrintersPrintersTableFilter from 'src/views/printers/printersTableFilter'
import InstrumentTableFilter
  from 'src/views/instrument/instrumentTableFilter'

const Printers = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <InstrumentTableFilter />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default Printers
