import { describe, it, expect } from "vitest";
import isEmail from "./is-email";

describe("A function to validate an email address", () => {
  it("returns false if a non-email address is passed", () => {
    expect(isEmail("not an email")).toBeFalsy();
  });

  it("returns true if an email address is passed", () => {
    expect(isEmail("john.doe@example.com")).toBeTruthy();
  });
});
