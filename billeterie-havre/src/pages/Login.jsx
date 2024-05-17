import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Fragment } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import "./Pages.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Erreur lors de la connexion");
      }

      const result = await response.json();
      console.log("Connexion réussie:", result);
      // Stocker le token ou les informations de l'utilisateur si nécessaire
      localStorage.setItem("token", result.token);

      // Rediriger l'utilisateur après une connexion réussie
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="loginContainer">
        <form action="" className="formLogin">
          <h1 className="titleLogin">Se Connecter</h1>
          <div className="divLogin">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="exemple@gmail.com" />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder="********" />
          </div>
          <Button label={"Se connecter"} color="primary" className="btnLogin" />
        </form>

        <div className="divRegister">
          <p>
            Pas encore de compte?{" "}
            <text className="loginLinkRegister">
              <Link to="/signin">Inscrivez-vous !</Link>
            </text>
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
