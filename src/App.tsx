import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

import { Home } from "./pages/Home";

function App() {
  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <Home />
    </MuiPickersUtilsProvider>
  );
}

export default App;
