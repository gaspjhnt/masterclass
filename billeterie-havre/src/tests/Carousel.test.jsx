import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import Carousel from "../components/Carousel";

describe("Carousel component", () => {
  test("renders correctly with provided slides", () => {
    const { getAllByText } = render(<Carousel />);
    // Utiliser getAllByText au lieu de getTextBy() va me rendre une erreur avec le mot "Slimane" car ce mot est beaucoup répété
    const slimaneTitles = getAllByText("Slimane");
    const slimaneDescription =
      slimaneTitles[0].parentElement.parentElement.getElementsByTagName("p")[0]
        .textContent;
    const tenaciousTitles = getAllByText("TENACIOUS D");
    const tenaciousDescription =
      tenaciousTitles[0].parentElement.parentElement.getElementsByTagName(
        "p"
      )[0].textContent;
    const bellatorTitles = getAllByText("BELLATOR CHAMPIONS SERIES");
    const bellatorDescription =
      bellatorTitles[0].parentElement.parentElement.getElementsByTagName("p")[0]
        .textContent;

    expect(slimaneTitles.length).toBeGreaterThan(0);
    expect(slimaneDescription).toContain(
      "Slimane donne le coup d’envoi de sa tournée solo !"
    );
    expect(tenaciousTitles.length).toBeGreaterThan(0);
    expect(tenaciousDescription).toContain(
      "Jack Black et Kyle Gass, le duo tonitruant qui se cache derrière Tenacious D"
    );
    expect(bellatorTitles.length).toBeGreaterThan(0);
    expect(bellatorDescription).toContain(
      "BELLATOR CHAMPIONS SERIES ACCOR ARENA Limité à 4 places par commande."
    );
  });
});
