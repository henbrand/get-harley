import { FunctionComponent, useMemo, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { DateTime } from "luxon";
import { getTimeslots } from "../utils/services";
import { timeFormatter } from "../utils/formatters";

export const DateTimeSlotPicker: FunctionComponent = () => {
  const now = DateTime.now();
  const [selectedDate, setSelectedDate] = useState(now);

  const handleDateChange = (date: DateTime | null) => {
    date && setSelectedDate(date);
  };

  const timeslots = useMemo(() => getTimeslots(selectedDate), [selectedDate]);

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
      {timeslots.map((timeslot) => {
        const { startTime, endTime } = timeslot;
        return (
          <div key={`${startTime.hour} - ${endTime.hour}`}>
            <button>
              {timeFormatter(startTime)} - {timeFormatter(endTime)}
            </button>
          </div>
        );
      })}
    </div>
  );
};
