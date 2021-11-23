import addMinutesToDate from "./addMinutesToDate";

test("addMinutesToDate returns a date, with a number of minutes onto a given date", () => {
  expect(
    addMinutesToDate(new Date(2018, 11, 24, 10, 30, 0, 0), 60).getTime()
  ).toBe(new Date(2018, 11, 24, 11, 30, 0, 0).getTime());
  expect(
    addMinutesToDate(new Date(2018, 11, 24, 10, 30, 0, 0), 0).getTime()
  ).toBe(new Date(2018, 11, 24, 10, 30, 0, 0).getTime());
  expect(
    addMinutesToDate(new Date(2018, 11, 24, 10, 30, 0, 0), 120).getTime()
  ).toBe(new Date(2018, 11, 24, 12, 30, 0, 0).getTime());
});
