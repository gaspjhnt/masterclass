import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PopUpEvent from "../components/PopUpEvent";

const event = {
  name: "Test Event",
  startDate: new Date("2024-05-20"),
  endDate: new Date("2024-05-22"),
  image: "https://example.com/image.jpg",
  description: "Description of the test event",
};

test("renders event details correctly", () => {
  const { getByText, getByAltText } = render(
    <PopUpEvent event={event} onClose={() => {}} />
  );

  expect(getByText(event.name)).toBeInTheDocument();
  expect(getByAltText(event.name)).toBeInTheDocument();
  expect(getByText(event.description)).toBeInTheDocument();
});

test("calls onClose callback when close button is clicked", () => {
  const handleClose = jest.fn();

  const { getByText } = render(
    <PopUpEvent event={event} onClose={handleClose} />
  );

  fireEvent.click(getByText("Fermer"));

  expect(handleClose).toHaveBeenCalledTimes(1);
});
