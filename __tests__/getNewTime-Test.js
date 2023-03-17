import getNewTime from "../components/scripts/getNewTime";

describe("getNewTime", () => {
  it("should return the correct time", () => {
    const time = "2020-08-21T15:07:00";
    const expected = "3:07 PM";
    const actual = getNewTime(time);
    expect(actual).toBe(expected);
    const time2 = "2020-08-21T09:45:00";
    const expected2 = "9:45 AM";
    const actual2 = getNewTime(time2);
    expect(actual2).toBe(expected2);
  });
});