import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const Header = () => {
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

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: "1" }}>
          React-Game-Lobby
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
      {error && <Alert severity="error">{error}</Alert>}
    </AppBar>
  );
};

export default Header;
