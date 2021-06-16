import React, { useState, useEffect } from "react";
import { sessionStorageChecker } from "./../../utils/sessionStorageChecker";
import IAnimal from "./../../models/IAnimal";
import SingleAnimal from "./SingleAnimal";
import Fade from "react-reveal";
import axios from "axios";

interface IMainPageProps {
  data: IAnimal[];
}

const MainPage = ({ data }: IMainPageProps) => {
  const [animals, setAnimals] = useState(data);

  useEffect(() => {
    if (!data.length) {
      const newData = getAndReturnDataFromApi();
      setAnimals([...animals, ...newData]);
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
        <p>Just nu finns det {unfedAnimals} djur som behöver matas</p>
        <p>
          Kom ihåg att du måste mata djuren var <strong>tredje</strong> timme,
          annars dör dem och så får du sparken 💀
        </p>
      </div>

      <div className="main-page__animals">
        <h1>Lär känna våra söta gäster här 🐕</h1>
        <div className="animals">{elements}</div>
      </div>
    </main>
  );
};

function getAndReturnDataFromApi() {
  const sessionStorageObject = sessionStorage.getItem("animalsData") || "";
  const data: IAnimal[] = JSON.parse(sessionStorageObject);
  return data;
}

function countUnfedAnimals(array: IAnimal[]): number {
  let count = 0;
  array.forEach((item) => {
    !item.isFed && count++;
  });
  return count;
}

export default MainPage;
