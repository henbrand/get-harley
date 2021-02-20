import { DateTime } from "luxon";

const formatTime = (date: DateTime) => {
  return date.toLocaleString({
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatTimeSlot = (
  startTime: DateTime,
  endTime: DateTime
): string => {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};
