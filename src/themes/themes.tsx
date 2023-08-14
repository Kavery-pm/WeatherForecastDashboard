import { createTheme } from "@mui/material/styles";
import { Theme } from '@mui/material/styles';
declare module '@mui/styles/defaultTheme' {
   
    interface DefaultTheme extends Theme {}
  }
  
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
  


