import { FunctionComponent, useMemo, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { DateTime } from "luxon";
import styled from "styled-components";

import { getTimeslots, isWeekendDay } from "../../utils/services";
import { formatTimeSlot } from "../../utils/formatters";
import { Button } from "../atoms/Button";

const TimeSlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 220px;
  width: 220px;
  overflow-x: scroll;
  align-items: center;
`;

interface Props {
  selectedDateTime: DateTime | undefined;
  setSelectedDateTime: (date: DateTime) => void;
}

export const TimeSlotTab: FunctionComponent<Props> = ({
  selectedDateTime,
  setSelectedDateTime,
}) => {
  const now = DateTime.now();
  const nextMonday = now.startOf("week").plus({ week: 1 });
  // We want this value to stay memoized until the week change, `now` changes too often
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultDay = useMemo(() => (isWeekendDay(now) ? nextMonday : now), [
    nextMonday,
  ]);

  const [selectedDate, setSelectedDate] = useState(defaultDay);
  const timeslots = useMemo(() => getTimeslots(selectedDate), [selectedDate]);

  const handleDateChange = (date: DateTime | null) => {
    date && setSelectedDate(date);
  };

  return (
    <div>
      <KeyboardDatePicker
        disableToolbar
        autoOk
        color="secondary"
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
