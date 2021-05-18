import styles from "./GameLobby.module.css";

const GameLobby = () => {
  return (
    <div id={styles.gameLobbyMenu}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Game Lobby</h1>
      </div>
      <div id={styles.playerContainer}>
        <div className={styles.playerCard}>
          P<sub>1</sub>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
