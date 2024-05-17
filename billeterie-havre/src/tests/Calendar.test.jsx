import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calendar from "../components/Calendar";
import axios from "axios";

jest.mock("axios");

const eventsData = [
  {
    id: 1,
    name: "Event 1",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    image: "image1.jpg",
  },
  {
    id: 2,
    name: "Event 2",
    startDate: "2024-05-05",
    endDate: "2024-05-07",
    image: "image2.jpg",
  },
];

test("renders calendar with events", async () => {
  axios.get.mockResolvedValueOnce({ data: { events: eventsData } });

  render(<Calendar />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  // Wait for events to be fetched and rendered
  const event1Element = await screen.findByText("Event 1");
  const event2Element = screen.getByText("Event 2");

  // Assert that events are rendered on the calendar
  expect(event1Element).toBeInTheDocument();
  expect(event2Element).toBeInTheDocument();

  // Assert that loading indicator is not present after events are fetched
  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});
