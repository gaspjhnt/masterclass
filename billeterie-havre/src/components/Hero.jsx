import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";
import Typography from "./Typography";
import Button from "./Button";
import Logo from "../assets/logos/Logo.png";
import Carousel from "./Carousel";
import { Link } from "react-router-dom"; // Import du composant Link
import PopUpEvent from "./PopUpEvent";
import Calendar from "./Calendar";

const MyComponent = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleReserveClick = (event) => {
    setSelectedEvent(event);
    setShowPopup(true);
  };

  const getMonthName = (date) => {
    const monthNames = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    return monthNames[date.getMonth()];
  };

  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = "http://127.0.0.1:8000/api/events";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setEvents(response.data.events);
        console.log(response.data.events);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>
        <img src={Logo} className=" animate-spin" /> Une erreur s'est produite :{" "}
        {error.message}
      </div>
    );
  }

  return (
    <div className="w-full mb-32">
      {/* Votre code de mise en page existant */}
      <Container>
        <div className="flex flex-row justify-between mt-10 mb-3">
          <Typography display="primary" className=" font-semibold" variant="h1">
            Billeterie
          </Typography>

          <Typography display="primary" className="font-semibold" variant="h1">
            <a href="/calendar">Calendrier</a>
          </Typography>
        </div>
        <hr />
        <div className="mt-5 mb-10 w-full py-2 px-2 bg-sky-500">
          <Typography variant="" display="white">
            {events.length} événements trouvés. Affinez vos résultats par :
          </Typography>
        </div>
        {events
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
          .map((event) => (
            <div key={event.id}>
              <div>
                <div className="flex flex-row">
                  <div className="mb-20 h-72 align-middle w-96 relative">
                    <img
                      src={event.image}
                      className="absolute mt-10 object-cover rounded-sm"
                    />
                  </div>
                  <div>
                    <div className="flex flex-col pl-3">
                      <Typography
                        display="primary"
                        className="font-bold uppercase mt-8 hover:cursor-pointer"
                        variant="h2"
                      >
                        {event.name}
                      </Typography>
                      <Typography className="mt-5 font-bold" variant="xl">
                        {event.startDate === event.endDate ? (
                          <>
                            Le {new Date(event.startDate).getDate()}{" "}
                            {getMonthName(new Date(event.startDate))}{" "}
                            {new Date(event.startDate).getFullYear()}
                          </>
                        ) : (
                          <>
                            Du {new Date(event.startDate).getDate()}{" "}
                            {getMonthName(new Date(event.startDate))}{" "}
                            {new Date(event.startDate).getFullYear()} au{" "}
                            {new Date(event.endDate).getDate()}{" "}
                            {getMonthName(new Date(event.endDate))}{" "}
                            {new Date(event.endDate).getFullYear()}
                          </>
                        )}
                      </Typography>
                      <Typography className="mb-32 mt-5" variant="sm">
                        {event.description.length > 400
                          ? `${event.description.substring(0, 400)}...`
                          : event.description}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="w-full -mt-20 flex flex-row justify-end">
                    <Typography
                      variant="sm"
                      className="flex flex-row border-white border-2 bg-stone-300 py-4 px-24"
                      display="gray"
                    >
                      eTicket
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -3 24 24"
                        fill="currentColor"
                        height="20"
                      >
                        <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
                      </svg>
                    </Typography>
                    <Typography
                      variant="sm"
                      className="border-white border-2 bg-stone-300 py-4 px-24"
                      display="gray"
                    >
                      Revente
                    </Typography>
                    <Typography
                      variant="sm"
                      className="bg-stone-300 flex flex-row border-white border-2 py-4 px-20"
                      display="gray"
                    >
                      Choix sur plan
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -3 24 24"
                        fill="currentColor"
                        height="20"
                      >
                        <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
                      </svg>
                    </Typography>
                    <button onClick={() => handleReserveClick(event)}>
                      <Typography
                        variant="sm"
                        className="bg-sky-900 italic uppercase border-white border-2 flex w-full font-bold mr-2  py-4 px-16 hover:cursor-pointer hover:opacity-70 "
                        display="white"
                      >
                        Réserver
                      </Typography>
                    </button>
                  </div>
                </div>
              </div>
              <hr className="my-8" />
            </div>
          ))}
      </Container>
      {showPopup && (
        <PopUpEvent event={selectedEvent} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default MyComponent;
