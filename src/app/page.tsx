import styles from "./page.module.css";
import { TimeCounter } from "./components/timeCounter";

export default function Home() {
  return (
    <main className={styles.main}>
      <TimeCounter></TimeCounter>
    </main>
  );
}
