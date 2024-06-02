import React, { useState, useEffect } from "react";

const CountdownTimer = ({ id }) => {
  const [timeLeft, setTimeLeft] = useState(120); // 120 secondi = 2 minuti

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

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
