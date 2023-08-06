import React from "react"
import { WeatherData } from "../../types"
import { Card, CardContent,Box,Grid} from '@mui/material'
import Details from "./Details"
import AirConditions from "./AirConditions/AirCondition"
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
  <Details data={weather} city={city}/>
  <AirConditions data={weather}/>
    </Grid>
      </Box>
    </CardContent>
  </Card>
)
}
export default TodayWeather