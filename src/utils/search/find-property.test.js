import { describe, it, expect, beforeEach, vi } from "vitest";
import findProperty from "./find-property"; // Adjust the path as necessary
import removeAccents from "./remove-accents";
import { getUniqueElements } from "../get-unique-elements";

// Mock the external dependencies using Vitest's vi.mock syntax
vi.mock("./remove-accents", () => ({
    default: vi.fn((str) => str),
}));

vi.mock("../get-unique-elements", () => ({
    getUniqueElements: vi.fn((arr) => [...new Set(arr)]),
}));

describe("findProperty", () => {
    let mockPlace;

    beforeEach(() => {
        vi.clearAllMocks();

        // Example for real-life data
        mockPlace = {
            id: "434",
            address: "Budapest, Expo tér 2., 1101",
            company: {
                name: "MMG Hotels Kft.",
                link: "",
            },
            name: "Exploré",
            city: "Budapest",
            type: "étterem",
            link: "",
            mainOligarch: [
                {
                    name: "Awad Zuhair Fathi",
                    link: "",
                    id: "5571",
                },
                {
                    name: "Hamdan Sameer Mahmoud",
                    link: "",
                    id: "6529",
                },
            ],
            mainCEO: [
                {
                    name: "Awad Zuhair Fathi",
                    link: "",
                    id: "5571",
                },
                {
                    name: "Hamdan Sameer Mahmoud",
                    link: "",
                    id: "6529",
                },
            ],
            oligarchs: [
                {
                    name: "Awad Zuhair Fathi",
                    link: "",
                    id: "5571",
                },
                {
                    name: "Hamdan Sameer Mahmoud",
                    link: "",
                    id: "6529",
                },
            ],
            ceos: [
                {
                    name: "Awad Zuhair Fathi",
                    link: "",
                    id: "5571",
                },
                {
                    name: "Hamdan Sameer Mahmoud",
                    link: "",
                    id: "6529",
                },
            ],
            date: "2026-04-17",
            details: "",
            en: {
                name: null,
                link: null,
                details: null,
                type: "restaurant",
            },
            de: {
                name: null,
                link: null,
                details: null,
                type: "Restaurant",
            },
            picture: "https://www.diningcity.hu/media/restaurantwidepictures/49943_explore_restaurant_sky_bar.jpg",
        };
    });

    it("should return true if the phrase matches the place name (lowercase)", () => {
        const result = findProperty(mockPlace, "exploré");
        expect(result).toBe(true);
    });

    it("should return true if the phrase matches the address", () => {
        const result = findProperty(mockPlace, "expo");
        expect(result).toBe(true);
    });

    it("should return true if the phrase matches a CEO's name", () => {
        const result = findProperty(mockPlace, "Awad");
        expect(result).toBe(true);
    });

    it("should return true if the phrase matches an oligarch's name", () => {
        const result = findProperty(mockPlace, "Mahmoud");
        expect(result).toBe(true);
    });

    it("should return false if the phrase does not match any fields", () => {
        const result = findProperty(mockPlace, "nope");
        expect(result).toBe(false);
    });

    it("should call removeAccents if standard lowercase matching fails", () => {
        // Force the mocked default export to return a specific value
        vi.mocked(removeAccents).mockReturnValueOnce("matching-accent-fallback");

        const result = findProperty(mockPlace, "matching-accent-fallback");

        expect(removeAccents).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    it("should handle missing optional properties gracefully without throwing errors", () => {
        const barebonesPlace = {
            ceos: [],
            oligarchs: [],
        };

        const result = findProperty(barebonesPlace, "anything");
        expect(result).toBe(false);
    });

    it("should correctly filter duplicates using getUniqueElements", () => {
        mockPlace.ceos = [{ name: "Duplicate" }];
        mockPlace.oligarchs = [{ name: "Duplicate" }];

        findProperty(mockPlace, "duplicate");

        expect(getUniqueElements).toHaveBeenCalledWith(["Duplicate", "Duplicate"]);
    });
});
