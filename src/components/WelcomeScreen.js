import React from 'react';

const WelcomeScreen = (props) => {
    return (
        <>
            <div className="app">
                <p><span role="img" aria-label="Lightning">⚡️</span> Start the game when you are ready to test your reaction <span role="img" aria-label="Lightning">⚡️</span></p>
                <input type="button" value="Start game" onClick={props.startGame} />
            </div>
        </>
    );
}

export default WelcomeScreen;