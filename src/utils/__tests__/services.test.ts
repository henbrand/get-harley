import MockDate from "mockdate";
import { DateTime } from "luxon";
import { getTimeslots } from "../services";
import { timeslots } from "../mocks";

describe("[Services] getTimeslots", () => {
  it("returns the correct timeslots when the selected date is today", () => {
    MockDate.set("2021-2-15");
    const today = DateTime.now();
    expect(getTimeslots(today)).toStrictEqual(timeslots);
    MockDate.reset();
  });
});
