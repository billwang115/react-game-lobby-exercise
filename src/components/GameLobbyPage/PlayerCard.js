import styles from "./PlayerCard.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { func } from "../../constants/Firebase";

const PlayerCard = ({ loggedIn, userId, setError }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const getColors = func.httpsCallable("getColorOptions");
  const [colors, setColors] = useState([]);
  const initColors = async () => setColors((await getColors()).data);

  const getProfileImagebyId = func.httpsCallable("getProfileImagebyId");
  const [imageUrl, setImageUrl] = useState("");
  const initImage = async () => {
    try {
      setImageUrl((await getProfileImagebyId({ id: userId })).data);
    } catch (err) {
      setImageUrl("");
    }
  };

  const getPlayerColor = func.httpsCallable("getPlayerColor");
  const [selectedColor, setSelectedColor] = useState("");
  const initSelectedColor = async () => {
    try {
      setSelectedColor((await getPlayerColor({ id: userId })).data);
    } catch (err) {
      setError(err.message);
    }
  };

  const addPlayerColor = func.httpsCallable("addPlayerColor");
  const deselectPlayerColor = func.httpsCallable("deselectPlayerColor");

  const setPlayerColor = async (color) => {
    setError("");
    try {
      if (color !== "") {
        await addPlayerColor({ color: color });
        setSelectedColor(color);
      } else {
        await deselectPlayerColor();
        setSelectedColor("");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    initColors();
    initImage();
    initSelectedColor();
  }, []);

  return (
    <div style={{ width: loggedIn ? "100%" : "40%" }}>
      <div
        className={styles.playerCard}
        style={{
          backgroundColor: selectedColor,
        }}
      >
        <img src={imageUrl} alt="profile" className={styles.profileImg} />
        <h2 className={styles.cardTitle}>
          {!loggedIn ? "Anon-Player" : "You"}
        </h2>
        <hr className={styles.cardContentDivider} />
        <div className={styles.dropdown}>
          <button
            className={styles.dropBtn}
            onClick={() => setOpenDropdown(!openDropdown)}
            disabled={!loggedIn}
          >
            {selectedColor !== ""
              ? selectedColor
              : loggedIn
              ? "Choose Color"
              : "No Color"}
            {loggedIn &&
              (openDropdown ? (
                <FontAwesomeIcon
                  icon={faCaretUp}
                  className={styles.arrowIcon}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={styles.arrowIcon}
                />
              ))}
          </button>
          {openDropdown && (
            <ul className={styles.dropdownList}>
              <li
                key="deselect"
                onClick={() => {
                  setPlayerColor("");
                  setOpenDropdown(!openDropdown);
                }}
              >
                ---{"  "}Deselect{"  "}---
              </li>
              {colors.map((color) => (
                <li
                  key={color.toString()}
                  onClick={() => {
                    setPlayerColor(color);
                    setOpenDropdown(!openDropdown);
                  }}
                >
                  {color}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
