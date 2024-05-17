import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom"; // Importer le composant Link pour créer un lien vers eventModifyApp.jsx
import Sidebar from "../../components/Sidebar";

function EventModify() {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.canceled // Filtrer les événements annulés
  );

  return (
    <Fragment>
      <Sidebar />
      <div className="mx-auto py-6">
        <div className="container mx-auto">
          <input
            type="text"
            placeholder="Rechercher un événement par nom..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md py-2 px-4 mb-4"
            style={{ marginLeft: "70px" }}
          />
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
                  <td className="px-6 py-4 whitespace-nowrap">{event.name}</td>
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
                    <Link
                      to={`/events/edit/${event.id}`} // Utiliser le composant Link avec le chemin approprié vers eventModifyApp.jsx
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Modifier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default EventModify;
