import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function EventModifyApp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: "",
    type: "",
    start_date: "",
    end_date: "",
    image: "",
    places_total: 0,
    places_reserved: 0,
    adultOnly: true,
    canceled: false,
    canceled_message: null,
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);
  const [canceledReason, setCanceledReason] = useState("");
  const [showCancelTextArea, setShowCancelTextArea] = useState(false);

  useEffect(() => {
    fetchEvent();
    fetchTypes();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/events/${id}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'événement");
      }
      const eventData = await response.json();
      setEvent({
        name: eventData.events.name,
        type: eventData.events.typeId.toString(),
        start_date: eventData.events.startDate,
        end_date: eventData.events.endDate,
        image: eventData.events.image,
        places_total: eventData.events.placesTotal,
        places_reserved: eventData.events.placesReserved,
        adult_only: eventData.events.adultOnly,
        canceled: eventData.events.canceled,
        canceled_message: eventData.events.canceledMessage,
        description: eventData.events.description,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/type");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des types");
      }
      const data = await response.json();
      setTypes(data.types);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleModify = async () => {
    try {
      /*       const sendData = {
        name: event.name,
        type: event.typeId.toString(),
        start_date: event.startDate,
        end_date: event.endDate,
        image: event.image,
        places_total: event.placesTotal,
        places_reserved: event.placesReserved,
        adult_only: event.adultOnly,
        canceled: event.canceled,
        canceled_message: event.canceledMessage,
        description: event.description,
      }; */
      console.log("Sending event data:", event);
      const response = await fetch(`http://127.0.0.1:8000/api/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(event);
      if (!response.ok) {
        throw new Error("Erreur lors de la modification de l'événement");
      }
      alert("Événement modifié avec succès !");
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  const handleCancel = async () => {
    if (!showCancelTextArea) {
      setShowCancelTextArea(true);
      return;
    }

    if (canceledReason.trim() === "") {
      alert("Veuillez fournir une raison d'annulation.");
      return;
    }

    try {
      const updatedEvent = {
        ...event,
        canceled: true,
        canceled_message: canceledReason,
      };
      const response = await fetch(`http://127.0.0.1:8000/api/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedEvent),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'annulation de l'événement");
      }
      alert("Événement annulé avec succès !");
      navigate("/admin"); // Redirect to a different page, e.g., home page
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold mb-8">Modifier l'événement</h1>
        <div className="bg-gray-100 p-4 rounded-md w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Nom de l'événement :</label>
            <input
              type="text"
              name="name"
              value={event.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type :</label>
            <select
              name="type"
              value={event.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date de début :</label>
            <input
              type="datetime-local"
              name="start_date"
              value={event.start_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date de fin :</label>
            <input
              type="datetime-local"
              name="end_date"
              value={event.end_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description :</label>
            <input
              type="text"
              name="description"
              value={event.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Nombre de places total :
            </label>
            <input
              type="number"
              name="places_total"
              value={event.places_total}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Places réservées :</label>
            <input
              type="number"
              name="places_reserved"
              value={event.places_reserved}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Réservé aux adultes :</label>
            <input
              type="checkbox"
              name="adult_only"
              checked={event.adult_only}
              onChange={(e) =>
                handleChange({
                  target: { name: "adult_only", value: e.target.checked },
                })
              }
              className="ml-2"
            />
          </div>
          {showCancelTextArea && (
            <div className="mb-4">
              <label className="block text-gray-700">
                Raison de l'annulation :
              </label>
              <textarea
                value={event.canceled_reason}
                onChange={(e) => setCanceledReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          <div className="flex justify-between">
            <button
              onClick={handleModify}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Modifier
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventModifyApp;
