import React, { FC, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IAnimal from "./../../models/IAnimal";
import { sessionStorageChecker } from "./../../utils/sessionStorageChecker";
import { dateDiff } from "./../../utils/dateDiff";
import toast from "react-hot-toast";
import Fade from "react-reveal";

interface IParams {
  id: string;
}

const AnimalDetails: FC = () => {
  const slug = useParams<IParams>();
  const animalId = Number(slug.id);
  const animalsArray: IAnimal[] = getSessionStorage();
  let currentAnimal = animalsArray.find((el) => el.id === animalId);
  const feedingTimeEl = useRef<HTMLParagraphElement>(null);
  const [isCurrentAnimalFed, setIsCurrentAnimalFed] = useState<boolean>(false);

  function updateAnimal(): void {
    //if it has been less than 3 hrs (180 min)
    if (
      currentAnimal?.isFed ||
      dateDiff(currentAnimal?.lastFed!) < 180 ||
      isCurrentAnimalFed === true
    ) {
      toast.error(
        `Tack, men jag är fortfarande ganska mätt! Mata mig igen om typ ${Math.floor(
          (180 - dateDiff(currentAnimal?.lastFed!)) / 60
        )} tim`
      );
      return;
    } else {
      //copy and change the current animal object
      const updatedAnimal = Object.assign({}, currentAnimal, {
        isFed: true,
        lastFed: new Date(Date.now()),
      });

      //replace object in array, set state to true, send a notification to the user
      const idx = animalsArray.findIndex((el) => el.id === updatedAnimal.id);
      if (idx !== -1) {
        animalsArray.splice(idx, 1, updatedAnimal);
        sessionStorage.setItem("animalsData", JSON.stringify(animalsArray));
        feedingTimeEl.current!.innerText = "Nyss!";
        setIsCurrentAnimalFed(true);
        toast.success("Yum! Tack för maten 😄");
      }
    }
  }

  return (
    <Fade left>
      <section className="animal-details">
        {!currentAnimal && (
          <h1>Opps! Något gick fel! Vänligen ladda om sidan :)</h1>
        )}

        <Link className="back-to-home" to="/">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="angle-double-left"
            className="svg-inline--fa fa-angle-double-left fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"
            ></path>
          </svg>
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
                  : "ca " +
                    dateDiff(currentAnimal?.lastFed!) +
                    " minuter sedan"}
              </p>
            </div>
            <div>
              <button onClick={updateAnimal} className="btn">
                Mata mig nu
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fade>
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

export default AnimalDetails;
