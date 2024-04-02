"use client";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { theme } from "./theme";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";

import { prefixer } from "stylis";
import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";

const ltrTheme = createTheme({ ...theme, direction: "ltr" });
const rtlTheme = createTheme({ ...theme, direction: "rtl" });

const ThemeProviders = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => {
  const [isRtl, setIsRtl] = React.useState(locale === "he" ? true : false);

  React.useLayoutEffect(() => {
    document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
  }, [isRtl]);

  React.useLayoutEffect(() => {
    setIsRtl(locale === "he" ? true : false);
  }, [locale]);

  const [cache] = useState(() => {
    const cache = createCache({
      key: isRtl ? "muirtl" : "muiltr",
      stylisPlugins: isRtl ? [prefixer, rtlPlugin] : undefined,
    });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(" "),
        }}
      />
    );
  });

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>
        <MuiThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProviders;
