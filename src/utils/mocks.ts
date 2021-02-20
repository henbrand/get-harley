import { DateTime } from "luxon";
import { TimeSlot } from "./services";

type SlotBreakdown = {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
};

const fullDayBreakdown = [
  { startHour: 9, startMinute: 0, endHour: 9, endMinute: 30 },
  { startHour: 9, startMinute: 30, endHour: 10, endMinute: 0 },
  { startHour: 10, startMinute: 0, endHour: 10, endMinute: 30 },
  { startHour: 10, startMinute: 30, endHour: 11, endMinute: 0 },
  { startHour: 11, startMinute: 0, endHour: 11, endMinute: 30 },
  { startHour: 11, startMinute: 30, endHour: 12, endMinute: 0 },
  { startHour: 12, startMinute: 0, endHour: 12, endMinute: 30 },
  { startHour: 12, startMinute: 30, endHour: 13, endMinute: 0 },
  { startHour: 13, startMinute: 0, endHour: 13, endMinute: 30 },
  { startHour: 13, startMinute: 30, endHour: 14, endMinute: 0 },
  { startHour: 14, startMinute: 0, endHour: 14, endMinute: 30 },
  { startHour: 14, startMinute: 30, endHour: 15, endMinute: 0 },
  { startHour: 15, startMinute: 0, endHour: 15, endMinute: 30 },
  { startHour: 15, startMinute: 30, endHour: 16, endMinute: 0 },
  { startHour: 16, startMinute: 0, endHour: 16, endMinute: 30 },
  { startHour: 16, startMinute: 30, endHour: 17, endMinute: 0 },
  { startHour: 17, startMinute: 0, endHour: 17, endMinute: 30 },
  { startHour: 17, startMinute: 30, endHour: 18, endMinute: 0 },
  { startHour: 18, startMinute: 0, endHour: 18, endMinute: 30 },
  { startHour: 18, startMinute: 30, endHour: 19, endMinute: 0 },
];

const partialDayBreakdown = [
  { startHour: 14, startMinute: 0, endHour: 14, endMinute: 30 },
  { startHour: 14, startMinute: 30, endHour: 15, endMinute: 0 },
  { startHour: 15, startMinute: 0, endHour: 15, endMinute: 30 },
  { startHour: 15, startMinute: 30, endHour: 16, endMinute: 0 },
  { startHour: 16, startMinute: 0, endHour: 16, endMinute: 30 },
  { startHour: 16, startMinute: 30, endHour: 17, endMinute: 0 },
  { startHour: 17, startMinute: 0, endHour: 17, endMinute: 30 },
  { startHour: 17, startMinute: 30, endHour: 18, endMinute: 0 },
  { startHour: 18, startMinute: 0, endHour: 18, endMinute: 30 },
  { startHour: 18, startMinute: 30, endHour: 19, endMinute: 0 },
];

const timeslots = (slots: SlotBreakdown[]): TimeSlot[] => {
  const day = 15;
  const year = 2021;
  const month = 2;

  return slots.map((slot) => {
    return {
      startTime: DateTime.local(
        year,
        month,
        day,
        slot.startHour,
        slot.startMinute
      ),
      endTime: DateTime.local(year, month, day, slot.endHour, slot.endMinute),
    };
  });
};

export const fullDayTimeslots = timeslots(fullDayBreakdown);
export const partialDayTimeslots = timeslots(partialDayBreakdown);
