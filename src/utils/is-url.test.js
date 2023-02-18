import { describe, it, expect } from "vitest";
import isUrl from "./is-url";

describe("A function for validating website addresses", () => {
    it("returns true with an HTTP address", () => {
        expect(isUrl("http://www.example.com")).toBeTruthy();
    });

    it("returns true with an HTTPS address", () => {
        expect(isUrl("https://www.example.com")).toBeTruthy();
    });

    it("returns false with a www address", () => {
        expect(isUrl("www.example.com")).toBeFalsy();
    });

    it("returns false with an FTP address", () => {
        expect(isUrl("ftp://example.com")).toBeFalsy();
    });

    it("returns false with a mailto address", () => {
        expect(isUrl("mailto:john.doe@example.com")).toBeFalsy();
    });

    it("returns false with a relative url", () => {
        expect(isUrl("/some-path")).toBeFalsy();
    });
});
