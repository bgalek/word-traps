import React, { useEffect, useState } from 'react';
import './Timer.css';
import FullScreenLayout from "../../Components/Layout/FullScreenLayout";
import Word from "../../Components/Word/Word";

interface TimerProps {
    title: string;
    subtitle: string;
    timeout: number;

    onTimeout(): void;
}

function Timer({ title, subtitle, timeout, onTimeout }: TimerProps) {
    const [counter, setCounter] = useState(timeout);
    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        counter === 0 && onTimeout();
    }, [counter, timeout, onTimeout]);

    return (
        <FullScreenLayout style={{ animationDuration: `${timeout}s` }} className="timer timer-animation">
            <small className="subtitle">{subtitle}</small>
            <Word content={title}/>
            <p className="clock">{counter}</p>
        </FullScreenLayout>
    );
}

export default Timer;
