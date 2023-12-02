import { Box } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress'

const Loaders = () => {


    return (
    <>
    <Box sx={{display:'flex', minWidth:'100%', minHeight:'100%', justifyContent:'center', alignItems:'center'}}>
        <CircularProgress/>
    </Box>
    </>
    )

}

export default Loaders
