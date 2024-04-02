import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const customTheme = createTheme({
  direction: "rtl", // Set initial direction (will be changed dynamically)
  //theme customizations
  typography: {
    fontFamily: ["__Heebo_440952", "__Heebo_Fallback_440952"].join(","),
  },
  palette: {
    primary: {
      main: colors.black,
    },
  },
  components: {
    MuiButton: {},
    MuiTextField: {},
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});

export const theme = {
  ...customTheme,
  colors,
};
