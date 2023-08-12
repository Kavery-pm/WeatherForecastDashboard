import { WeatherData } from "../../types";
import Layout from "../Reusable/Layout";
import { Grid } from "@mui/material";
import CityDateDetail from "./cityDateDetail";
import { getDate } from "../../utilities/dateUtilities";
import TemperatureDescription from "./temperatureDescription";
import TemperatureDetails from "./temperatureDetails";
import ErrorBox from "../Reusable/ErrorBox";
interface DetailProps {
  data: WeatherData;
  city: string;
}
const Details: React.FC<DetailProps> = ({ data, city }) => {
  const currentDate = getDate(data.dt);
  const noDataProvided =
  !data || Object.keys(data).length === 0 ;
  
  if(noDataProvided) return <ErrorBox flex="1" type="error"/>
  const content = (
    <>
      <Grid
        item
        xs={4}
        sx={{
          height: "80px",
        }}
      >
        <CityDateDetail city={city} date={currentDate} />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          height: "80px",
        }}
      >
        <TemperatureDescription
          temperature={data.main.temp}
          description={data.weather[0]?.description}
        />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          height: "80px",
        }}
      >
        <TemperatureDetails max={data.main.temp_max} min={data.main.temp_min} />
      </Grid>
    </>
  );
  return <Layout content={content} title="Current Weather" />;
};
export default Details;
