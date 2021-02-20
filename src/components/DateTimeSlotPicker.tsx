import { FunctionComponent, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { DateTime } from "luxon";

export const DateTimeSlotPicker: FunctionComponent = () => {
  const dt = DateTime;
  const [selectedDate, setSelectedDate] = useState(dt.now());
  const handleDateChange = (date: DateTime | null) => {
    date && setSelectedDate(date);
  };
  return (
    <div>
      <h1>Select a time slot:</h1>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Pick a date"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </div>
  );
};
