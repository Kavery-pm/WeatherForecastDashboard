import { Box, Typography } from "@mui/material";
import { kelvinToCelsius } from "../../utilities/temperatureUtilities.ts";
import React from "react";
interface TempertaureDetailsProps {
 
  max: number,
  min: number
}
const TemperatureDetails: React.FC<TempertaureDetailsProps> = ({
  max,min
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
        variant="h4"
        component="h4"
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
         Max {Math.round(kelvinToCelsius(max))} °C
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
        Min {Math.round(kelvinToCelsius(min))} °C
     
      </Typography>
    </Box>
  );
};
export default TemperatureDetails;
