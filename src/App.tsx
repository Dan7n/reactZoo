import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from "./logo.svg";

import StartApp from "./components/start-app-button/StartApp";
import MainPage from "./components/main-page/MainPage";
import AnimalDetails from "./components/animal-details/AnimalDetails";

import Fade from "react-reveal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import IAnimal from "./models/IAnimal";
import { sessionStorageChecker } from "./utils/sessionStorageChecker";

import "./App.css";

function App() {
  const [startApp, setStartApp] = useState(false);
  const [dataFromApi, setDataFromApi] = useState<IAnimal[]>([]);
  const animalsDataUrl = "https://animals.azurewebsites.net/api/animals";

  //get data from API and set it to sesson storage
  useEffect(() => {
    if (!sessionStorageChecker("animalsData")) {
      axios.get<IAnimal[]>(animalsDataUrl).then((res) => {
        if ((res.status = 200)) {
          const newData = [...dataFromApi, ...res.data];

          setDataFromApi(newData);
          sessionStorage.setItem("animalsData", JSON.stringify(res.data));
        } else {
          console.log("Request failed");
        }
      });
    }
  }, []);

  //check if the applications has been started before
  useEffect(() => {
    if (!sessionStorageChecker("start")) {
      sessionStorage.setItem("start", "");
    }
    const isAppStarted = sessionStorage.getItem("start");
    setStartApp(!!isAppStarted);
  }, []);

  //passed down to child component
  const handleClick = (): void => {
    setStartApp(true);
    sessionStorage.setItem("start", "true");
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!startApp ? (
            <Fade>
              <StartApp start={handleClick} />{" "}
            </Fade>
          ) : (
            <Fade>
              <MainPage data={dataFromApi} />
            </Fade>
          )}
        </Route>
      </Switch>
      <Toaster />
      <Switch>
        <Route exact path="/:id">
          <AnimalDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
