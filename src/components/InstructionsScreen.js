import React from 'react';


const InstructionsScreen = (props) => {
    return (
        <div className="start-game" onClick={props.captureLoss}>
            <p className="game-instructions">
                Click anywhere when the screen turns green...
          </p>
        </div>
    );
};

export default InstructionsScreen;