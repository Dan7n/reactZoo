import React, { useState, useEffect } from "react";
import { sessionStorageChecker } from "./../../utils/sessionStorageChecker";
import { dateDiff } from "./../../utils/dateDiff";
import IAnimal from "./../../models/IAnimal";
import SingleAnimal from "./SingleAnimal";
import Fade from "react-reveal";
import axios from "axios";

interface IMainPageProps {
  // data: IAnimal[];
  appStarted: boolean;
}

const MainPage = ({ appStarted }: IMainPageProps) => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  useEffect(() => {
    if (sessionStorageChecker("animalsData")) {
      const objFromSS = JSON.parse(sessionStorage.getItem("animalsData")!);

      const newData: IAnimal[] = objFromSS.map((obj: IAnimal) => {
        if (obj.isFed && dateDiff(obj.lastFed) > 180) {
          obj.isFed = false;
        }
        return obj;
      });
      setAnimals([...newData]);
    }
  }, []);

  const elements = animals.map((el) => {
    return (
      <SingleAnimal
        key={el.id}
        id={el.id}
        name={el.name}
        imageUrl={el.imageUrl}
        shortDescription={el.shortDescription}
        isFed={el.isFed}
      />
    );
  });

  let unfedAnimals = countUnfedAnimals(animals);

  return (
    <main className="main-page">
      <div className="main-page__header-warning">
        <h1>Välkommen till kontrollpanelen!</h1>
        {/* When all the animals have been fed */}
        {unfedAnimals === 0 && (
          <>
            <p>Wow då var alla djuren matade, bra jobbat!</p>
            <p>
              Glöm inte att komma tillbaks och mata de igen om en liten stund 😻
            </p>
          </>
        )}

        {/* When there are animals that need feeding */}
        {unfedAnimals > 0 && (
          <>
            <p>
              Just nu finns det{" "}
              <span className="yellow">
                {unfedAnimals > 15 ? 15 : unfedAnimals} djur
              </span>{" "}
              som behöver matas
            </p>
            <p>
              Kom ihåg att du måste mata djuren var <strong>tredje</strong>{" "}
              timme, annars dör dem och så får du sparken 💀
            </p>
            <p>Scrolla ner och lär känna våra söta gäster</p>
          </>
        )}
      </div>

      <div className="main-page__animals">
        {appStarted && <div className="animals">{elements}</div>}
      </div>
    </main>
  );
};

function countUnfedAnimals(array: IAnimal[]): number {
  let count = 0;
  array.forEach((item) => {
    !item.isFed && count++;
  });

  return count;
}

export default MainPage;
