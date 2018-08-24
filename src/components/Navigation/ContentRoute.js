import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { HomePage } from '../HomePage';
import { CardContainer } from "../CardContainer";

export const ContentRoute = ({
  toggleFavorites,
  favorites,
  handlePage,
  dataType,
  activeButton
}) => {
  const savedFavorites = favorites.map(favorite => favorite.name);
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route
        exact path={`/${activeButton}`}
        render={({match}) => {
          const { path } = match;
          const chosenPath = path.slice(1);
          return (
            <CardContainer
              data={dataType[chosenPath]}
              handlePage={handlePage}
              toggleFavorites={toggleFavorites}
              savedFavorites={savedFavorites}
              isFavorites={activeButton === 'favorites'}
            />
          );
        }}
      />
    </Switch>
  );
};

const { arrayOf, object, func, string, bool, shape } = PropTypes;

ContentRoute.propTypes = {
  planets: arrayOf(
    shape({
      climate: string,
      favorite: bool,
      name: string,
      populaton: string,
      residents: arrayOf(string),
      terrain: string
    })
  ),
  people: arrayOf(
    shape({
      favorite: bool,
      homeworld: string,
      name: string,
      population: string,
      species: string
    })
  ),
  vehicles: arrayOf(
    shape({
      class: string,
      favorite: bool,
      model: string,
      name: string,
      numberof_passengers: string
    })
  ),
  favorites: arrayOf(object),
  handlePage: func,
  toggleFavorites: func
};
