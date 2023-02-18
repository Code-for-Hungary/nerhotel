import { describe, it, expect } from "vitest";
import getTranslatedHotelProperty from "./get-translated-hotel-property";

describe("A function to get a the equivalent field from an object based on a language value", () => {
  it("throws an exception when we try to get a non-existing property", () => {
    const data = {
      id: "1212323",
      name: "Test Person",
    };

    expect(() => {
      getTranslatedHotelProperty("categories", "en", data);
    }).toThrow(Error);
  });

  it("returns the key from the top level if no language key is found", () => {
    const data = {
      name: "Hakapeszi Maki",
    };

    expect(getTranslatedHotelProperty("name", "en", data)).toEqual(
      "Hakapeszi Maki"
    );
  });

  it("returns the key from the top level if a language key is found however it doesn't contain the specified key", () => {
    const data = {
      name: "Hakapeszi Maki",
      en: {
        firstName: "Maki",
      },
    };

    expect(getTranslatedHotelProperty("name", "en", data)).toEqual(
      "Hakapeszi Maki"
    );
  });

  it("returns the equivalent key from the translation object when found", () => {
    const data = {
      name: "Hakapeszi Maki",
      de: {
        name: "Herr Maki Hakapeszi",
      },
    };

    expect(getTranslatedHotelProperty("name", "de", data)).toEqual(
      "Herr Maki Hakapeszi"
    );
  });
});
