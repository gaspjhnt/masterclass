import React from "react";
import Typography from "./Typography";
import Container from "./Container";

export default function PopUpEvent({ event, onClose }) {
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
  return (
    <div className="">
      <div className=" w-full h-full bg-white shadow-2xl   top-[50%] flex flex-col justify-center text-center content-center absolute left-0">
        <div>
          <Container>
            <div className="py-10">
              <Typography
                display="primary"
                className="font-bold uppercase tracking-widest  hover:cursor-pointer"
                variant="title"
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
              <div className="h-72 ml-[24%] mb-20 w-96 relative">
                <img
                  src={event.image}
                  alt={event.name}
                  className="absolute h-full left-[50%] mt-10 object-cover rounded-sm"
                />
              </div>
              <Typography
                display="primary"
                className="font-bold uppercase tracking-wide"
                variant="h2"
              >
                Informations
              </Typography>
              <Typography className="mb-20 mt-5" variant="sm">
                {event.description}
              </Typography>
              <button onClick={onClose}>Fermer</button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
