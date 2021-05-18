import styles from "./PlayerCard.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const PlayerCard = ({ playerNum, color, setColor }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const colors = ["Blue", "Red", "Green", "Yellow", "Orange"];

  return (
    <div className={styles.playerCard} style={{ backgroundColor: color }}>
      <h2 className={styles.cardTitle}>Player {playerNum}</h2>
      <hr className={styles.cardContentDivider} />
      <div className={styles.dropdown}>
        <button
          className={styles.dropBtn}
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          {color !== "" ? color : "Choose Color"}
          {openDropdown ? (
            <FontAwesomeIcon icon={faCaretUp} style={{ marginLeft: "15px" }} />
          ) : (
            <FontAwesomeIcon
              icon={faCaretDown}
              style={{ marginLeft: "15px" }}
            />
          )}
        </button>
        {openDropdown && (
          <ul className={styles.dropdownList}>
            <li
              key={-2}
              onClick={() => {
                setColor("");
                setOpenDropdown(!openDropdown);
              }}
            >
              ---{"  "}Deselect{"  "}---
            </li>
            {colors.map((color, index) => (
              <li
                key={index}
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
  );
};

export default PlayerCard;
