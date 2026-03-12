import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { isOnePercentDonationSeason } from "./utils";

describe("Utilities related to the one percent donation campaign", () => {
    describe("isOnePercentDonationSeason", () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it("returns true when the date is inside the interval", () => {
            vi.setSystemTime(new Date("2026-03-10"));
            expect(isOnePercentDonationSeason()).toBe(true);
        });

        it("returns false before the interval", () => {
            vi.setSystemTime(new Date("2026-02-01"));
            expect(isOnePercentDonationSeason()).toBe(false);
        });

        it("returns true on the start date (inclusive)", () => {
            vi.setSystemTime(new Date("2026-02-14"));
            expect(isOnePercentDonationSeason()).toBe(true);
        });

        it("returns true on the end date (inclusive)", () => {
            vi.setSystemTime(new Date("2026-05-20"));
            expect(isOnePercentDonationSeason()).toBe(true);
        });

        it("returns false after the interval", () => {
            vi.setSystemTime(new Date("2026-05-21"));
            expect(isOnePercentDonationSeason()).toBe(false);
        });
    });
});
