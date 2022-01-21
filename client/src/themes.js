import { createTheme } from "@mui/material";

const darkTheme1 = createTheme({
  palette: {
    primary: {
      main: "#78909c",
    },
    secondary: {
      main: "#ffcc80",
    }
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

export default darkTheme;
