import React from 'react';
import InstructionsScreen from './InstructionsScreen';
import WelcomeScreen from './WelcomeScreen';

const StartScreen = (props) => {
    if (!props.click && !props.gameStarted && !props.lostScreen && props.reactionTime === null) {
      return <WelcomeScreen {...props}></WelcomeScreen>
    } else if (props.gameStarted) {
      return <InstructionsScreen {...props}></InstructionsScreen>
    } else {
      return null;
    }
  };

export default StartScreen;