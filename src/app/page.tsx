import styles from "./page.module.css";
import { Countdown } from "./components/Countdown";
import { PlayerPanel } from "./components/PlayerPanel";
import { PLAYER_POSITION } from "./types";
import { GameProvider } from "./GameContext";

export default function Home() {
  
  return (
    <GameProvider>
      <main className={styles.main}>
        <PlayerPanel position={PLAYER_POSITION.LEFT}></PlayerPanel>
        <PlayerPanel position={PLAYER_POSITION.RIGHT}></PlayerPanel>
        <Countdown></Countdown>
      </main>
    </GameProvider>
  );
}
