import React, { useState, useEffect, Fragment } from "react";
import Sidebar from "../../components/Sidebar";

function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/type")
      .then((response) => response.json())
      .then((data) => {
        setTypes(data.types);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    // Fetch events from API
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/events");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des événements");
      }
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/events/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'événement");
      }
      // Remove the deleted event from the list
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Fragment>
      <Sidebar />
      <div className="mx-auto py-6">
        <div
          className="container mx-auto"
          style={{ marginLeft: "70px", width: "1450px", maxWidth: "1450px" }}
        >
          <input
            type="text"
            placeholder="Rechercher un événement par nom..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md py-2 px-4 mb-4"
          />
          <div className="overflow-x-auto">
            <table className="table-auto min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de début
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de fin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Places totales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Places réservées
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adultes seulement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Annulé
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{event.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {types.find((type) => type.id === event.typeId)?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.placesTotal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.placesReserved}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.adult_only ? "Oui" : "Non"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.canceled ? "Oui" : "Non"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EventList;
