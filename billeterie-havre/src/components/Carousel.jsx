import React from "react";
import AliceCarousel from "react-alice-carousel";
import Typography from "./Typography.jsx";
import "../carousel.css";
import Slimane from "../assets/images/slimane.webp";
import Tenacious from "../assets/images/tenacious.webp";
import Bellator from "../assets/images/bellator.webp";
import Container from "./Container.jsx";

export default function Carousel() {
  const handleDragStart = (e) => e.preventDefault();
  const Slide = ({ children, category, title, Image }) => {
    return (
      <div className="grid md:grid-cols-2 p-6 ">
        <div className="py-10  px-5 ">
          <Typography className="uppercase" variant="xl">
            {category}
          </Typography>
          <Typography
            display="secondary"
            variant="title"
            className="my-4 font-extrabold uppercase tracking-wide"
          >
            {title}
          </Typography>
          <p className="md:pb-10 pb-0 tracking-wide text-base leading-relaxed font-light">
            {children}
          </p>
        </div>
        <div className="relative w-full h-96 md:h-full">
          <img
            className=" absolute top-0 mt-20 right-10 h-72 lg:object-cover object-center"
            src={Image}
            alt=""
          />
        </div>
      </div>
    );
  };
  const items = [
    <Slide Image={Slimane} category="evenement à venir" title="Slimane">
      Slimane donne le coup d’envoi de sa tournée solo ! Son album “chroniques
      d’un Cupidon” bat tous les records depuis sa sortie ! Avec déjà deux
      énormes tubes “la recette” et “des milliers de je t’aime” Slimane nous
      donne rendez-vous dans tous les zeniths de France, de Belgique et de
      Suisse dès le mois de novembre 2023 et le 1er Mars 2024 à l’Accor Arena !
      Ne manquez pas le retour de Slimane sur scène et embarquez pour Le Cupidon
      Tour, un show puissant et émouvant dont seul Slimane a le secret…
    </Slide>,
    <Slide Image={Tenacious} category="evenement à venir" title="TENACIOUS D">
      Jack Black et Kyle Gass, le duo tonitruant qui se cache derrière Tenacious
      D, forment à la fin des 90’s le ‘Meilleur Groupe du Monde’, à Los Angeles.
      Leur parcours comprend une série à succès sur HBO en 1999, un album
      certifié plusieurs fois platine en 2001 ainsi qu’un long métrage
      "Tenacious D in the Pick of Destiny" sorti en 2006. Aux Grammy Awards, ils
      obtiennent en 2012 une nomination pour leur album "Rize of the Fenix",
      puis gagnent une récompense en 2014 pour la Meilleure Performance Metal,
      alors qu’ils fondent en 2013 le Festival Supreme, un festival dédié à la
      musique et à l’humour à Los Angeles.
    </Slide>,
    <Slide
      Image={Bellator}
      category="evenement à venir"
      title="BELLATOR CHAMPIONS SERIES"
    >
      BELLATOR CHAMPIONS SERIES ACCOR ARENA Limité à 4 places par commande. Card
      subject to change/Liste des combattants susceptible de changer. Réservez
      vos places de sport pour : BELLATOR CHAMPIONS SERIES - ACCOR ARENA Date :
      17 mai 2024 Vous disposez par ailleurs du service e-ticket pour imprimer
      vos billets à domicile dès la fin de commande pour BELLATOR CHAMPIONS
      SERIES ainsi que du plan de salle interactif pour choisir vos places dans
      le lieu : ACCOR ARENA.
    </Slide>,
  ];
  return (
    <Container>
      <div className="shadow-2xl mb-20 ">
        <AliceCarousel
          autoPlayInterval="3000"
          autoPlay
          infinite
          mouseTracking
          disableButtonsControls
          items={items}
        />
      </div>
    </Container>
  );
}
