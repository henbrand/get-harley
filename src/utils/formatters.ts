import { DateTime } from "luxon";

export const timeFormatter = (date: DateTime) => {
  return date.toLocaleString({
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
