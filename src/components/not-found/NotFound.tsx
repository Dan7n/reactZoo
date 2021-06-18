import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="error-page">
      <h1>Opps! Sidan du letar efter finns inte 😿</h1>
      <Link to="/" className="error-page__link">
        Till Hemsidan
      </Link>
    </section>
  );
};

export default NotFound;
