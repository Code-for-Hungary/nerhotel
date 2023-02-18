import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Icon from "./Icon";

describe("A component for rendering an icon", () => {
  it("renders an image to the screen", () => {
    render(<Icon src="foo.scv" alt="My Icon" />);
    expect(screen.getAllByAltText("My Icon")).toBeDefined();
  });
});
