import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headerbutton: {
    color: "inherit",
    padding: "6px 10px",
    margin: "0px 8px",
  },
  headerTitle: {
    flexGrow: "1",
  }
}));

const Header = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleProfile = () => {
    history.push("/profile");
  };

  const handleLobby = () => {
    history.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.headerTitle}>
          React-Game-Lobby
        </Typography>
        <Button className={classes.headerbutton} onClick={handleLobby}>
          Lobby
        </Button>
        <Button className={classes.headerbutton} onClick={handleProfile}>
          Profile
        </Button>
        <Button className={classes.headerbutton} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
      {error && <Alert severity="error">{error}</Alert>}
    </AppBar>
  );
};

export default Header;
