import React from "react";
import { render } from "@testing-library/react";
import Button from "../components/Button";

describe("Button tests", () => {
  test("renders button without link", () => {
    const { getByText } = render(<Button>Hello</Button>);
    const buttonElement = getByText("Hello");
    expect(buttonElement.tagName).toBe("BUTTON");
  });
});
