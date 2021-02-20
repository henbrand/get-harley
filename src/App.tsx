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
    palette: {
      primary: {
        main: Colors.primary,
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
