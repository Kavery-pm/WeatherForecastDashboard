import { WeatherData } from "../../types";
import Layout from "../Layouts/Layout";
import { Grid } from '@mui/material';
import CityDateDetail from "./cityDateDetail";
interface DetailProps {
    data: WeatherData,
    city: string
}
const Details:React.FC<DetailProps> = ({data,city})=>{
    const content = (
<>
    <Grid
          item
          xs={4}
          sx={{
            height: '80px',
          }}
        >
        
         <CityDateDetail city={city} date='10/12/2023'/>
        </Grid>
  
            </>
)
    return (
     <Layout content={content} title='current Weather'/>
    )
}
export default Details;