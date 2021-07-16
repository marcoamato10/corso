import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Users from "./components/Users";
import Todos from "./components/Todos";

export default () => (
  <Switch>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/users">
      <Users />
    </Route>
    <Route path="/todos">
      <Todos />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
)