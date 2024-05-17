import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import Header from "../components/Header";

test("renders header with logo and buttons", () => {
  const { getByText, getByAltText } = render(<Header />);

  const logo = getByAltText("Logo");
  expect(logo).toBeInTheDocument();

  const title = getByText("LE HAVRE");
  expect(title).toBeInTheDocument();

  const loginButton = getByText("Se connecter");
  expect(loginButton).toBeInTheDocument();

  const signinButton = getByText("S'inscrire");
  expect(signinButton).toBeInTheDocument();
});
