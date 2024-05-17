import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Fragment } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import "./Pages.css";

function SignIn() {
  return (
    <Fragment>
      <Header />
      <div className="registerPage">
        <div className="registerContainer">
          <form action="test.php" className="formRegister">
            <h1 className="titleRegister">S'inscrire</h1>
            <div className="divRegister">
              <label htmlFor="userName">Nom</label>
              <input type="text" id="userName" placeholder="Nom" required />
              <label htmlFor="userFirstname">Prénom</label>
              <input
                type="text"
                id="userFirstname"
                placeholder="Prénom"
                required
              />
              <label htmlFor="userEmail">Email</label>
              <input
                type="email"
                id="userEmail"
                placeholder="exemple@gmail.com"
                required
              />
              <label htmlFor="userPassword">Mot de passe</label>
              <input
                type="password"
                id="userPassword"
                placeholder="********"
                required
              />
              <label htmlFor="userPasswordConfirm">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="userPasswordConfirm"
                placeholder="********"
                required
              />
              <label htmlFor="userBirthDate">Date de Naissance</label>
              <input
                type="date"
                name="userbirthDate"
                id="userbirthDate"
                required
              />
            </div>
            <Button
              type="submit"
              label={"S'inscrire"}
              color="primary"
              className="btnRegister"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default SignIn;
