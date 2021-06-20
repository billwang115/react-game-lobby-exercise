import styles from "./PlayerCard.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { func } from "../../constants/Firebase";

const PlayerCard = ({ loggedIn, color, setColor }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const getColors = func.httpsCallable("getColorOptions");
  const [colors, setColors] = useState([]);
  const initColors = async () => setColors((await getColors()).data);

  useEffect(() => {
    initColors();
  }, []);

  return (
    <div style={{ width: loggedIn ? "100%" : "40%" }}>
      <div
        className={styles.playerCard}
        style={{
          backgroundColor: color,
        }}
      >
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
            {color !== "" ? color : loggedIn ? "Choose Color" : "No Color"}
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
                  setColor("");
                  setOpenDropdown(!openDropdown);
                }}
              >
                ---{"  "}Deselect{"  "}---
              </li>
              {colors.map((color) => (
                <li
                  key={color.toString()}
                  onClick={() => {
                    setColor(color);
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
