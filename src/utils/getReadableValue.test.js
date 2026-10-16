import { describe, it, expect } from "vitest";
import { getReadableValue } from "./getReadableValue";

describe("getReadableValue", () => {
  it("returns the value unchanged for the numbers theme", () => {
    expect(getReadableValue(5, "numbers")).toBe(5);
  });

  it("strips the icon- prefix and capitalizes a single-word icon name", () => {
    expect(getReadableValue("icon-sun", "icons")).toBe("Sun");
  });

  it("capitalizes every word in a multi-word icon name", () => {
    expect(getReadableValue("icon-hand-spock", "icons")).toBe("Hand Spock");
  });

  it("capitalizes every word regardless of how many hyphens are used", () => {
    expect(getReadableValue("icon-flask-sharp", "icons")).toBe("Flask Sharp");
  });

  it("treats underscores the same as hyphens", () => {
    expect(getReadableValue("icon-feather_alt", "icons")).toBe("Feather Alt");
  });
});
