import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/todos">Todos</Link>
      </li>
    </ul>
  </nav>
)