import React, { useState, useEffect, Fragment } from "react";
import Sidebar from "../../components/Sidebar";

function EventAdd() {
  const [formData, setFormData] = useState({
    name: "",
    type_id: "",
    start_date: "",
    end_date: "",
    image: "",
    places_total: 0,
    places_reserved: 0,
    adult_only: true,
    canceled: false,
    canceled_message: null,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      console.log("Requête à envoyer :", formData); // Imprimez la requête dans la console

      const response = await fetch("http://127.0.0.1:8000/api/events", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'événement");
      }
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Sidebar />
      <div className="flex justify-center">
        <div
          className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
          style={{ marginTop: "30px" }}
        >
          <h2 className="text-center text-2xl mb-6 font-semibold">
            Ajouter un événement
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nom de l'événement :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="type_id"
                className="block text-sm font-medium text-gray-700"
              >
                Type d'événement :
              </label>
              <select
                id="type_id"
                name="type_id"
                value={formData.typeId}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Sélectionner un type</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="start_date"
                className="block text-sm font-medium text-gray-700"
              >
                Date de début :
              </label>
              <input
                type="datetime-local"
                id="start_date"
                name="start_date"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="end_date"
                className="block text-sm font-medium text-gray-700"
              >
                Date de fin :
              </label>
              <input
                type="datetime-local"
                id="end_date"
                name="end_date"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image :
              </label>
              {/* Input pour importer une image par URL */}
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image} // Utiliser imageUrl au lieu de image
                onChange={handleChange}
                placeholder="URL de l'image"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="places_total"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de places total :
              </label>
              <input
                type="number"
                id="places_total"
                name="places_total"
                value={formData.placesTotal}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="adult_only" className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="adult_only"
                  name="adult_only"
                  checked={formData.adultOnly}
                  onChange={handleChange}
                  className="rounded text-blue-500 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Réservé aux adultes
                </span>
              </label>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description :
              </label>
              <input
                type="textarea"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Ajouter l'événement
            </button>
            {loading && (
              <p className="mt-2 text-sm text-gray-600">Envoi des données...</p>
            )}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {success && (
              <p className="mt-2 text-sm text-green-600">
                L'événement a été ajouté avec succès !
              </p>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default EventAdd;
