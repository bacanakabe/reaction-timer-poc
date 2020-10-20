import React from 'react';

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

export default GameScreen;