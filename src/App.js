import React, { useState, useEffect } from 'react';
import GameComponent from './components/GameComponent';
import getPositiveIntFromQueryParam from './utils/numberUtil';
import './App.css';

const App = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const minFromQueryParam = getPositiveIntFromQueryParam(queryParams, "min");
  const maxFromQueryParam = getPositiveIntFromQueryParam(queryParams, "max");
  const [gameStarted, setGameStarted] = useState(false);
  const [lost, setLost] = useState(false);
  const [click, setClick] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const minTimeInterval = minFromQueryParam != null ? minFromQueryParam : 1000; // in milliseconds
  const maxTimeInterval = maxFromQueryParam != null ? maxFromQueryParam : 2000; // in milliseconds
  const [waitTime, setWaitTime] = useState(0); // in milliseconds
  const [timer, setTimer] = useState(null);

  const getWaitTime = () => {
    let waitTime = Math.random() * (maxTimeInterval - minTimeInterval) + minTimeInterval;
    return waitTime;
  };

  const startGame = () => {
    setGameStarted(true);
    setWaitTime(getWaitTime());
  };

  // enable the game screen for the user to click
  useEffect(() => {
    if (gameStarted) {
      setTimer(
        setTimeout(function () {
          setGameStarted(false);
          setClick(!click);
          setStartTime(performance.now());
        }, waitTime)
      );
    }
  }, [gameStarted, waitTime, lost, reactionTime, click]);

  // clear the timer to avoid setting the game screen if the user has lost already
  useEffect(() => {
    if ((lost === true || reactionTime !== null) && !gameStarted) {
      clearTimeout(timer);
    }
  }, [lost, reactionTime, timer, gameStarted]);

  const captureReaction = () => {
    setClick(false);
    setGameStarted(false);
    setReactionTime(Math.floor(performance.now() - startTime));
  }

  const captureLoss = () => {
    setReactionTime(null);
    setGameStarted(false);
    setLost(true);
  }

  return (
    <>
      <GameComponent
        startGame={startGame}
        captureLoss={captureLoss}
        captureReaction={captureReaction}
        lostScreen={lost}
        reactionTime={reactionTime}
        click={click}
        gameStarted={gameStarted}>
      </GameComponent>
    </>
  );
}

export default App;