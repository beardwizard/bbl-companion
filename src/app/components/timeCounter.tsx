"use client";
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const INITIAL_SECONDS = 24;

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
});

const Counter = styled.span<{ time: number }>(({time}) => ({
  color: (time <= 3000) ? "red" : (time <= 10000) ? "#DC5F00" : "var(--main-font-color)",
  fontSize: 196,
  fontFamily: "monospace",
}));

export const TimeCounter = () => {
  const [time, setTime] = useState(INITIAL_SECONDS * 1000); // Convert to milliseconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 10); // Decrease by 10 milliseconds
      }, 10);
    } else if (time <= 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(INITIAL_SECONDS * 1000);
  };

  const onCounterClick = () => {
      isActive ? pauseTimer() : startTimer();
  }

  const formatTime = () => {
    const seconds = Math.floor(time / 1000);
    const remainingMilliseconds = time % 1000;
      
    const formattedMilliseconds =
      Math.floor(remainingMilliseconds / 10)
      .toString().padStart(2, '0');
      
    return `${seconds}:${formattedMilliseconds}`;
  };

  return (
    <Wrapper
      onClick={onCounterClick}
      onDoubleClick={resetTimer}
    >
      <Counter time={time}>
        {formatTime()}
      </Counter>
    </Wrapper>
  )
}
