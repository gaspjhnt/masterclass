import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import Typography from "../components/Typography";

describe("Typography component", () => {
  test("renders correctly with title variant and white display", () => {
    const { getByText } = render(
      <Typography variant="title" display="white">
        Example Title
      </Typography>
    );
    const titleElement = getByText("Example Title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("text-5xl");
    expect(titleElement).toHaveClass("text-white");
  });

  test("renders correctly with h1 variant and primary display", () => {
    const { getByText } = render(
      <Typography variant="h1" display="primary">
        Example Heading
      </Typography>
    );
    const headingElement = getByText("Example Heading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass("text-4xl");
    expect(headingElement).toHaveClass("text-sky-900");
  });

  // Add more test cases for other variants and display options as needed
});
