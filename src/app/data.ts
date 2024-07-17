import { Player, PLAYER_POSITION } from "./types";

export const defaultPlayers = new Map<PLAYER_POSITION, Player>([
  [
    PLAYER_POSITION.LEFT,
    {
    name: 'Player 1',
    score: 0
  }],
  [
    PLAYER_POSITION.RIGHT,
    {
    name: 'Player 2',
    score: 0
  }],
]);