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

export const getTimeslots = (selectedDate: DateTime) => {
  let startTime: DateTime = selectedDate
    .set({ hour: timeSettings.openTime })
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
