import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EventAdd from "../pages/events/eventAdd"; // Assurez-vous que le chemin est correct
import { BrowserRouter as Router } from "react-router-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ types: [{ id: 1, name: "Type 1" }] }),
  })
);

describe("EventAdd", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should render the form and submit data", async () => {
    render(
      <Router>
        <EventAdd />
      </Router>
    );

    // Vérifier que les éléments de formulaire sont présents
    expect(screen.getByLabelText(/Nom de l'événement/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type d'événement/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de début/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de fin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Nombre de places total/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Réservé aux adultes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();

    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText(/Nom de l'événement/i), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByLabelText(/Type d'événement/i), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByLabelText(/Date de début/i), {
      target: { value: "2024-05-20T10:00" },
    });
    fireEvent.change(screen.getByLabelText(/Date de fin/i), {
      target: { value: "2024-05-21T10:00" },
    });
    fireEvent.change(screen.getByLabelText(/Image/i), {
      target: { value: "http://example.com/image.jpg" },
    });
    fireEvent.change(screen.getByLabelText(/Nombre de places total/i), {
      target: { value: 100 },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "This is a test event" },
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByText(/Ajouter l'événement/i));

    // Vérifier que les données sont envoyées correctement
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2); // Une pour les types et une pour l'ajout d'événement
      expect(fetch).toHaveBeenCalledWith(
        "http://127.0.0.1:8000/api/events",
        expect.any(Object)
      );

      const request = fetch.mock.calls[1][1];
      expect(request.method).toBe("POST");
      expect(request.headers["Content-Type"]).toBe("application/json");
      expect(JSON.parse(request.body)).toEqual({
        name: "Test Event",
        type_id: 1,
        start_date: "2024-05-20T10:00",
        end_date: "2024-05-21T10:00",
        image: "http://example.com/image.jpg",
        places_total: 100,
        places_reserved: 0,
        adult_only: true,
        canceled: false,
        canceled_message: null,
        description: "This is a test event",
      });
    });

    // Vérifier le message de succès
    await waitFor(() => {
      expect(
        screen.getByText(/L'événement a été ajouté avec succès/i)
      ).toBeInTheDocument();
    });
  });

  it("should display an error message when the submission fails", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(
      <Router>
        <EventAdd />
      </Router>
    );

    // Remplir le formulaire de la même manière que dans le test précédent
    fireEvent.change(screen.getByLabelText(/Nom de l'événement/i), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByLabelText(/Type d'événement/i), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByLabelText(/Date de début/i), {
      target: { value: "2024-05-20T10:00" },
    });
    fireEvent.change(screen.getByLabelText(/Date de fin/i), {
      target: { value: "2024-05-21T10:00" },
    });
    fireEvent.change(screen.getByLabelText(/Image/i), {
      target: { value: "http://example.com/image.jpg" },
    });
    fireEvent.change(screen.getByLabelText(/Nombre de places total/i), {
      target: { value: 100 },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "This is a test event" },
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByText(/Ajouter l'événement/i));

    // Vérifier le message d'erreur
    await waitFor(() => {
      expect(
        screen.getByText(/Erreur lors de l'ajout de l'événement/i)
      ).toBeInTheDocument();
    });
  });
});
