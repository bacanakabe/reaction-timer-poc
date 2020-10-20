import React from 'react';
import WonScreen from './WonScreen';
import LostScreen from './LostScreen';

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

export default ResultScreen;