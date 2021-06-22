import styles from "./GameLobby.module.css";
import Header from "../Header/Header";
import PlayerCard from "./PlayerCard";
import ErrorMessage from "./ErrorMessage";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { func } from "../../constants/Firebase";

const GameLobby = () => {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  const getNonLoggedInPlayers = func.httpsCallable("getNonLoggedInPlayers");
  const [playerIds, setPlayerIds] = useState([]);
  const initPlayerIds = async () => {
    setPlayerIds((await getNonLoggedInPlayers()).data);
  };
  const playerCards = playerIds.map((id) => (
    <PlayerCard
      key={id}
      userId={id}
      loggedIn={false}
      setError={(err) => setError(err)}
    />
  ));

  useEffect(() => {
    initPlayerIds();
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
            userId={currentUser.uid}
            setError={(err) => setError(err)}
          />
          {playerCards}
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
