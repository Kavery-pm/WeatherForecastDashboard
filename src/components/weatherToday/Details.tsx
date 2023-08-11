import { WeatherData } from "../../types";
import Layout from "../Reusable/Layout";
import { Grid } from "@mui/material";
import CityDateDetail from "./cityDateDetail";
import { getDate } from "../../utilities/dateUtilities";
import TemperatureDescription from "./temperatureDescription";
import TemperatureDetails from "./temperatureDetails";
interface DetailProps {
  data: WeatherData;
  city: string;
}
const Details: React.FC<DetailProps> = ({ data, city }) => {
  const currentDate = getDate(data.dt);
  console.log(data);
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
