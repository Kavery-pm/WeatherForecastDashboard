/**
 * Displays the temperature and weather description for a given weather data.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.description - Description of the weather.
 * @param {number} props.temperature - Temperature in Kelvin.
 * @returns {JSX.Element} TemperatureDescription component.
 */

import { Box, Typography } from "@mui/material";
import { kelvinToCelsius } from "../../utilities/temperatureUtilities.ts";
interface TemperatureDescriptionDetail {
  description: string;
  temperature: number;
}

const TemperatureDescription: React.FC<TemperatureDescriptionDetail> = ({
  description,
  temperature,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: "600",
          fontSize: { xs: "12px", sm: "14px", md: "16px" },
          color: "white",
          textTransform: "uppercase",
          lineHeight: 1,
          marginBottom: "8px",
          fontFamily: "Poppins",
        }}
      >
        {Math.round(kelvinToCelsius(temperature))} °C
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: "10px", sm: "12px", md: "14px" },
          color: "rgba(255,255,255, .7)",
          lineHeight: 1,
          letterSpacing: { xs: "1px", sm: "0" },
          fontFamily: "Roboto Condensed",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};
export default TemperatureDescription;
