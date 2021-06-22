import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import GameLobby from "../../components/GameLobbyPage/GameLobby";
import SignIn from "../../components/LoginPage/SignIn";
import SignUp from "../../components/LoginPage/SignUp";
import ProfilePage from "../../components/ProfilePage/ProfilePage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <GameLobby />
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <ProfilePage />
        </PrivateRoute>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}
