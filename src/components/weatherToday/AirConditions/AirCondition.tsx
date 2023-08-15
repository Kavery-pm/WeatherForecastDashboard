/**
 * Renders a single air condition metric item.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - Title of the air condition metric.
 * @param {string} props.value - Value of the air condition metric.
 * @param {string} props.type - Type of the air condition metric (temperature, wind, clouds, humidity).
 * @returns {JSX.Element} AirConditionsItem component.
 */

import React from "react";
import { WeatherData } from "../../../types.ts";
import AirConditionsItem from "./airConditionsItem.tsx";
import Layout from "../../reusable/layout.tsx";
import { kelvinToCelsius } from "../../../utilities/temperatureUtilities.ts.ts";
import ErrorBox from "../../reusable/errorBox.tsx";

interface TodayWeatherAirConditionsProps {
  data: WeatherData | null;
}

const AirConditions: React.FC<TodayWeatherAirConditionsProps> = ({ data }) => {
  const noDataProvided = !data || Object.keys(data).length === 0;
  if (noDataProvided) return <ErrorBox flex="1" type="error" />;

  const { main, wind, clouds } = data; // Destructure properties from data

  const content = (
    <>
      {main && (
        <AirConditionsItem
          title="Real Feel"
          value={`${Math.round(kelvinToCelsius(main.feels_like))} °C`}
          type="temperature"
        />
      )}
      {wind && (
        <AirConditionsItem
          title="Wind"
          value={`${wind.speed} m/s`}
          type="wind"
        />
      )}
      {clouds && (
        <AirConditionsItem
          title="Clouds"
          value={`${Math.round(clouds.all)} %`}
          type="clouds"
        />
      )}
      {main && (
        <AirConditionsItem
          title="Humidity"
          value={`${Math.round(main.humidity)} %`}
          type="humidity"
        />
      )}
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
