import React from "react";
import Container from "./Container";
import Logo from "../assets/logos/Logo.png";
import Button from "./Button";
import Background from "../assets/images/panorama_lehavre.jpg";
import Typography from "./Typography";

export default function Header() {
  return (
    <div>
      <div className="relative py-28 shadow-2xl mb-20 bg-blue-100">
        <img
          className="absolute w-full h-full opacity-80 object-cover z-0 top-0 left-0"
          src={Background}
          alt=""
        />
        <Container>
          <div className="flex flex-row justify-between ">
            <div className=" flex -mt-10 flex-row z-20">
              <Button link="/" color="white">
                <img className="absolute mt-7" src={Logo} alt="Logo" />
                <Typography
                  variant="title"
                  display="white"
                  className=" pl-14 font-thin"
                >
                  LE HAVRE
                </Typography>
              </Button>
            </div>
            <div className="flex flex-row gap-5 z-20">
              <Button link="/login" label="Se connecter" color="primary" />
              <Button link="/signin" label="S'inscrire" color="secondary" />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
