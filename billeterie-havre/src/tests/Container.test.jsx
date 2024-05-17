import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import Container from "../components/Container";

describe("Container component", () => {
  test("renders children correctly", () => {
    const { getByText } = render(
      <Container>
        <div>Hello, World!</div>
      </Container>
    );

    const childElement = getByText("Hello, World!");
    expect(childElement).toBeInTheDocument();
  });
});
