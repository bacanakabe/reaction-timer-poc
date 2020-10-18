import React, { useState } from 'react';
import './App.css';

function App() {
  const getNumberFromQueryParam = (param) => {
    let numberFromQueryParam = queryParams.has(param) ? queryParams.get(param) : null;
    if (numberFromQueryParam && !isNaN(numberFromQueryParam)) {
      numberFromQueryParam = parseInt(numberFromQueryParam);

      if (numberFromQueryParam < 0) {
        numberFromQueryParam = null;
      } else {
        numberFromQueryParam *= 1000; // convert to milliseconds
      }
    }
    return numberFromQueryParam;
  }
  const queryParams = new URLSearchParams(window.location.search);
  const minFromQueryParam = getNumberFromQueryParam("min");
  const maxFromQueryParam = getNumberFromQueryParam("max");
  const [gameStarted, setGameStarted] = useState(false);
  const [lostScreen, setLostScreen] = useState(false);
  const [click, setClick] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const minTimeInterval = minFromQueryParam != null ? minFromQueryParam : 2000; // in milliseconds
  const maxTimeInterval = maxFromQueryParam != null ? maxFromQueryParam : 10000; // in milliseconds
  const [waitTime, setWaitTime] = useState(0); // in milliseconds

  const getWaitTime = () => {
    let waitTime = Math.random() * (maxTimeInterval - minTimeInterval) + minTimeInterval;
    return waitTime;
  };

  const startGame = () => {
    setLostScreen(false);
    setReactionTime(null);
    setClick(false);
    setWaitTime(getWaitTime());
    setGameStarted(true);
  };

  if (gameStarted) {
    setTimeout(function () {
      setGameStarted(false);
      setClick(true);
      setStartTime(performance.now());
    }, waitTime);
  }

  const captureReaction = () => {
    setClick(false);
    setGameStarted(false);
    setReactionTime(Math.floor(performance.now() - startTime));
  }

  const captureLoss = () => {
    setClick(false);
    setGameStarted(false);
    setLostScreen(true);
  }

  return (
    <>
      {
        lostScreen &&
        <div className="app" id="app">
          <p>
            You clicked too soon, loser... <span role="img" aria-label="Crying emoji">😭</span>
          </p>
          <input type="button" value="Start game" onClick={startGame} />
        </div>
      }
      {
        (reactionTime != null) &&
        <div className="app" id="app">
          <p>
            Your reaction time was {reactionTime} ms (milliseconds)
          </p>
          <input type="button" value="Start game" onClick={startGame} />
        </div>
      }
      { (!gameStarted && !click && reactionTime == null) &&
        <div className="app">
          <input type="button" value="Start game" onClick={startGame} />
        </div>
      }
      {
        gameStarted &&
        <div className="start-game" onClick={captureLoss}>
          <p className="game-instructions">
            Click anywhere when the screen turns green...
          </p>
        </div>
      }
      {
        click === true &&
        <div className="click" onClick={captureReaction}>
          <p className="game-instructions">
            Click now!
          </p>
        </div>
      }
    </>
  );
}

export default App;
