"use client";
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useGameContext } from '../GameContext';

const INITIAL_SECONDS = 24;
const INTERVAL = 10;
const NOTICE_TIME = 10000;
const WARNING_TIME = 3000;
const TIMES_UP_MESSAGE = "TIMES UP!";

const Wrapper = styled.div({
  display: "flex",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
});

const Timer = styled.span<{ time: number }>(({time}) => ({
  color: (time <= WARNING_TIME) ? "red"
    : (time <= NOTICE_TIME) ? "#DC5F00"
    : "var(--main-font-color)",
  fontSize: 196,
  fontFamily: "monospace",
}));

export const Countdown = () => {
  const [ time, setTime ] = useState(INITIAL_SECONDS * 1000);
  const { isGamePaused, setIsGamePaused } = useGameContext();

  useEffect(() => {
    let interval = undefined;

    if (!isGamePaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - INTERVAL);
      }, INTERVAL);
    } else if (time <= 0) {
      clearInterval(interval);
      setIsGamePaused(true);
    }

    return () => clearInterval(interval);
  }, [isGamePaused, setIsGamePaused, time]);

  const startTimer = () => {
    time <= 0 && setTime(INITIAL_SECONDS * 1000);
    setIsGamePaused(false);
  };

  const pauseTimer = () => {
    setIsGamePaused(true);
  };

  const resetTimer = () => {
    setIsGamePaused(false);
    setTime(INITIAL_SECONDS * 1000);
  };

  const onTimerClick = () => {
    isGamePaused ? startTimer() : pauseTimer();
  }

  const onTimerDoubleClick = () => {
    isGamePaused ? resetTimer() : pauseTimer();
  }

  const formatTime = () => {
    const seconds = Math.floor(time / 1000);
    const remainingMilliseconds = time % 1000;
    let result = "";
      
    const formattedMilliseconds =
      Math.floor(remainingMilliseconds / 10)
      .toString().padStart(2, "0");

    result = time <= 0
      ? TIMES_UP_MESSAGE
      : `${seconds}:${formattedMilliseconds}`

    return result;
  };

  return (
    <Wrapper
      onClick={onTimerClick}
      onDoubleClick={onTimerDoubleClick}
    >
      <Timer time={time}>
        {formatTime()}
      </Timer>
    </Wrapper>
  )
}
