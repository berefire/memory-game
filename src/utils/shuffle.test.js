import { describe, it, expect, vi, afterEach } from "vitest";
import { shuffle } from "./shuffle";

describe("shuffle", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not mutate the original array", () => {
    const original = [1, 2, 3, 4];
    shuffle(original);
    expect(original).toEqual([1, 2, 3, 4]);
  });

  it("returns an array with the same elements, just reordered", () => {
    const original = [1, 2, 3, 4, 5];
    const result = shuffle(original);
    expect(result).toHaveLength(original.length);
    expect([...result].sort((a, b) => a - b)).toEqual([...original].sort((a, b) => a - b));
  });

  it("returns an empty array when given an empty array", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("returns a single-element array unchanged", () => {
    expect(shuffle([42])).toEqual([42]);
  });

  it("follows the Fisher-Yates algorithm exactly when Math.random always returns the lowest value", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(shuffle([1, 2, 3, 4])).toEqual([2, 3, 4, 1]);
  });

  it("leaves the order unchanged when Math.random always picks the current index", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    expect(shuffle([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });
});