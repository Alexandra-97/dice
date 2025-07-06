"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    text: { primary: "#000000DE" },
    primary: { main: "#9C27B0" },
    background: { default: "#0000000A" },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  cssVariables: true,
});

export default theme;
