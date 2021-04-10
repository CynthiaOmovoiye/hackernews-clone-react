import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => (
  <nav className="nav-link">
    <NavLink to="/news" activeClassName="active">
      News
    </NavLink>
    <NavLink
      to={{ pathname: "/news?page={1-10}", type: "news?page={1-10}" }}
      activeClassName="active"
    >
      Top News
    </NavLink>
  </nav>
);

export default Navigation;
