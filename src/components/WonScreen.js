import React, { useState, useEffect } from 'react';

const WonScreen = (props) => {
    const [text, setText] = useState("");

    useEffect(() => {
        if (props.reactionTime >= 1000) {
            setText(`Abooow, that's slow. 🤦‍♂️🐌 ${props.reactionTime} ms (milliseconds)`);
        }
        else if (props.reactionTime < 220) {
            setText(`Wow, that's fast! ⚡️ ${props.reactionTime} ms (milliseconds)`);
        }
        else {
            setText(`Meh, nothing special.. 🤷‍♂️ Your reaction time was ${props.reactionTime} ms (milliseconds)`);
        }
    }, [props.reactionTime]);

    return (
        <div className="app" id="app">
            <p>{text}</p>
            <input type="button" value="Start game" onClick={props.startGame} />
        </div>
    );
}

export default WonScreen;