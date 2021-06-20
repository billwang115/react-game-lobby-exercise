import styles from "./GameLobby.module.css";
import Header from "../Header/Header";
import PlayerCard from "./PlayerCard";
import ErrorMessage from "./ErrorMessage";
import { useEffect, useState } from "react";
import { func } from "../../constants/Firebase";

const GameLobby = () => {
  const [error, setError] = useState("");
  const addPlayerColor = func.httpsCallable("addPlayerColor");
  const deselectPlayerColor = func.httpsCallable("deselectPlayerColor");

  const setPlayerColor = async (color) => {
    setError("");
    try {
      if (color !== "") {
        await addPlayerColor({ color: color });
        setCurrentColor(color);
      } else {
        await deselectPlayerColor();
        setCurrentColor("");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  /*const [playerColors, setPlayerColors] = useState(["", "", "", ""]);
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
  */
  const getCurrentPlayerColor = func.httpsCallable("getCurrentPlayerColor");
  const getNonLoggedInColors = func.httpsCallable("getNonLoggedInColors");
  const [colorMap, setColorMap] = useState({});
  const initColorMap = async () => {
    setColorMap((await getNonLoggedInColors()).data);
  };
  const playerCards = Object.values(colorMap).map((value) => (
    <PlayerCard loggedIn={false} color={value} setColor={null} />
  ));
  const [currentColor, setCurrentColor] = useState("");
  const initPlayerColor = async () =>
    setCurrentColor((await getCurrentPlayerColor()).data);
  useEffect(() => {
    initPlayerColor();
    initColorMap();
  }, []);

  return (
    <div>
      <Header />
      <div id={styles.gameLobbyMenu}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Game Lobby</h1>
        </div>
        {error !== "" && <ErrorMessage message={error} />}
        <div id={styles.playerContainer}>
          <PlayerCard
            loggedIn={true}
            color={currentColor}
            setColor={setPlayerColor}
          />
          {playerCards}
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
