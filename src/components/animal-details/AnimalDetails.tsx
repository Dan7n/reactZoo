import React, { FC, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import IAnimal from "./../../models/IAnimal";
import { sessionStorageChecker } from "./../../utils/sessionStorageChecker";
import toast from "react-hot-toast";

interface IParams {
  id: string;
}

const AnimalDetails: FC = () => {
  const slug = useParams<IParams>();
  const animalId = Number(slug.id);
  const animalsArray: IAnimal[] = getSessionStorage();
  let currentAnimal = animalsArray.find((el) => el.id === animalId);
  const feedingTimeEl = useRef<HTMLParagraphElement>(null);

  function updateAnimal(): void {
    //if it has been less than 3 hrs (180 min)
    if (dateDiff(currentAnimal?.lastFed!) < 180) {
      toast.error(
        "Tack, men jag är fortfarande ganska mätt! Mata mig igen om en liten stund"
      );
      return;
    } else {
      //copy and change the current animal object
      const updatedAnimal = Object.assign({}, currentAnimal, {
        isFed: true,
        lastFed: new Date(Date.now()),
      });

      //replace object in array
      const idx = animalsArray.findIndex((el) => el.id === updatedAnimal.id);
      if (idx !== -1) {
        animalsArray.splice(idx, 1, updatedAnimal);
        sessionStorage.setItem("animalsData", JSON.stringify(animalsArray));
        feedingTimeEl.current!.innerText = "Nyss!";
        toast.success("Yum! Tack för maten 😄");
      }
    }
  }

  return (
    <section className="animal-details">
      {!currentAnimal && (
        <h1>Opps! Något gick fel! Vänligen ladda om sidan :)</h1>
      )}

      <Link className="back-to-home" to="/">
        Tillbaks till startsidan
      </Link>

      <div className="animal-container">
        <div className="animal-container__img-container">
          <img src={currentAnimal?.imageUrl} />
        </div>

        <div className="animal-container__animal-details">
          <h1>{currentAnimal?.name}</h1>
          <div>
            <h4>latinska Namn:</h4>
            <p>{currentAnimal?.latinName}</p>
          </div>
          <div>
            <h4>Beskrivning:</h4>
            <p>{currentAnimal?.longDescription}</p>
          </div>
          <div>
            <h4>Mediciner:</h4>
            <p>{currentAnimal?.medicine}</p>
          </div>
          <div>
            <h4>Senast matad:</h4>
            <p ref={feedingTimeEl}>
              {currentAnimal?.lastFed && dateDiff(currentAnimal?.lastFed) > 15
                ? "Fööör länge sedan!"
                : "ca " + dateDiff(currentAnimal?.lastFed!) + " minuter sedan"}
            </p>
          </div>
          <div>
            <button onClick={updateAnimal}>Mata mig nu</button>
          </div>
        </div>
      </div>
    </section>
  );
};

function getSessionStorage(): IAnimal[] {
  const storageObj = sessionStorage.getItem("animalsData");
  if (storageObj) {
    return JSON.parse(storageObj);
  } else {
    return [];
  }
}

function dateDiff(fromDate: string) {
  const initialDate = new Date(fromDate);
  const now = new Date(Date.now());
  const diffInTime = now.getTime() - initialDate.getTime();

  const minutes = Math.floor(diffInTime / 1000 / 60);
  return minutes;
}

export default AnimalDetails;
