import React, { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {
  id: number;
  name: string;
  imageUrl: string;
  shortDescription: string;
  isFed: boolean;
  seeMore?: () => void;
}

const SingleAnimal: FC<IProps> = ({
  id,
  name,
  imageUrl,
  shortDescription,
  isFed,
}) => {
  return (
    <section className="card-container">
      <div className="card-container__image-container">
        <img src={imageUrl} alt={`Bild på ${name}`} />
      </div>
      <div className="card-container__description">
        <h4>{name}</h4>
        <p className="desc">{shortDescription}</p>
        <p className={`status ${isFed ? "fed" : "hungry"}`}>
          {isFed ? "Mätt" : "Hungrig"}
        </p>
        <Link to={`/feed-animal/${id}`} className="btn">
          Mata mig
        </Link>
      </div>
    </section>
  );
};

export default SingleAnimal;
