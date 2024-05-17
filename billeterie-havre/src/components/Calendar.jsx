import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Typography from "./Typography";

function Calendar() {
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

  function renderEventContent(eventInfo) {
    return (
      <div className="flex flex-col justify-center items-center content-center">
        <Typography
          className="text-center font-bold"
          display="primary"
          variant="h2"
        >
          {eventInfo.event.title}
        </Typography>
        <img
          className=""
          src={eventInfo.event.url}
          alt={eventInfo.event.title}
        />
      </div>
    );
  }

  return (
    <div className="maincontainer">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        eventContent={renderEventContent}
        events={events.map((event) => {
          return {
            title: event.name,
            start: event.startDate,
            end: event.endDate,
            url: event.image,
          };
        })}
      />
    </div>
  );
}

export default Calendar;
