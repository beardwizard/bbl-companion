"use client";
import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import { Player, PLAYER_POSITION } from './types';
import { defaultPlayers } from './data';

export const gameContext = createContext<{
  isGamePaused: boolean,
  setIsGamePaused: React.Dispatch<React.SetStateAction<boolean>>,
  getPlayer: (position: PLAYER_POSITION) => Player,
  changeName: (position: PLAYER_POSITION, name: string) => void,
  changeScore: (position: PLAYER_POSITION, value: number) => void
}>({
  isGamePaused: true,
  setIsGamePaused: () => {},
  getPlayer: (position: PLAYER_POSITION) => defaultPlayers.get(PLAYER_POSITION.LEFT) as Player,
  changeName: (position: PLAYER_POSITION, name: string) => {},
  changeScore: (position: PLAYER_POSITION, value: number) => {},
})

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGamePaused, setIsGamePaused] = useState<boolean>(true);
  const [players, setPlayers] = useState<Map<PLAYER_POSITION, Player>>(defaultPlayers);

  const getPlayer = (position: PLAYER_POSITION): Player => {
    const player = players.get(position);
    if (!player) throw new Error(`Player ${position} not found`);
    return player;
  }

  const changeName = (position: PLAYER_POSITION, name: string): void => {
    const player = getPlayer(position);
    player.name = name;
    setPlayers(prevPlayers => new Map(prevPlayers.set(position, player)));
  }

  const changeScore = (position: PLAYER_POSITION, score: number): void => {
    const player = getPlayer(position);
    const newScore = player.score + score;
    (newScore >= 0) && (player.score = newScore);
    setPlayers(prevPlayers => new Map(prevPlayers.set(position, player)));
  }

  const context = {
    isGamePaused: isGamePaused,
    setIsGamePaused: setIsGamePaused,
    getPlayer: getPlayer,
    changeName: changeName,
    changeScore: changeScore,
  }

  return (<gameContext.Provider value={context}>{children}</gameContext.Provider>)
}

export function useGameContext() {
  return useContext(gameContext);
}
