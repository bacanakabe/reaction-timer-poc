import React from 'react';

const WelcomeScreen = (props) => {
    return (
        <>
            <div className="app">
                <p>Start the game to test your reaction time</p>
                <input type="button" value="Start game" onClick={props.startGame} />
            </div>
        </>
    );
}

export default WelcomeScreen;