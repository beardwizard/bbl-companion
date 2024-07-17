"use client";
import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { PLAYER_POSITION } from '../types';
import { useGameContext } from '../GameContext';

const Wrapper = styled.div<{ playerPosition: PLAYER_POSITION }>(({ playerPosition }) => ({
  display: "flex",
  position: "absolute",
  flexDirection: "column",
  width: 150,
  top: 0,
  margin: 8,
  left: playerPosition === PLAYER_POSITION.LEFT ? 0 : "unset",
  right: playerPosition === PLAYER_POSITION.RIGHT ? 0 : "unset",
  justifyContent: "center",
  alignItems: "center",
  userSelect: "none",
}));

const Name = styled.input<{ isGamePaused: boolean }>(({ isGamePaused }) => ({
  width: "100%",
  outline: "none",
  border: "none",
  padding: 8,
  fontSize: 24,
  backgroundColor: "transparent",
  textAlign: "center",
  pointerEvents: isGamePaused ? "unset" : "none",
}));

const Score = styled.span({
  fontSize: 96,
  fontFamily: "monospace",
});

const ButtonsWrapper = styled.div<{ isGamePaused: boolean }>(({ isGamePaused }) => ({
  display: isGamePaused ? "flex" : "none",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 12,
}));

const Button = styled.div({
  display: "flex",
  width: 50,
  height: 50,
  fontSize: 32,
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontFamily: "monospace",
});

export interface PlayerPanelProps {
  position: PLAYER_POSITION;
}

export const PlayerPanel: FC<PlayerPanelProps> = ({ position }) => {
  const { isGamePaused, getPlayer, changeName, changeScore } = useGameContext();
  const player = getPlayer(position);

  const onNameFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target && e.target.select();
  }

  const changePlayerName = (name: string) => {
    changeName(position, name);
  }

  const changePlayerScore = (score: number) => {
    if (!isGamePaused) return;
    changeScore(position, score)
  }

  return (
    <Wrapper playerPosition={position}>
      <Name
        isGamePaused={isGamePaused}
        onChange={(e) => changePlayerName(e.target.value)}
        onFocus={(e) => onNameFocus(e)}
        value={player.name}
        placeholder="Player Name"
        readOnly={!isGamePaused}
      />
      <Score>{player.score}</Score>
      <ButtonsWrapper isGamePaused={isGamePaused}>
        <Button onClick={() => changePlayerScore(2)}>+2</Button>
        <Button onClick={() => changePlayerScore(3)}>+3</Button>
        <Button onClick={() => changePlayerScore(1)}>+1</Button>
        <Button onClick={() => changePlayerScore(-1)}>-1</Button>
      </ButtonsWrapper>
    </Wrapper>
  )
};
