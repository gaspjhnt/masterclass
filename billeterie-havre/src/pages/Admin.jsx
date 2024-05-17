import React, { Fragment, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Admin() {
  // État local pour stocker les événements récupérés de l'API
  const [events, setEvents] = useState([]);

  // Utiliser useEffect pour charger les événements depuis l'API lors du montage du composant
  useEffect(() => {
    // Fonction pour récupérer les événements depuis l'API
    const fetchEvents = async () => {
      try {
        // Récupérer les événements depuis l'API
        const response = await fetch("http://127.0.0.1:8000/api/events");
        if (response.ok) {
          let eventData = await response.json();

          // Mettre à jour l'état local avec les événements récupérés
          setEvents(eventData.events); // Mettre à jour uniquement les données des événements, pas le conteneur
        } else {
          // Gérer les erreurs
          console.error("Failed to fetch events:", response.status);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    // Appeler la fonction pour récupérer les événements depuis l'API
    fetchEvents();
  }, []); // Le tableau vide en second argument assure que useEffect est exécuté une seule fois lors du montage

  return (
    <Fragment>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl font-bold mb-8">Administration</h1>
          <div
            className="grid grid-cols-3 gap-8"
            style={{ marginLeft: "70px", width: "1400px" }}
          >
            {/* Vérifier si events est un tableau avant d'appeler map */}
            {Array.isArray(events) &&
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white shadow-lg rounded-md overflow-hidden"
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-64"
                    style={{ marginBottom: "1rem" }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
                    <p
                      className="text-left text-xs font-medium"
                      style={{ marginBottom: "7px" }}
                    >
                      <p className="text-left text-xs font-medium uppercase">
                        Date de début:{" "}
                      </p>
                      {new Date(event.startDate).toLocaleDateString()}
                    </p>
                    <p
                      className="text-left text-xs font-medium"
                      style={{ marginBottom: "7px" }}
                    >
                      <p className="text-left text-xs font-medium uppercase">
                        Date de fin:{" "}
                      </p>
                      {new Date(event.endDate).toLocaleDateString()}
                    </p>
                    <p
                      className="text-left text-xs font-medium"
                      style={{ marginBottom: "7px" }}
                    >
                      <p className="text-left text-xs font-medium uppercase">
                        Places totales:
                      </p>{" "}
                      {event.placesTotal}
                    </p>
                    <p
                      className="text-left text-xs font-medium"
                      style={{ marginBottom: "7px" }}
                    >
                      <p className="text-left text-xs font-medium uppercase">
                        Places réservées:
                      </p>{" "}
                      {event.placesReserved}
                    </p>
                    <p
                      className="text-left text-xs font-medium"
                      style={{ marginBottom: "7px" }}
                    >
                      <p className="text-left text-xs font-medium uppercase">
                        Adultes seulement:
                      </p>{" "}
                      {event.adultOnly ? "Oui" : "Non"}
                    </p>
                    <p
                      className="text-left text-xs font-medium"
                      style={{ marginBottom: "7px" }}
                    >
                      <p
                        className="text-left text-xs font-medium uppercase"
                        style={{ marginBottom: "5px" }}
                      >
                        Description:
                      </p>{" "}
                      {event.description}
                    </p>
                    <p
                      className="text-left text-xs font-medium"
                      style={{ marginBottom: "7px" }}
                    >
                      <p className="text-left text-xs font-medium uppercase">
                        Annulé:
                      </p>{" "}
                      {event.canceled ? "Oui" : "Non"}
                    </p>
                    {event.canceled && (
                      <p className="text-left text-xs font-medium">
                        <p className="text-left text-xs font-medium uppercase">
                          Message d'annulation:
                        </p>{" "}
                        {event.canceledMessage}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Admin;
