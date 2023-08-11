import React from "react";
import { WeatherData } from "../../../types";
import AirConditionsItem from "./AirConditionsItem";
import Layout from "../../Reusable/Layout.tsx";
import { kelvinToCelsius } from "../../../utilities/temperatureUtilities.ts";

interface TodayWeatherAirConditionsProps {
  data: WeatherData | null;
}

const AirConditions: React.FC<TodayWeatherAirConditionsProps> = ({ data }) => {
  const content = (
    <>
      <AirConditionsItem
        title="Real Feel"
        value={`${Math.round(kelvinToCelsius(data!.main.feels_like))} °C`}
        type="temperature"
      />
      <AirConditionsItem
        title="Wind"
        value={`${data!.wind.speed} m/s`}
        type="wind"
      />
      <AirConditionsItem
        title="Clouds"
        value={`${Math.round(data!.clouds.all)} %`}
        type="clouds"
      />
      <AirConditionsItem
        title="Humidity"
        value={`${Math.round(data!.main.humidity)} %`}
        type="humidity"
      />
    </>
  );
  return (
    <Layout
      title="AIR CONDITIONS"
      content={content}
      mb="1rem"
      sx={{ marginTop: "2.9rem" }}
    />
  );
};

export default AirConditions;
