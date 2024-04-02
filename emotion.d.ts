import "@emotion/react";
import { Theme as MuiTheme } from "@mui/material/styles";
import colors from "theme/colors";

//Custom button variants
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    tab: true;
    tabSelected: true;
  }
}

//Breakpoint typescript errors fix
declare module "@emotion/react" {
  interface CustomBreakpoints {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }

  //Theme typescript
  export interface Theme extends MuiTheme {
    // extend the theme
    colors: typeof colors;
    breakpoints: MuiTheme["breakpoints"] & CustomBreakpoints;
  }
}
