import React, { memo } from 'react';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import ResultScreen from './ResultScreen';


const GameComponent = memo(props => {
    return (
        <>
            <StartScreen {...props} />
            <GameScreen {...props} />
            <ResultScreen {...props} />
        </>
    );
});


export default GameComponent