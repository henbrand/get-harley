import MockDate from "mockdate";
import { DateTime } from "luxon";
import { getTimeslots, getInitialSlot } from "../services";
import { fullDayTimeslots, partialDayTimeslots } from "../mocks";

describe("[Services] getTimeslots", () => {
  it("returns the correct timeslots when the selected date is today", () => {
    MockDate.set("2021-02-15T13:20:00.000Z");
    const today = DateTime.now();
    expect(getTimeslots(today)).toStrictEqual(partialDayTimeslots);
    MockDate.reset();
  });
  it("returns the correct timeslots when the selected date is not today", () => {
    MockDate.set("2021-2-14");
    const today = DateTime.now();
    expect(getTimeslots(today.plus({ day: 1 }))).toStrictEqual(
      fullDayTimeslots
    );
    MockDate.reset();
  });
});

describe("[Services] getInitialSlot", () => {
  it("returns the correct initial slot when the date is today and the current hour is greater than the opening hour ", () => {
    MockDate.set("2021-02-15T13:20:00.000Z");
    const today = DateTime.now();
    expect(getInitialSlot(today)).toEqual(14);
    MockDate.reset();
  });
  it("returns the correct initial slot when the date is today and the current hour is less than the opening hour ", () => {
    MockDate.set("2021-02-15T07:20:00.000Z");
    const today = DateTime.now();
    expect(getInitialSlot(today)).toEqual(9);
    MockDate.reset();
  });
  it("returns the correct initial slot when the date is not today and the current time is less than the openeing time ", () => {
    MockDate.set("2021-02-15T13:20:00.000Z");
    const today = DateTime.now();
    expect(getInitialSlot(today.plus({ day: 1 }))).toEqual(9);
    MockDate.reset();
  });
});
