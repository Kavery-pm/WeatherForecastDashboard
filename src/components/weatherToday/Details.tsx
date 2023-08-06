import { WeatherData } from "../../types";
import Layout from "../Layouts/Layout";
import { Grid } from "@mui/material";
import CityDateDetail from "./cityDateDetail";
import { getDate } from "../../utilities/dateUtilities";
import TemperatureDescription from "./temperatureDescription";
interface DetailProps {
  data: WeatherData;
  city: string;
}
const Details: React.FC<DetailProps> = ({ data, city }) => {
  const currentDate = getDate(data.dt);

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
       <TemperatureDescription   temperature={data.main.temp} description={data.weather[0]?.description}/>
      </Grid>
    </>
  );
  return <Layout content={content} title="Current Weather" />;
};
export default Details;
