import React from 'react';

const LostScreen = (props) => {
    return (
        <div className="app" id="app">
            <p>
                You clicked too soon, loser... <span role="img" aria-label="Crying emoji">😭</span>
            </p>
            <input type="button" value="Try again" onClick={props.startGame} />
        </div>
    );
}

export default LostScreen;