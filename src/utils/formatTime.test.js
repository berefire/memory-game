import { describe, it, expect } from "vitest";
import { formatTime } from "./formatTime";

describe("formatTime", () => {
  it("formats zero seconds as 0:00", () => {
    expect(formatTime(0)).toBe("0:00");
  });

  it("pads seconds under 10 with a leading zero", () => {
    expect(formatTime(65)).toBe("1:05");
  });

  it("does not add extra padding when seconds are already two digits", () => {
    expect(formatTime(150)).toBe("2:30");
  });

  it("rolls over correctly at a full minute", () => {
    expect(formatTime(59)).toBe("0:59");
    expect(formatTime(60)).toBe("1:00");
  });

  it("keeps counting minutes past 59 rather than converting to hours", () => {
    expect(formatTime(3661)).toBe("61:01");
  });
});