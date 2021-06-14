import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GameLobby from "../../components/GameLobbyPage/GameLobby";
import SignIn from "../../components/LoginPage/SignIn";
import SignUp from "../../components/LoginPage/SignUp";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <SignUp />
        </Route>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Route path="/gameLobby" exact>
          <GameLobby />
        </Route>
      </Switch>
    </Router>
  );
}
