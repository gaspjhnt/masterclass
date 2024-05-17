import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Admin from "../pages/Admin";
import { rest } from "msw";
import { setupServer } from "msw/node";

// Configuration du serveur de test avec MSW pour intercepter les requêtes API
const server = setupServer(
  rest.get("http://127.0.0.1:8000/api/events", (req, res, ctx) => {
    return res(
      ctx.json({
        events: [
          {
            id: 1,
            name: "Event 1",
            startDate: "2024-05-01T10:00:00Z",
            endDate: "2024-05-02T10:00:00Z",
            image: "https://example.com/image1.jpg",
            placesTotal: 100,
            placesReserved: 50,
            adultOnly: true,
            canceled: false,
            canceledMessage: null,
            description: "Description de l'événement 1",
          },
          {
            id: 2,
            name: "Event 2",
            startDate: "2024-06-01T10:00:00Z",
            endDate: "2024-06-02T10:00:00Z",
            image: "https://example.com/image2.jpg",
            placesTotal: 200,
            placesReserved: 150,
            adultOnly: false,
            canceled: true,
            canceledMessage: "Événement annulé pour des raisons de sécurité.",
            description: "Description de l'événement 2",
          },
        ],
      })
    );
  })
);

// Activer le serveur avant chaque test et le désactiver après chaque test
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("affiche les événements récupérés de l'API", async () => {
  render(<Admin />);

  // Attendre que les événements soient chargés et affichés
  await waitFor(() => {
    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Event 2")).toBeInTheDocument();
  });

  // Vérifier les détails de l'événement 1
  expect(screen.getByText("Description de l'événement 1")).toBeInTheDocument();
  expect(screen.getByText("Oui", { exact: false })).toBeInTheDocument();

  // Vérifier les détails de l'événement 2
  expect(screen.getByText("Description de l'événement 2")).toBeInTheDocument();
  expect(
    screen.getByText("Événement annulé pour des raisons de sécurité.")
  ).toBeInTheDocument();
  expect(screen.getByText("Non", { exact: false })).toBeInTheDocument();
});
