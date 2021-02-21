import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

import { Home } from "./pages/Home";
import { Colors } from "./styles/colors";

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      h1: {
        fontSize: "20px",
      },
      h2: {
        fontSize: "16px",
      },
    },
    palette: {
      primary: {
        main: Colors.primary,
      },
      secondary: {
        main: Colors.secondary,
      },
    },
  })
);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <Home />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
