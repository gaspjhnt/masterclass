import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../App";

describe("App", () => {
  test("renders home page when '/' is navigated to", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText("Welcome to the Home Page")).toBeInTheDocument();
  });

  test("navigates to login page when 'Login' link is clicked", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Cliquez sur le lien "Login"
    userEvent.click(screen.getByText("Login"));

    // la page de connexion est rendue
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("navigates to sign in page when 'Sign In' link is clicked", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Cliquez sur le lien "Sign In"
    userEvent.click(screen.getByText("Sign In"));

    // Assurez-vous que la page d'inscription est rendue
    expect(screen.getByText("Sign In Page")).toBeInTheDocument();
  });

  test("navigates to calendar page when 'Calendar' link is clicked", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Cliquez sur le lien "Calendar"
    userEvent.click(screen.getByText("Calendar"));

    // Assurez-vous que la page de calendrier est rendue
    expect(screen.getByText("Calendar Page")).toBeInTheDocument();
  });
});
