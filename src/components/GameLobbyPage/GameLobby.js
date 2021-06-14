import styles from "./GameLobby.module.css";
import PlayerCard from "./PlayerCard";
import ErrorMessage from "./ErrorMessage";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const GameLobby = () => {
  const [playerColors, setPlayerColors] = useState(["", "", "", ""]);
  const setPlayerColor = (color, index) => {
    setPlayerColors(
      playerColors.map((playerColor, playerIndex) =>
        playerIndex === index && !checkColorChosen(color) ? color : playerColor
      )
    );
  };

  const checkColorChosen = (color) => {
    if (color !== "" && playerColors.includes(color)) {
      setError("Two players cannot choose the same color");
      return true;
    } else {
      setError("");
      return false;
    }
  };

  const [error, setError] = useState("");

  const { currentUser } = useContext(AuthContext);

  return (
    <div id={styles.gameLobbyMenu}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Game Lobby</h1>
      </div>
      {error !== "" && <ErrorMessage message={error} />}
      <div id={styles.playerContainer}>
        <PlayerCard
          playerNum={1}
          color={playerColors[0]}
          setColor={(color) => setPlayerColor(color, 0)}
        />
        <PlayerCard
          playerNum={2}
          color={playerColors[1]}
          setColor={(color) => setPlayerColor(color, 1)}
        />
        <PlayerCard
          playerNum={3}
          color={playerColors[2]}
          setColor={(color) => setPlayerColor(color, 2)}
        />
        <PlayerCard
          playerNum={4}
          color={playerColors[3]}
          setColor={(color) => setPlayerColor(color, 3)}
        />
      </div>
    </div>
  );
};

export default GameLobby;
