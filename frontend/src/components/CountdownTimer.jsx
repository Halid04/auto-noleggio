import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = ({ timerId, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(120); // 120 secondi = 2 minuti
  const timerRef = useRef(null);
  const timerIdRef = useRef(timerId);

  useEffect(() => {
    // Funzione per avviare il timer
    const startTimer = () => {
      setTimeLeft(120);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            onTimerEnd(); // Chiama la funzione quando il timer scade
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    };

    // Avvia il timer solo se timerId è diverso dal precedente
    if (timerId !== timerIdRef.current) {
      timerIdRef.current = timerId;
      startTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerId, onTimerEnd]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <>{formatTime(timeLeft)}</>;
};

export default CountdownTimer;
