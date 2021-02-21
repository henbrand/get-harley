import { FunctionComponent, useMemo, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { DateTime } from "luxon";
import styled from "styled-components";

import { getTimeslots, isWeekendDay } from "../utils/services";
import { formatTimeSlot } from "../utils/formatters";
import { Button } from "./atoms/Button";
import { Colors } from "../styles/colors";

const TimeSlotContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 200px;
  width: 150px;
  overflow-x: scroll;
  border: 2px solid ${Colors.lightPink};
  justify-content: center;
`;

interface Props {
  selectedDateTime: DateTime | undefined;
  setSelectedDateTime: (date: DateTime) => void;
}

export const DateTimeSlotPicker: FunctionComponent<Props> = ({
  selectedDateTime,
  setSelectedDateTime,
}) => {
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
        autoOk
        disablePast
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
        shouldDisableDate={isWeekendDay}
      />
      {timeslots.length < 1 ? (
        <p> No available time slots, try another day!</p>
      ) : (
        <TimeSlotContainer>
          {timeslots.map((timeslot) => {
            const { startTime, endTime } = timeslot;
            const buttonText = formatTimeSlot(startTime, endTime);
            return (
              <Button
                key={buttonText}
                buttonText={buttonText}
                selected={selectedDateTime?.equals(startTime)}
                onClick={() => setSelectedDateTime(startTime)}
              />
            );
          })}
        </TimeSlotContainer>
      )}
    </div>
  );
};
