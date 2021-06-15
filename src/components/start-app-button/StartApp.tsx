import React from "react";
import ReactDOM from "react-dom";
import Typewriter from "typewriter-effect";

interface IProps {
  start: React.MouseEventHandler<HTMLButtonElement>;
}

const StartApp: React.FC<IProps> = ({ start }) => {
  return (
    <main className="intro-page">
      <div className="intro-page__info">
        <h1>Välkommen till reactZoo! 🙋</h1>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(
                "Vad kul att du blivit anställd som vår nya zookeeper! <br />"
              )
              .pauseFor(1000)
              .typeString(
                "Ditt jobb är relativt enkelt - du behöver mata alla djur vi har var tredje timme, annars så <strong>DÖR</strong> dem! 😱 <br />"
              )
              .pauseFor(800)
              .typeString("Lycka till, and don't mess this up! ")
              .pauseFor(200)
              .typeString("No pressure 😉")
              .start();
          }}
        />
      </div>

      <div className="intro-page__buttton">
        <button className="start-button" onClick={start}>
          Kom igång!
        </button>
      </div>
    </main>
  );
};

function typer(text: string): void {}

export default StartApp;
