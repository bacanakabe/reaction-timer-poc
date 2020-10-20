import React, { useState, useEffect, memo } from 'react';
import './App.css';

const LostScreen = (props) => {
  return (
    <div className="app" id="app">
      <p>
        You clicked too soon, loser... <span role="img" aria-label="Crying emoji">😭</span>
      </p>
      <input type="button" value="Start game" onClick={props.startGame} />
    </div>
  );
}

const WonScreen = (props) => {
  return (
    <div className="app" id="app">
      <p>
        Your reaction time was {props.reactionTime} ms (milliseconds)
      </p>
      <input type="button" value="Start game" onClick={props.startGame} />
    </div>
  );
}

const WelcomeScreen = (props) => {
  return (
    <>
      <div className="app">
        <input type="button" value="Start game" onClick={props.startGame} />
      </div>
    </>
  );
}

const InstructionsScreen = (props) => {
  return (
    <div className="start-game" onClick={props.captureLoss}>
      <p className="game-instructions">
        Click anywhere when the screen turns green...
        </p>
    </div>
  );
};

const GameScreen = (props) => {
  if (props.gameStarted === false && props.click === true) {
    return (
      <>
        {
          props.click === true &&
          <div className="click" onClick={props.captureReaction}>
            <p className="game-instructions">
              Click now!
            </p>
          </div>
        }
      </>
    );
  } else {
    return null;
  }
};

const ResultScreen = (props) => {
  if (props.reactionTime != null && !props.click && !props.gameStarted) {
    return <WonScreen reactionTime={props.reactionTime} startGame={props.startGame} />
  } else {
    if (!props.gameStarted && props.lostScreen) {
      return <LostScreen startGame={props.startGame} />
    }
  }
  return null;
};

const Screen = (props) => {
  if (!props.click && !props.gameStarted && !props.lostScreen && props.reactionTime === null) {
    console.log("welcome");
    return <WelcomeScreen {...props}></WelcomeScreen>
  } else if (props.gameStarted) {
    console.log("instructions");
    return <InstructionsScreen {...props}></InstructionsScreen>
  } else {
    return null;
  }
};

const GameComponent = memo(props => {
  return (
    <>
      <Screen {...props}></Screen>
      <GameScreen {...props} />
      <ResultScreen {...props} />
    </>
  );
});

const App = () => {
  const getPositiveIntFromQueryParam = (param) => {
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
  const minFromQueryParam = getPositiveIntFromQueryParam("min");
  const maxFromQueryParam = getPositiveIntFromQueryParam("max");
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

  useEffect(() => {
    console.log("qweqwe");
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

  useEffect(() => {
    if ((lost === true || reactionTime !== null) && !gameStarted) {
      console.log("clear timeout");
      clearTimeout(timer);
    }
  }, [lost, reactionTime, timer, gameStarted]);

  const captureReaction = () => {
    setClick(false);
    setGameStarted(false);
    setReactionTime(Math.floor(performance.now() - startTime));
  }

  const captureLoss = () => {
    console.log("loss");
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