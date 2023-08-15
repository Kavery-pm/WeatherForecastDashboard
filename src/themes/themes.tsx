
/**
 * Custom theme configuration for the Weather Dashboard application.
 */

import { createTheme } from "@mui/material/styles";

 export const defaultFontFamily = "Poppins,sans-serif";
export const titleFontFamily = "Caprasimo,cursive";

  
  const theme = createTheme({
    typography: {
        fontFamily: defaultFontFamily,
      },
    palette: {
      primary: {
        main: "#004e92",
      },
      secondary: {
        main: "#00bcd4",
      },
      text: {
        primary: "#ffffff",
      },
      background: {
        default: "#000428",
      },
    },
  });
  
  export default theme;
  


