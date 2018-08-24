import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./Navigation.css";

export const NavBar = ({ getData, favorites }) => {
  const linkTypes = ['planets', 'people', 'vehicles', 'favorites'];
  const displayNavLinks = linkTypes.map((linkType, i) => {
    return (
      <div className="CONTAINER" key={i}>
        <NavLink 
          className="NAV"
          name={linkType}
          exact to={`/${linkType}`}
          onClick={getData}
        >
          {linkType} {linkType === 'favorites' ? favorites.length : ''}
        </NavLink>
      </div>);
  });
  return (
    <div className="navigation_bar">
      {displayNavLinks}
    </div>
  );
};

const { func, string, shape, arrayOf, bool } = PropTypes;

NavBar.propTypes = {
  getData: func,
  pressed: string,
  favorites: arrayOf(
    shape({
      class: string,
      favorite: bool,
      model: string,
      name: string,
      numberof_passengers: string
    })
  )
};
