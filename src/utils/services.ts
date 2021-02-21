import { DateTime } from "luxon";

const timeSettings = {
  slotInterval: 30, // 30 mins
  openTime: 9, // 9AM
  closeTime: 19, // 7PM
};

export type TimeSlot = {
  startTime: DateTime;
  endTime: DateTime;
};

export const getInitialSlot = (selectedDate: DateTime) => {
  if (
    selectedDate.hasSame(DateTime.local(), "day") &&
    selectedDate.hour > timeSettings.openTime
  ) {
    return selectedDate.hour + 1;
  }

  return timeSettings.openTime;
};

export const getTimeslots = (selectedDate: DateTime) => {
  const initialSlot = getInitialSlot(selectedDate);

  let startTime: DateTime = selectedDate
    .set({ hour: initialSlot })
    .startOf("hour");
  let endTime: DateTime = selectedDate.set({ hour: timeSettings.closeTime });
  let timeslots: TimeSlot[] = [];

  while (startTime.hour < endTime.hour) {
    const startTimePlusInterval = startTime.plus({
      minutes: timeSettings.slotInterval,
    });
    const slot = {
      startTime: startTime,
      endTime: startTimePlusInterval,
    };

    timeslots.push(slot);

    startTime = startTimePlusInterval;
  }

  return timeslots;
};

export const isWeekendDay = (date: DateTime | null) => {
  return date?.weekday === 6 || date?.weekday === 7;
};
