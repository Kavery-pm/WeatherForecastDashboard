import React from "react"
import { WeatherData } from "../../types"
import { Card, CardContent,Box,Grid} from '@mui/material'
interface TodayWeatherProps {
    weather: WeatherData,
    city: string
}
const TodayWeather: React.FC<TodayWeatherProps> = ({weather,city})=>{
return (
    <Card>
    <CardContent>
     
      <Box mt={1}>
      <Grid container sx={{ padding: '3rem 0rem 0rem' }} className="todayWeatherbox">
   <h1>{city}</h1>
    </Grid>
      </Box>
    </CardContent>
  </Card>
)
}
export default TodayWeather